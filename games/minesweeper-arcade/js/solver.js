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

	return {
		findHint: findHint
	};
})();
