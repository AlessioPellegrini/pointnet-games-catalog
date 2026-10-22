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

		// Gather all revealed cells with numbers > 0
		for (var r = 0; r < rows; r++) {
			for (var c = 0; c < cols; c++) {
				var cell = board[r][c];
				if (cell.revealed && cell.adjacentMines > 0) {
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
							number: cell.adjacentMines,
							flagged: flaggedCount,
							remainingMines: cell.adjacentMines - flaggedCount,
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
		// LEVEL 3: 50/50 Guess / Ambiguous Frontier Detection
		// -------------------------------------------------------------
		// If no deterministic logic was found, collect all frontier unrevealed cells
		var frontierSet = [];
		for (var i = 0; i < revealedNumbers.length; i++) {
			var unrev = revealedNumbers[i].unrevealed;
			for (var u = 0; u < unrev.length; u++) {
				var cellKey = unrev[u].r + ',' + unrev[u].c;
				var exists = false;
				for (var f = 0; f < frontierSet.length; f++) {
					if (frontierSet[f].r === unrev[u].r && frontierSet[f].c === unrev[u].c) {
						exists = true;
						break;
					}
				}
				if (!exists) frontierSet.push(unrev[u]);
			}
		}

		return {
			action: 'guess',
			targetCells: frontierSet.slice(0, 2),
			causeCells: [],
			rule: 'forced_guess',
			explanation: 'Qui la logica non bastava: nessuna regola matematica poteva garantire la sicurezza al 100%. Era un bivio a probabilità (50/50)!'
		};
	}

	return {
		findHint: findHint
	};
})();
