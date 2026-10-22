/**
 * Minesweeper Arcade — Deductive Educational Tutor Solver & Tactical Pattern Recognizer
 * Analyzes board state to discover human-explainable logical steps, classic tactical patterns
 * (1-2-1, 1-2-2-1, 1-2-X, 1-1-X Edge/Corner, and Pattern Reductions).
 */
var MinesweeperSolver = (function () {
	'use strict';

	function t(key, params) {
		if (window.I18n && typeof window.I18n.t === 'function') {
			return window.I18n.t(key, params);
		}
		return key;
	}

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

	function getCommon(listA, listB) {
		var common = [];
		for (var a = 0; a < listA.length; a++) {
			for (var b = 0; b < listB.length; b++) {
				if (listA[a].r === listB[b].r && listA[a].c === listB[b].c) {
					common.push(listA[a]);
					break;
				}
			}
		}
		return common;
	}

	/**
	 * Find classic tactical patterns: 1-2-1, 1-2-2-1, 1-2-X, 1-1-X (Edge & Corner)
	 */
	function findTacticalPattern(revealedNumbers, board, rows, cols) {
		var map = {};
		for (var i = 0; i < revealedNumbers.length; i++) {
			var item = revealedNumbers[i];
			map[item.r + ',' + item.c] = item;
		}

		// 1. PATTERN 1-2-1 (Horizontal & Vertical, including reductions)
		for (var i = 0; i < revealedNumbers.length; i++) {
			var mid = revealedNumbers[i];
			if (mid.remainingMines !== 2) continue;

			// Horizontal 1 - 2 - 1
			var left = map[mid.r + ',' + (mid.c - 1)];
			var right = map[mid.r + ',' + (mid.c + 1)];
			if (left && right && left.remainingMines === 1 && right.remainingMines === 1) {
				var leftDiff = getDifference(left.unrevealed, mid.unrevealed);
				var rightDiff = getDifference(right.unrevealed, mid.unrevealed);

				if (leftDiff.length === 1 && rightDiff.length === 1) {
					var commonLeftMid = getCommon(left.unrevealed, mid.unrevealed);
					var commonRightMid = getCommon(right.unrevealed, mid.unrevealed);
					var centerSafe = getCommon(commonLeftMid, commonRightMid);

					var isReduced = (left.number !== 1 || mid.number !== 2 || right.number !== 1);
					var expl = isReduced ?
						t('patterns.pattern_121_reduced_desc', { redA: left.remainingMines, redB: mid.remainingMines, redC: right.remainingMines }) :
						t('patterns.pattern_121_desc');

					if (centerSafe.length > 0) {
						return {
							action: 'reveal',
							targetCells: centerSafe,
							causeCells: [{ r: left.r, c: left.c }, { r: mid.r, c: mid.c }, { r: right.r, c: right.c }],
							patternName: t('patterns.pattern_121_name'),
							rule: 'pattern_121',
							explanation: expl
						};
					} else {
						return {
							action: 'flag',
							targetCells: [leftDiff[0], rightDiff[0]],
							causeCells: [{ r: left.r, c: left.c }, { r: mid.r, c: mid.c }, { r: right.r, c: right.c }],
							patternName: t('patterns.pattern_121_name'),
							rule: 'pattern_121',
							explanation: expl
						};
					}
				}
			}

			// Vertical 1 - 2 - 1
			var top = map[(mid.r - 1) + ',' + mid.c];
			var bot = map[(mid.r + 1) + ',' + mid.c];
			if (top && bot && top.remainingMines === 1 && bot.remainingMines === 1) {
				var topDiff = getDifference(top.unrevealed, mid.unrevealed);
				var botDiff = getDifference(bot.unrevealed, mid.unrevealed);

				if (topDiff.length === 1 && botDiff.length === 1) {
					var commonTopMid = getCommon(top.unrevealed, mid.unrevealed);
					var commonBotMid = getCommon(bot.unrevealed, mid.unrevealed);
					var centerSafeV = getCommon(commonTopMid, commonBotMid);

					var isReducedV = (top.number !== 1 || mid.number !== 2 || bot.number !== 1);
					var explV = isReducedV ?
						t('patterns.pattern_121_reduced_desc', { redA: top.remainingMines, redB: mid.remainingMines, redC: bot.remainingMines }) :
						t('patterns.pattern_121_desc');

					if (centerSafeV.length > 0) {
						return {
							action: 'reveal',
							targetCells: centerSafeV,
							causeCells: [{ r: top.r, c: top.c }, { r: mid.r, c: mid.c }, { r: bot.r, c: bot.c }],
							patternName: t('patterns.pattern_121_name'),
							rule: 'pattern_121',
							explanation: explV
						};
					} else {
						return {
							action: 'flag',
							targetCells: [topDiff[0], botDiff[0]],
							causeCells: [{ r: top.r, c: top.c }, { r: mid.r, c: mid.c }, { r: bot.r, c: bot.c }],
							patternName: t('patterns.pattern_121_name'),
							rule: 'pattern_121',
							explanation: explV
						};
					}
				}
			}
		}

		// 2. PATTERN 1-2-2-1 (Horizontal & Vertical)
		for (var j = 0; j < revealedNumbers.length; j++) {
			var n1 = revealedNumbers[j];
			if (n1.remainingMines !== 1) continue;

			var n2 = map[n1.r + ',' + (n1.c + 1)];
			var n3 = map[n1.r + ',' + (n1.c + 2)];
			var n4 = map[n1.r + ',' + (n1.c + 3)];

			if (n2 && n3 && n4 && n2.remainingMines === 2 && n3.remainingMines === 2 && n4.remainingMines === 1) {
				var diff1 = getDifference(n1.unrevealed, n2.unrevealed);
				var diff4 = getDifference(n4.unrevealed, n3.unrevealed);
				if (diff1.length > 0 || diff4.length > 0) {
					var safeTargets = diff1.concat(diff4);
					var isRed1221 = (n1.number !== 1 || n2.number !== 2 || n3.number !== 2 || n4.number !== 1);
					return {
						action: 'reveal',
						targetCells: safeTargets,
						causeCells: [{ r: n1.r, c: n1.c }, { r: n2.r, c: n2.c }, { r: n3.r, c: n3.c }, { r: n4.r, c: n4.c }],
						patternName: t('patterns.pattern_1221_name'),
						rule: 'pattern_1221',
						explanation: isRed1221 ? t('patterns.pattern_1221_reduced_desc') : t('patterns.pattern_1221_desc')
					};
				}
			}

			// Vertical 1 - 2 - 2 - 1
			var v2 = map[(n1.r + 1) + ',' + n1.c];
			var v3 = map[(n1.r + 2) + ',' + n1.c];
			var v4 = map[(n1.r + 3) + ',' + n1.c];

			if (v2 && v3 && v4 && v2.remainingMines === 2 && v3.remainingMines === 2 && v4.remainingMines === 1) {
				var vdiff1 = getDifference(n1.unrevealed, v2.unrevealed);
				var vdiff4 = getDifference(v4.unrevealed, v3.unrevealed);
				if (vdiff1.length > 0 || vdiff4.length > 0) {
					var vSafeTargets = vdiff1.concat(vdiff4);
					var isRed1221V = (n1.number !== 1 || v2.number !== 2 || v3.number !== 2 || v4.number !== 1);
					return {
						action: 'reveal',
						targetCells: vSafeTargets,
						causeCells: [{ r: n1.r, c: n1.c }, { r: v2.r, c: v2.c }, { r: v3.r, c: v3.c }, { r: v4.r, c: v4.c }],
						patternName: t('patterns.pattern_1221_name'),
						rule: 'pattern_1221',
						explanation: isRed1221V ? t('patterns.pattern_1221_reduced_desc') : t('patterns.pattern_1221_desc')
					};
				}
			}
		}

		// 3. CORE PATTERN 1-2-X (Subset Mine Rule)
		// Number B (effective 2) and Number A (effective 1) where A's cells are a subset of B's cells
		for (var a = 0; a < revealedNumbers.length; a++) {
			for (var b = 0; b < revealedNumbers.length; b++) {
				if (a === b) continue;
				var itemA = revealedNumbers[a];
				var itemB = revealedNumbers[b];

				if (itemA.remainingMines === 1 && itemB.remainingMines === 2 &&
					itemA.unrevealed.length === 2 && itemB.unrevealed.length === 3 &&
					isSubset(itemA.unrevealed, itemB.unrevealed)) {
					var diffX = getDifference(itemB.unrevealed, itemA.unrevealed);
					if (diffX.length === 1) {
						return {
							action: 'flag',
							targetCells: diffX,
							causeCells: [{ r: itemA.r, c: itemA.c }, { r: itemB.r, c: itemB.c }],
							patternName: t('patterns.pattern_12x_name'),
							rule: 'pattern_12x',
							explanation: t('patterns.pattern_12x_desc', {
								numA: itemA.number,
								remA: itemA.remainingMines,
								numB: itemB.number,
								remB: itemB.remainingMines
							})
						};
					}
				}
			}
		}

		// 4. CORE PATTERN 1-1-X (Border & Corner Safe Rule)
		for (var a = 0; a < revealedNumbers.length; a++) {
			for (var b = 0; b < revealedNumbers.length; b++) {
				if (a === b) continue;
				var itemA = revealedNumbers[a];
				var itemB = revealedNumbers[b];

				if (itemA.remainingMines === 1 && itemB.remainingMines === 1 &&
					itemA.unrevealed.length === 2 && itemB.unrevealed.length >= 3 &&
					isSubset(itemA.unrevealed, itemB.unrevealed)) {
					var diffSafe = getDifference(itemB.unrevealed, itemA.unrevealed);
					if (diffSafe.length > 0) {
						return {
							action: 'reveal',
							targetCells: diffSafe,
							causeCells: [{ r: itemA.r, c: itemA.c }, { r: itemB.r, c: itemB.c }],
							patternName: t('patterns.pattern_11x_name'),
							rule: 'pattern_11x',
							explanation: t('patterns.pattern_11x_desc', {
								numA: itemA.number,
								numB: itemB.number
							})
						};
					}
				}
			}
		}

		return null;
	}

	/**
	 * Extract all revealed numbers with unrevealed neighbors from board.
	 */
	function extractRevealedNumbers(board, rows, cols) {
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
		return revealedNumbers;
	}

	/**
	 * Find ALL tactical patterns currently active on the board (for Didactic Pattern Highlighter).
	 */
	function findAllTacticalPatterns(board, rows, cols) {
		var patterns = [];
		var seenKeys = {};

		function makePatternKey(p) {
			var causeSorted = p.causeCells.map(function (c) { return c.r + ',' + c.c; }).sort().join('|');
			var targetSorted = p.targetCells.map(function (c) { return c.r + ',' + c.c; }).sort().join('|');
			return p.rule + ':' + causeSorted + '->' + targetSorted;
		}

		function addPattern(p) {
			if (!p || !p.causeCells || p.causeCells.length === 0 || !p.targetCells || p.targetCells.length === 0) return;
			var key = makePatternKey(p);
			if (seenKeys[key]) return;
			seenKeys[key] = true;
			p.id = 'pattern_' + (patterns.length + 1);
			patterns.push(p);
		}

		var revealedNumbers = extractRevealedNumbers(board, rows, cols);
		var map = {};
		for (var i = 0; i < revealedNumbers.length; i++) {
			var it = revealedNumbers[i];
			map[it.r + ',' + it.c] = it;
		}

		// 1. Scan ALL 1-2-1 Patterns (Horizontal & Vertical)
		for (var i = 0; i < revealedNumbers.length; i++) {
			var mid = revealedNumbers[i];
			if (mid.remainingMines !== 2) continue;

			// Horizontal 1 - 2 - 1
			var left = map[mid.r + ',' + (mid.c - 1)];
			var right = map[mid.r + ',' + (mid.c + 1)];
			if (left && right && left.remainingMines === 1 && right.remainingMines === 1) {
				var leftDiff = getDifference(left.unrevealed, mid.unrevealed);
				var rightDiff = getDifference(right.unrevealed, mid.unrevealed);
				if (leftDiff.length === 1 && rightDiff.length === 1) {
					var commonLeftMid = getCommon(left.unrevealed, mid.unrevealed);
					var commonRightMid = getCommon(right.unrevealed, mid.unrevealed);
					var centerSafe = getCommon(commonLeftMid, commonRightMid);
					var isReduced = (left.number !== 1 || mid.number !== 2 || right.number !== 1);
					var expl = isReduced ?
						t('patterns.pattern_121_reduced_desc', { redA: left.remainingMines, redB: mid.remainingMines, redC: right.remainingMines }) :
						t('patterns.pattern_121_desc');

					if (centerSafe.length > 0) {
						addPattern({
							action: 'reveal',
							targetCells: centerSafe,
							causeCells: [{ r: left.r, c: left.c }, { r: mid.r, c: mid.c }, { r: right.r, c: right.c }],
							patternName: t('patterns.pattern_121_name'),
							rule: 'pattern_121',
							explanation: expl
						});
					}
					addPattern({
						action: 'flag',
						targetCells: [leftDiff[0], rightDiff[0]],
						causeCells: [{ r: left.r, c: left.c }, { r: mid.r, c: mid.c }, { r: right.r, c: right.c }],
						patternName: t('patterns.pattern_121_name'),
						rule: 'pattern_121',
						explanation: expl
					});
				}
			}

			// Vertical 1 - 2 - 1
			var top = map[(mid.r - 1) + ',' + mid.c];
			var bot = map[(mid.r + 1) + ',' + mid.c];
			if (top && bot && top.remainingMines === 1 && bot.remainingMines === 1) {
				var topDiff = getDifference(top.unrevealed, mid.unrevealed);
				var botDiff = getDifference(bot.unrevealed, mid.unrevealed);
				if (topDiff.length === 1 && botDiff.length === 1) {
					var commonTopMid = getCommon(top.unrevealed, mid.unrevealed);
					var commonBotMid = getCommon(bot.unrevealed, mid.unrevealed);
					var centerSafeV = getCommon(commonTopMid, commonBotMid);
					var isReducedV = (top.number !== 1 || mid.number !== 2 || bot.number !== 1);
					var explV = isReducedV ?
						t('patterns.pattern_121_reduced_desc', { redA: top.remainingMines, redB: mid.remainingMines, redC: bot.remainingMines }) :
						t('patterns.pattern_121_desc');

					if (centerSafeV.length > 0) {
						addPattern({
							action: 'reveal',
							targetCells: centerSafeV,
							causeCells: [{ r: top.r, c: top.c }, { r: mid.r, c: mid.c }, { r: bot.r, c: bot.c }],
							patternName: t('patterns.pattern_121_name'),
							rule: 'pattern_121',
							explanation: explV
						});
					}
					addPattern({
						action: 'flag',
						targetCells: [topDiff[0], botDiff[0]],
						causeCells: [{ r: top.r, c: top.c }, { r: mid.r, c: mid.c }, { r: bot.r, c: bot.c }],
						patternName: t('patterns.pattern_121_name'),
						rule: 'pattern_121',
						explanation: explV
					});
				}
			}
		}

		// 2. Scan ALL 1-2-2-1 Patterns (Horizontal & Vertical)
		for (var j = 0; j < revealedNumbers.length; j++) {
			var n1 = revealedNumbers[j];
			if (n1.remainingMines !== 1) continue;

			// Horizontal 1-2-2-1
			var n2 = map[n1.r + ',' + (n1.c + 1)];
			var n3 = map[n1.r + ',' + (n1.c + 2)];
			var n4 = map[n1.r + ',' + (n1.c + 3)];
			if (n2 && n3 && n4 && n2.remainingMines === 2 && n3.remainingMines === 2 && n4.remainingMines === 1) {
				var diff1 = getDifference(n1.unrevealed, n2.unrevealed);
				var diff4 = getDifference(n4.unrevealed, n3.unrevealed);
				if (diff1.length > 0 || diff4.length > 0) {
					var safeTargets = diff1.concat(diff4);
					var isRed1221 = (n1.number !== 1 || n2.number !== 2 || n3.number !== 2 || n4.number !== 1);
					addPattern({
						action: 'reveal',
						targetCells: safeTargets,
						causeCells: [{ r: n1.r, c: n1.c }, { r: n2.r, c: n2.c }, { r: n3.r, c: n3.c }, { r: n4.r, c: n4.c }],
						patternName: t('patterns.pattern_1221_name'),
						rule: 'pattern_1221',
						explanation: isRed1221 ? t('patterns.pattern_1221_reduced_desc') : t('patterns.pattern_1221_desc')
					});
				}
			}

			// Vertical 1-2-2-1
			var v2 = map[(n1.r + 1) + ',' + n1.c];
			var v3 = map[(n1.r + 2) + ',' + n1.c];
			var v4 = map[(n1.r + 3) + ',' + n1.c];
			if (v2 && v3 && v4 && v2.remainingMines === 2 && v3.remainingMines === 2 && v4.remainingMines === 1) {
				var vdiff1 = getDifference(n1.unrevealed, v2.unrevealed);
				var vdiff4 = getDifference(v4.unrevealed, v3.unrevealed);
				if (vdiff1.length > 0 || vdiff4.length > 0) {
					var vSafeTargets = vdiff1.concat(vdiff4);
					var isRed1221V = (n1.number !== 1 || v2.number !== 2 || v3.number !== 2 || v4.number !== 1);
					addPattern({
						action: 'reveal',
						targetCells: vSafeTargets,
						causeCells: [{ r: n1.r, c: n1.c }, { r: v2.r, c: v2.c }, { r: v3.r, c: v3.c }, { r: v4.r, c: v4.c }],
						patternName: t('patterns.pattern_1221_name'),
						rule: 'pattern_1221',
						explanation: isRed1221V ? t('patterns.pattern_1221_reduced_desc') : t('patterns.pattern_1221_desc')
					});
				}
			}
		}

		// 3. Scan ALL 1-2-X Patterns
		for (var a = 0; a < revealedNumbers.length; a++) {
			for (var b = 0; b < revealedNumbers.length; b++) {
				if (a === b) continue;
				var itemA = revealedNumbers[a];
				var itemB = revealedNumbers[b];

				if (itemA.remainingMines === 1 && itemB.remainingMines === 2 &&
					itemA.unrevealed.length === 2 && itemB.unrevealed.length === 3 &&
					isSubset(itemA.unrevealed, itemB.unrevealed)) {
					var diffX = getDifference(itemB.unrevealed, itemA.unrevealed);
					if (diffX.length === 1) {
						addPattern({
							action: 'flag',
							targetCells: diffX,
							causeCells: [{ r: itemA.r, c: itemA.c }, { r: itemB.r, c: itemB.c }],
							patternName: t('patterns.pattern_12x_name'),
							rule: 'pattern_12x',
							explanation: t('patterns.pattern_12x_desc', {
								numA: itemA.number,
								remA: itemA.remainingMines,
								numB: itemB.number,
								remB: itemB.remainingMines
							})
						});
					}
				}
			}
		}

		// 4. Scan ALL 1-1-X Patterns
		for (var a = 0; a < revealedNumbers.length; a++) {
			for (var b = 0; b < revealedNumbers.length; b++) {
				if (a === b) continue;
				var itemA = revealedNumbers[a];
				var itemB = revealedNumbers[b];

				if (itemA.remainingMines === 1 && itemB.remainingMines === 1 &&
					itemA.unrevealed.length === 2 && itemB.unrevealed.length >= 3 &&
					isSubset(itemA.unrevealed, itemB.unrevealed)) {
					var diffSafe = getDifference(itemB.unrevealed, itemA.unrevealed);
					if (diffSafe.length > 0) {
						addPattern({
							action: 'reveal',
							targetCells: diffSafe,
							causeCells: [{ r: itemA.r, c: itemA.c }, { r: itemB.r, c: itemB.c }],
							patternName: t('patterns.pattern_11x_name'),
							rule: 'pattern_11x',
							explanation: t('patterns.pattern_11x_desc', {
								numA: itemA.number,
								numB: itemB.number
							})
						});
					}
				}
			}
		}

		// 5. Scan General Subset Reductions (Algebraic)
		for (var a = 0; a < revealedNumbers.length; a++) {
			for (var b = 0; b < revealedNumbers.length; b++) {
				if (a === b) continue;
				var itemA = revealedNumbers[a];
				var itemB = revealedNumbers[b];

				if (itemA.unrevealed.length < itemB.unrevealed.length && isSubset(itemA.unrevealed, itemB.unrevealed)) {
					var diff = getDifference(itemB.unrevealed, itemA.unrevealed);
					var mineDiff = itemB.remainingMines - itemA.remainingMines;

					if (mineDiff === 0 && diff.length > 0) {
						addPattern({
							action: 'reveal',
							targetCells: diff,
							causeCells: [{ r: itemA.r, c: itemA.c }, { r: itemB.r, c: itemB.c }],
							patternName: t('patterns.pattern_corner1_name'),
							rule: 'subset_safe',
							explanation: t('patterns.pattern_corner1_desc')
						});
					} else if (mineDiff === diff.length && diff.length > 0) {
						addPattern({
							action: 'flag',
							targetCells: diff,
							causeCells: [{ r: itemA.r, c: itemA.c }, { r: itemB.r, c: itemB.c }],
							patternName: t('patterns.pattern_12x_name'),
							rule: 'subset_mine',
							explanation: t('patterns.pattern_12x_desc', {
								numA: itemA.number,
								remA: itemA.remainingMines,
								numB: itemB.number,
								remB: itemB.remainingMines
							})
						});
					}
				}
			}
		}

		return patterns;
	}

	/**
	 * Analyze board and find the most logical next step with natural language explanation.
	 */
	function findHint(board, rows, cols) {
		// PRIORITY 0: Detect mistakenly placed flags
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
				explanation: t('didactic.wrong_flag_alert')
			};
		}

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

		if (revealedNumbers.length === 0) {
			return {
				type: 'empty',
				explanation: t('didactic.no_logical_moves')
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
					explanation: t('didactic.rule_satisfied', { num: item.number })
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
					explanation: t('didactic.rule_all_mines', { num: item.number, mines: item.remainingMines })
				};
			}
		}

		// -------------------------------------------------------------
		// LEVEL 2A: Classic Tactical Patterns (1-2-1, 1-2-2-1, 1-2-X, 1-1-X)
		// -------------------------------------------------------------
		var patternHint = findTacticalPattern(revealedNumbers, board, rows, cols);
		if (patternHint) {
			return patternHint;
		}

		// -------------------------------------------------------------
		// LEVEL 2B: General Subset Reduction (Algebraic Subtraction)
		// -------------------------------------------------------------
		for (var a = 0; a < revealedNumbers.length; a++) {
			for (var b = 0; b < revealedNumbers.length; b++) {
				if (a === b) continue;
				var itemA = revealedNumbers[a];
				var itemB = revealedNumbers[b];

				if (itemA.unrevealed.length < itemB.unrevealed.length && isSubset(itemA.unrevealed, itemB.unrevealed)) {
					var diff = getDifference(itemB.unrevealed, itemA.unrevealed);
					var mineDiff = itemB.remainingMines - itemA.remainingMines;

					if (mineDiff === 0 && diff.length > 0) {
						return {
							action: 'reveal',
							targetCells: diff,
							causeCells: [{ r: itemA.r, c: itemA.c }, { r: itemB.r, c: itemB.c }],
							patternName: t('patterns.pattern_corner1_name'),
							rule: 'subset_safe',
							explanation: t('patterns.pattern_corner1_desc')
						};
					}

					if (mineDiff === diff.length && diff.length > 0) {
						return {
							action: 'flag',
							targetCells: diff,
							causeCells: [{ r: itemA.r, c: itemA.c }, { r: itemB.r, c: itemB.c }],
							patternName: t('patterns.pattern_12x_name'),
							rule: 'subset_mine',
							explanation: t('patterns.pattern_12x_desc', {
								numA: itemA.number,
								remA: itemA.remainingMines,
								numB: itemB.number,
								remB: itemB.remainingMines
							})
						};
					}
				}
			}
		}

		// -------------------------------------------------------------
		// LEVEL 3: Probabilistic Analysis / Frontier Risk Assessment
		// -------------------------------------------------------------
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

			return {
				action: 'guess',
				targetCells: [best],
				causeCells: causeList,
				rule: 'probabilistic_guess',
				safeProb: best.safeProb,
				explanation: t('didactic.best_guess', { x: best.c + 1, y: best.r + 1, prob: Math.round(best.mineProb * 100) })
			};
		}

		return {
			type: 'empty',
			explanation: t('didactic.no_logical_moves')
		};
	}

	/**
	 * Compute comprehensive safety map for all boundary cells (Heatmap Overlay).
	 */
	function getAllHints(board, rows, cols) {
		var safeMap = {};
		var mineMap = {};
		var guessMap = {};

		// Priority 0: Flagged cells that are actually safe
		for (var wr = 0; wr < rows; wr++) {
			for (var wc = 0; wc < cols; wc++) {
				if (board[wr][wc].flagged && board[wr][wc].mine === false) {
					safeMap[wr + ',' + wc] = { r: wr, c: wc, reason: 'wrong_flag' };
				}
			}
		}

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

		// 1. Level 1 rules
		for (var i = 0; i < revealedNumbers.length; i++) {
			var item = revealedNumbers[i];
			if (item.remainingMines === 0 && item.unrevealed.length > 0) {
				for (var u = 0; u < item.unrevealed.length; u++) {
					var key = item.unrevealed[u].r + ',' + item.unrevealed[u].c;
					safeMap[key] = { r: item.unrevealed[u].r, c: item.unrevealed[u].c, reason: 'satisfied' };
				}
			} else if (item.remainingMines > 0 && item.remainingMines === item.unrevealed.length) {
				for (var u = 0; u < item.unrevealed.length; u++) {
					var key = item.unrevealed[u].r + ',' + item.unrevealed[u].c;
					mineMap[key] = { r: item.unrevealed[u].r, c: item.unrevealed[u].c, reason: 'all_mines' };
				}
			}
		}

		// 2. Tactical Patterns & Subsets
		for (var a = 0; a < revealedNumbers.length; a++) {
			for (var b = 0; b < revealedNumbers.length; b++) {
				if (a === b) continue;
				var itemA = revealedNumbers[a];
				var itemB = revealedNumbers[b];

				if (itemA.unrevealed.length < itemB.unrevealed.length && isSubset(itemA.unrevealed, itemB.unrevealed)) {
					var diff = getDifference(itemB.unrevealed, itemA.unrevealed);
					var mineDiff = itemB.remainingMines - itemA.remainingMines;

					if (mineDiff === 0) {
						for (var d = 0; d < diff.length; d++) {
							safeMap[diff[d].r + ',' + diff[d].c] = { r: diff[d].r, c: diff[d].c, reason: 'subset_safe' };
						}
					} else if (mineDiff === diff.length) {
						for (var d = 0; d < diff.length; d++) {
							mineMap[diff[d].r + ',' + diff[d].c] = { r: diff[d].r, c: diff[d].c, reason: 'subset_mine' };
						}
					}
				}
			}
		}

		// 3. Probabilistic safety for remaining frontier
		for (var i = 0; i < revealedNumbers.length; i++) {
			var item = revealedNumbers[i];
			if (item.unrevealed.length === 0) continue;
			var localRisk = Math.max(0, Math.min(1, item.remainingMines / item.unrevealed.length));
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

		// Case A: The cell is already revealed
		if (cell.revealed) {
			if (numVal === 0) {
				return {
					type: 'revealed_empty',
					title: t('game.dig'),
					explanation: t('didactic.cell_revealed', { num: 0 })
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
					title: t('game.dig') + ' (' + numVal + ')',
					causeCells: [{ r: r, c: c }],
					targetCells: unrevealed,
					action: 'reveal',
					explanation: t('didactic.rule_satisfied', { num: numVal })
				};
			} else if (remaining === unrevealed.length) {
				return {
					type: 'all_mines',
					title: t('game.flag') + ' (' + numVal + ')',
					causeCells: [{ r: r, c: c }],
					targetCells: unrevealed,
					action: 'flag',
					explanation: t('didactic.rule_all_mines', { num: numVal, mines: remaining })
				};
			} else {
				return {
					type: 'number_info',
					title: t('game.info') + ' (' + numVal + ')',
					causeCells: [{ r: r, c: c }],
					targetCells: unrevealed,
					explanation: t('didactic.cell_revealed', { num: numVal })
				};
			}
		}

		// Case B: Flagged cell
		if (cell.flagged) {
			if (cell.mine === false) {
				return {
					type: 'wrong_flag',
					title: '❌ ' + t('game.flag'),
					action: 'unflag',
					targetCells: [{ r: r, c: c }],
					explanation: t('didactic.cell_wrong_flag')
				};
			}

			return {
				type: 'flagged_cell_confirmed',
				title: '🚩 ' + t('game.flag'),
				targetCells: [{ r: r, c: c }],
				explanation: t('didactic.cell_flagged')
			};
		}

		// Case C: Unrevealed cell
		var allHints = getAllHints(board, rows, cols);

		var isSafe = allHints.safe.some(function (s) { return s.r === r && s.c === c; });
		if (isSafe) {
			var nbs = getNeighbors(r, c, rows, cols);
			var causes = [];
			for (var i = 0; i < nbs.length; i++) {
				var nbCell = board[nbs[i].r][nbs[i].c];
				if (nbCell.revealed && (nbCell.count || nbCell.adjacentMines)) causes.push(nbs[i]);
			}
			return {
				type: 'safe_cell',
				title: t('game.dig'),
				action: 'reveal',
				targetCells: [{ r: r, c: c }],
				causeCells: causes,
				explanation: t('didactic.cell_safe_reason')
			};
		}

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
				title: t('game.flag'),
				action: 'flag',
				targetCells: [{ r: r, c: c }],
				causeCells: causes,
				explanation: t('didactic.cell_mine_reason')
			};
		}

		var guessInfo = allHints.guesses.find(function (g) { return g.r === r && g.c === c; });
		if (guessInfo) {
			return {
				type: 'guess_cell',
				title: t('game.info') + ' (' + guessInfo.safeProb + '%)',
				action: 'guess',
				safeProb: guessInfo.safeProb,
				targetCells: [{ r: r, c: c }],
				explanation: t('didactic.cell_ambiguous', { prob: Math.round(guessInfo.mineProb * 100) })
			};
		}

		return {
			type: 'isolated_cell',
			title: t('game.info'),
			targetCells: [{ r: r, c: c }],
			explanation: t('didactic.cell_ambiguous', { prob: 15 })
		};
	}

	var solver = {
		findHint: findHint,
		getAllHints: getAllHints,
		explainCell: explainCell,
		findAllTacticalPatterns: findAllTacticalPatterns
	};

	if (typeof window !== 'undefined') {
		window.MinesweeperSolver = solver;
	}

	return solver;
})();
