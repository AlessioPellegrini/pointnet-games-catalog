/**
 * Minesweeper Arcade — Deductive Educational Tutor Solver
 * Analyzes board state to discover human-explainable logical steps or recognize 50/50 guessing states.
 */
var MinesweeperSolver = (function () {
	'use strict';

	function getNeighbors(r, c, rows, cols) {
		var neighbors = [];
		for (var dr = -1; dr <= 1; dr++) {
			for (var dc = -1; dc <= 1; dc++) {
				if (dr === 0 && dc === 0) continue;
				var nr = r + dr, nc = c + dc;
				if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
					neighbors.push({ r: nr, c: nc });
				}
			}
		}
		return neighbors;
	}

	/**
	 * Analyze board and find the most logical next step with natural language explanation.
	 * 
	 * @param {Array} board Matrix of cell objects: { revealed, flagged, adjacentMines, mine }
	 * @param {number} rows
	 * @param {number} cols
	 * @returns {Object} Hint result object
	 */
	function findHint(board, rows, cols) {
		// PRIORITY 0: Detect any mistakenly placed flags (flags where cell.mine === false)
		var wrongFlags = [];
		for (var wr = 0; wr < rows; wr++) {
			for (var wc = 0; wc < cols; wc++) {
				if (board[wr][wc].flagged && board[wr][wc].mine === false) {
					wrongFlags.push({ r: wr, c: wc });
				}
			}
		}

		if (wrongFlags.length > 0) {
			return {
				action: 'unflag',
				targetCells: wrongFlags,
				causeCells: [],
				rule: 'wrong_flag_detected',
				explanation: '⚠️ Attenzione: hai piazzato una bandierina (contrassegnata con ❌) su una casella dove NON c\'è alcuna mina! Rimuovila per non trarre in inganno i numeri adiacenti.'
			};
		}

		var revealedNumbers = [];

		// Gather all revealed cells with numbers > 0 (supporting both cell.count and cell.adjacentMines)
		for (var r = 0; r < rows; r++) {
			for (var c = 0; c < cols; c++) {
				var cell = board[r][c];
				var numVal = typeof cell.count !== 'undefined' ? cell.count : (cell.adjacentMines || 0);
				if (cell.revealed && numVal > 0) {
					var neighbors = getNeighbors(r, c, rows, cols);
					var flaggedCount = 0;
					var unrevealed = [];

					for (var i = 0; i < neighbors.length; i++) {
						var nb = board[neighbors[i].r][neighbors[i].c];
						if (nb.flagged) {
							flaggedCount++;
						} else if (!nb.revealed) {
							unrevealed.push(neighbors[i]);
						}
					}

					if (unrevealed.length > 0) {
						revealedNumbers.push({
							r: r,
							c: c,
							number: numVal,
							flagged: flaggedCount,
							remainingMines: numVal - flaggedCount,
							unrevealed: unrevealed
						});
					}
				}
			}
		}

		if (revealedNumbers.length === 0) {
			// No numbers with unrevealed neighbors
			return {
				type: 'empty',
				explanation: 'La tavola è libera o non ci sono numeri attivi vicini a caselle coperte.'
			};
		}

		// -------------------------------------------------------------
		// LEVEL 1A: Satisfied Numbers -> All other neighbors are 100% SAFE
		// -------------------------------------------------------------
		for (var i = 0; i < revealedNumbers.length; i++) {
			var item = revealedNumbers[i];
			if (item.remainingMines === 0 && item.unrevealed.length > 0) {
				return {
					action: 'reveal',
					targetCells: item.unrevealed,
					causeCells: [{ r: item.r, c: item.c }],
					rule: 'satisfied_number',
					explanation: 'Guarda il numero ' + item.number + ' evidenziato in oro: tocca già ' + item.flagged + ' bandiere! Tutte le altre sue caselle coperte (in verde) sono sicure al 100%.'
				};
			}
		}

		// -------------------------------------------------------------
		// LEVEL 1B: Exhausted Neighbors -> All remaining are 100% MINES
		// -------------------------------------------------------------
		for (var i = 0; i < revealedNumbers.length; i++) {
			var item = revealedNumbers[i];
			if (item.remainingMines > 0 && item.remainingMines === item.unrevealed.length) {
				return {
					action: 'flag',
					targetCells: item.unrevealed,
					causeCells: [{ r: item.r, c: item.c }],
					rule: 'all_mines',
					explanation: 'Guarda il numero ' + item.number + ' evidenziato in oro: gli mancano ancora ' + item.remainingMines + ' mine ed ha esattamente ' + item.unrevealed.length + ' caselle coperte. Sono per forza tutte mine (in rosso)!'
				};
			}
		}

		// -------------------------------------------------------------
		// LEVEL 2: Subset Reduction / Pairs (Pattern 1-1, 1-2, 1-2-1)
		// -------------------------------------------------------------
		function isSubset(subset, superset) {
			for (var s = 0; s < subset.length; s++) {
				var found = false;
				for (var p = 0; p < superset.length; p++) {
					if (subset[s].r === superset[p].r && subset[s].c === superset[p].c) {
						found = true;
						break;
					}
				}
				if (!found) return false;
			}
			return true;
		}

		function getDifference(superset, subset) {
			var diff = [];
			for (var p = 0; p < superset.length; p++) {
				var found = false;
				for (var s = 0; s < subset.length; s++) {
					if (superset[p].r === subset[s].r && superset[p].c === subset[s].c) {
						found = true;
						break;
					}
				}
				if (!found) diff.push(superset[p]);
			}
			return diff;
		}

		for (var a = 0; a < revealedNumbers.length; a++) {
			for (var b = 0; b < revealedNumbers.length; b++) {
				if (a === b) continue;
				var itemA = revealedNumbers[a];
				var itemB = revealedNumbers[b];

				// If unrevealed cells of A are a strict subset of unrevealed cells of B
				if (itemA.unrevealed.length < itemB.unrevealed.length && isSubset(itemA.unrevealed, itemB.unrevealed)) {
					var diff = getDifference(itemB.unrevealed, itemA.unrevealed);
					var mineDiff = itemB.remainingMines - itemA.remainingMines;

					// Case 2A: The remaining mines are equal -> diff cells are SAFE
					if (mineDiff === 0 && diff.length > 0) {
						return {
							action: 'reveal',
							targetCells: diff,
							causeCells: [{ r: itemA.r, c: itemA.c }, { r: itemB.r, c: itemB.c }],
							rule: 'subset_safe',
							explanation: 'Tecnica del confronto: il ' + itemB.number + ' contiene tutte le mine del ' + itemA.number + ' vicino. Le caselle in più all\'esterno (in verde) sono libere!'
						};
					}

					// Case 2B: The mine difference matches the difference count -> diff cells are MINES
					if (mineDiff === diff.length && diff.length > 0) {
						return {
							action: 'flag',
							targetCells: diff,
							causeCells: [{ r: itemA.r, c: itemA.c }, { r: itemB.r, c: itemB.c }],
							rule: 'subset_mine',
							explanation: 'Pattern avanzato: il ' + itemB.number + ' richiede ' + mineDiff + ' mina in più rispetto all\'' + itemA.number + ' vicino. La casella esterna (in rosso) è sicuramente una mina!'
						};
					}
				}
			}
		}

		// -------------------------------------------------------------
		// LEVEL 3: Probabilistic Analysis / Frontier Risk Assessment
		// -------------------------------------------------------------
		// Calculate local mine probability for each frontier cell based on adjacent numbers
		var cellRiskMap = {};
		var cellInfluences = {};

		for (var i = 0; i < revealedNumbers.length; i++) {
			var item = revealedNumbers[i];
			var localRisk = item.remainingMines / item.unrevealed.length;
			for (var u = 0; u < item.unrevealed.length; u++) {
				var key = item.unrevealed[u].r + ',' + item.unrevealed[u].c;
				if (!cellRiskMap[key] || localRisk > cellRiskMap[key]) {
					cellRiskMap[key] = localRisk;
				}
				if (!cellInfluences[key]) cellInfluences[key] = [];
				cellInfluences[key].push({ r: item.r, c: item.c, num: item.number, remaining: item.remainingMines, total: item.unrevealed.length });
			}
		}

		// Sort frontier cells from lowest mine risk to highest
		var candidateCells = [];
		for (var key in cellRiskMap) {
			if (cellRiskMap.hasOwnProperty(key)) {
				var parts = key.split(',');
				candidateCells.push({
					r: parseInt(parts[0], 10),
					c: parseInt(parts[1], 10),
					mineProb: cellRiskMap[key],
					safeProb: Math.round((1 - cellRiskMap[key]) * 100),
					causes: cellInfluences[key] || []
				});
			}
		}

		candidateCells.sort(function (a, b) {
			return a.mineProb - b.mineProb;
		});

		if (candidateCells.length > 0) {
			var best = candidateCells[0];
			var causeList = best.causes.map(function (c) { return { r: c.r, c: c.c }; });

			if (best.mineProb === 0.5 && candidateCells.length <= 4) {
				return {
					action: 'guess',
					targetCells: [best],
					causeCells: causeList,
					rule: 'dilemma_5050',
					safeProb: 50,
					explanation: 'Dilemma 50/50: nessuna regola matematica può garantire la certezza assoluta. Entrambe le caselle hanno esattamente il 50% di probabilità di essere mina: tocca rischiare con un\'intuizione!'
				};
			}

			return {
				action: 'guess',
				targetCells: [best],
				causeCells: causeList,
				rule: 'probabilistic_choice',
				safeProb: best.safeProb,
				explanation: 'Nessuna mossa certa al 100%, ma abbiamo calcolato le probabilità: la casella evidenziata ha la stima di sicurezza più alta (' + best.safeProb + '% sicura, solo ' + Math.round(best.mineProb * 100) + '% rischio mina). È la mossa migliore da tentare!'
			};
		}

		return {
			type: 'empty',
			explanation: 'La tavola non presenta mosse determinabili al momento.'
		};
	}

	/**
	 * Compute heatmap classifications across all frontier cells.
	 * Returns an object with lists: safe, mines, guesses.
	 */
	function getAllHints(board, rows, cols) {
		var revealedNumbers = [];
		for (var r = 0; r < rows; r++) {
			for (var c = 0; c < cols; c++) {
				var cell = board[r][c];
				var numVal = typeof cell.count !== 'undefined' ? cell.count : (cell.adjacentMines || 0);
				if (cell.revealed && numVal > 0) {
					var neighbors = getNeighbors(r, c, rows, cols);
					var flaggedCount = 0;
					var unrevealed = [];

					for (var i = 0; i < neighbors.length; i++) {
						var nb = board[neighbors[i].r][neighbors[i].c];
						if (nb.flagged) {
							flaggedCount++;
						} else if (!nb.revealed) {
							unrevealed.push(neighbors[i]);
						}
					}

					if (unrevealed.length > 0) {
						revealedNumbers.push({
							r: r,
							c: c,
							number: numVal,
							flagged: flaggedCount,
							remainingMines: numVal - flaggedCount,
							unrevealed: unrevealed
						});
					}
				}
			}
		}

		var safeMap = {};
		var mineMap = {};

		// 1. Direct deduction
		for (var i = 0; i < revealedNumbers.length; i++) {
			var item = revealedNumbers[i];
			if (item.remainingMines === 0) {
				for (var u = 0; u < item.unrevealed.length; u++) {
					var k = item.unrevealed[u].r + ',' + item.unrevealed[u].c;
					safeMap[k] = item.unrevealed[u];
				}
			} else if (item.remainingMines > 0 && item.remainingMines === item.unrevealed.length) {
				for (var u = 0; u < item.unrevealed.length; u++) {
					var k = item.unrevealed[u].r + ',' + item.unrevealed[u].c;
					mineMap[k] = item.unrevealed[u];
				}
			}
		}

		// 2. Subset reductions
		function isSub(sub, sup) {
			for (var s = 0; s < sub.length; s++) {
				var found = false;
				for (var p = 0; p < sup.length; p++) {
					if (sub[s].r === sup[p].r && sub[s].c === sup[p].c) { found = true; break; }
				}
				if (!found) return false;
			}
			return true;
		}

		function getDiff(sup, sub) {
			var diff = [];
			for (var p = 0; p < sup.length; p++) {
				var found = false;
				for (var s = 0; s < sub.length; s++) {
					if (sup[p].r === sub[s].r && sup[p].c === sub[s].c) { found = true; break; }
				}
				if (!found) diff.push(sup[p]);
			}
			return diff;
		}

		for (var a = 0; a < revealedNumbers.length; a++) {
			for (var b = 0; b < revealedNumbers.length; b++) {
				if (a === b) continue;
				var itA = revealedNumbers[a];
				var itB = revealedNumbers[b];
				if (itA.unrevealed.length < itB.unrevealed.length && isSub(itA.unrevealed, itB.unrevealed)) {
					var diff = getDiff(itB.unrevealed, itA.unrevealed);
					var mDiff = itB.remainingMines - itA.remainingMines;
					if (mDiff === 0) {
						for (var d = 0; d < diff.length; d++) {
							safeMap[diff[d].r + ',' + diff[d].c] = diff[d];
						}
					} else if (mDiff === diff.length) {
						for (var d = 0; d < diff.length; d++) {
							mineMap[diff[d].r + ',' + diff[d].c] = diff[d];
						}
					}
				}
			}
		}

		// 3. Probabilities for remaining frontier cells
		var guessMap = {};
		for (var i = 0; i < revealedNumbers.length; i++) {
			var item = revealedNumbers[i];
			var localRisk = item.unrevealed.length > 0 ? (item.remainingMines / item.unrevealed.length) : 0;
			for (var u = 0; u < item.unrevealed.length; u++) {
				var key = item.unrevealed[u].r + ',' + item.unrevealed[u].c;
				if (!safeMap[key] && !mineMap[key]) {
					if (!guessMap[key] || localRisk > guessMap[key].mineProb) {
						guessMap[key] = {
							r: item.unrevealed[u].r,
							c: item.unrevealed[u].c,
							mineProb: localRisk,
							safeProb: Math.round((1 - localRisk) * 100)
						};
					}
				}
			}
		}

		var safeList = [];
		for (var k in safeMap) { if (safeMap.hasOwnProperty(k)) safeList.push(safeMap[k]); }

		var mineList = [];
		for (var k in mineMap) { if (mineMap.hasOwnProperty(k)) mineList.push(mineMap[k]); }

		var guessList = [];
		for (var k in guessMap) { if (guessMap.hasOwnProperty(k)) guessList.push(guessMap[k]); }
		guessList.sort(function (x, y) { return x.mineProb - y.mineProb; });

		return {
			safe: safeList,
			mines: mineList,
			guesses: guessList
		};
	}

	/**
	 * Explain status and logic of a specific cell (r, c).
	 */
	function explainCell(r, c, board, rows, cols) {
		var cell = board[r] && board[r][c];
		if (!cell) return null;

		var numVal = typeof cell.count !== 'undefined' ? cell.count : (cell.adjacentMines || 0);

		// Case A: The cell is already revealed and has a number
		if (cell.revealed) {
			if (numVal === 0) {
				return {
					type: 'revealed_empty',
					title: 'Spazio Vuoto',
					explanation: 'Questa casella è vuota (0 mine adiacenti). Tutte le caselle confinanti sono state aperte automaticamente.'
				};
			}

			var neighbors = getNeighbors(r, c, rows, cols);
			var flags = 0;
			var unrevealed = [];
			for (var i = 0; i < neighbors.length; i++) {
				var nb = board[neighbors[i].r][neighbors[i].c];
				if (nb.flagged) flags++;
				else if (!nb.revealed) unrevealed.push(neighbors[i]);
			}

			var remaining = numVal - flags;
			if (remaining === 0) {
				return {
					type: 'satisfied',
					title: 'Numero Soddisfatto (' + numVal + ')',
					causeCells: [{ r: r, c: c }],
					targetCells: unrevealed,
					action: 'reveal',
					explanation: 'Il numero ' + numVal + ' tocca già tutte le ' + flags + ' bandiere necessarie. Le sue ' + unrevealed.length + ' caselle coperte restanti sono sicure al 100%! Puoi toccare questo numero per aprirle (Chording).'
				};
			} else if (remaining === unrevealed.length) {
				return {
					type: 'all_mines',
					title: 'Numero Esausto (' + numVal + ')',
					causeCells: [{ r: r, c: c }],
					targetCells: unrevealed,
					action: 'flag',
					explanation: 'Al numero ' + numVal + ' mancano ' + remaining + ' mine e ha esattamente ' + unrevealed.length + ' caselle coperte libere. Tutte queste ' + unrevealed.length + ' caselle coperte sono sicuramente mine!'
				};
			} else {
				return {
					type: 'number_info',
					title: 'Numero ' + numVal + ' Attivo',
					causeCells: [{ r: r, c: c }],
					targetCells: unrevealed,
					explanation: 'Questo numero indica ' + numVal + ' mine attorno. Ha ' + flags + ' bandiere piazzate e ' + unrevealed.length + ' caselle coperte: restano ' + remaining + ' mine nascoste tra di esse.'
				};
			}
		}

		// Case B: The cell is currently flagged
		if (cell.flagged) {
			if (cell.mine === false) {
				return {
					type: 'wrong_flag',
					title: '❌ Bandiera Errata',
					action: 'unflag',
					targetCells: [{ r: r, c: c }],
					explanation: 'Attenzione: questa bandierina è sbagliata! Sotto questa casella NON c\'è alcuna mina. Questa bandiera errata falsa i conteggi dei numeri vicini. Rimuovila con un tocco in modalità Flag!'
				};
			}

			var all = getAllHints(board, rows, cols);
			var isDefinite = all.mines.some(function (m) { return m.r === r && m.c === c; });
			if (isDefinite) {
				return {
					type: 'flagged_cell_confirmed',
					title: '🚩 Bandiera Corretta (100% Certa)',
					targetCells: [{ r: r, c: c }],
					explanation: 'Ottima bandiera! Sotto c\'è realmente una mina ed era confermata al 100% dalla logica dei numeri adiacenti.'
				};
			} else {
				return {
					type: 'flagged_cell_guess',
					title: '🚩 Bandiera su Mina Reale (Intuitiva)',
					targetCells: [{ r: r, c: c }],
					explanation: 'Sotto questa casella c\'è davvero una mina, ma i numeri attorno non consentivano ancora di dedurla con certezza assoluta al 100% (mossa intuitiva o a probabilità).'
				};
			}
		}

		// Case C: Unrevealed cell -> check in full hints
		var allHints = getAllHints(board, rows, cols);

		// 1. Is it 100% safe?
		var isSafe = allHints.safe.some(function (s) { return s.r === r && s.c === c; });
		if (isSafe) {
			// Find adjacent satisfied numbers or subset
			var nbs = getNeighbors(r, c, rows, cols);
			var causes = [];
			for (var i = 0; i < nbs.length; i++) {
				var nbCell = board[nbs[i].r][nbs[i].c];
				if (nbCell.revealed && (nbCell.count || nbCell.adjacentMines)) causes.push(nbs[i]);
			}
			return {
				type: 'safe_cell',
				title: 'Casella Sicura (100%)',
				action: 'reveal',
				targetCells: [{ r: r, c: c }],
				causeCells: causes,
				explanation: 'Questa casella è priva di mine al 100%! La deduzione logica dei numeri adiacenti lo garantisce con certezza. Puoi scavare tranquillo.'
			};
		}

		// 2. Is it 100% mine?
		var isMine = allHints.mines.some(function (m) { return m.r === r && m.c === c; });
		if (isMine) {
			var nbs = getNeighbors(r, c, rows, cols);
			var causes = [];
			for (var i = 0; i < nbs.length; i++) {
				var nbCell = board[nbs[i].r][nbs[i].c];
				if (nbCell.revealed && (nbCell.count || nbCell.adjacentMines)) causes.push(nbs[i]);
			}
			return {
				type: 'mine_cell',
				title: 'Mina Certa (100%)',
				action: 'flag',
				targetCells: [{ r: r, c: c }],
				causeCells: causes,
				explanation: 'Attenzione: sotto questa casella c\'è sicuramente una mina al 100%! I numeri vicini non lasciano alcun dubbio. Piazzaci una bandiera.'
			};
		}

		// 3. Is it in guess list?
		var guessInfo = allHints.guesses.find(function (g) { return g.r === r && g.c === c; });
		if (guessInfo) {
			return {
				type: 'guess_cell',
				title: 'Casella Incerta (' + guessInfo.safeProb + '% Sicura)',
				action: 'guess',
				safeProb: guessInfo.safeProb,
				targetCells: [{ r: r, c: c }],
				explanation: 'Nessuna regola deterministica ne garantisce il contenuto. Ha una stima di sicurezza del ' + guessInfo.safeProb + '% (rischio mina ' + Math.round(guessInfo.mineProb * 100) + '%).'
			};
		}

		// 4. Isolated / Unexplored cell far from any numbers
		return {
			type: 'isolated_cell',
			title: 'Casella Non Esplorata',
			targetCells: [{ r: r, c: c }],
			explanation: 'Questa casella non confina direttamente con numeri scoperti. La sua probabilità di mina dipende solo dal rapporto complessivo mine/caselle libere.'
		};
	}

	return {
		findHint: findHint,
		getAllHints: getAllHints,
		explainCell: explainCell
	};
})();
