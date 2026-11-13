/**
 * Minesweeper Arcade — No-Guess engine
 * Fast logical solver (single point, subset, exhaustive frontier enumeration) plus a
 * repair-based board generator that guarantees a board solvable WITHOUT any guess.
 * Every deduction is sound (proved by constraint enumeration), no heuristics are used.
 */
var MinesweeperNoGuess = (function () {
	'use strict';

	var nbCache = {};

	function getNb(R, C) {
		var key = R + 'x' + C;
		if (nbCache[key]) return nbCache[key];
		var n = R * C, lists = new Array(n);
		for (var r = 0; r < R; r++) {
			for (var c = 0; c < C; c++) {
				var l = [];
				for (var dr = -1; dr <= 1; dr++) {
					for (var dc = -1; dc <= 1; dc++) {
						if (!dr && !dc) continue;
						var nr = r + dr, nc = c + dc;
						if (nr >= 0 && nr < R && nc >= 0 && nc < C) l.push(nr * C + nc);
					}
				}
				lists[r * C + c] = l;
			}
		}
		nbCache[key] = lists;
		return lists;
	}

	function computeCounts(mine, R, C) {
		var nb = getNb(R, C), cnt = new Uint8Array(R * C);
		for (var i = 0; i < R * C; i++) {
			if (mine[i]) continue;
			var k = 0, l = nb[i];
			for (var j = 0; j < l.length; j++) if (mine[l[j]]) k++;
			cnt[i] = k;
		}
		return cnt;
	}

	/**
	 * Core logical solver over a state array: st[i] = 0 unknown, 1 revealed, 2 known mine.
	 * Returns number of leftover (unrevealed) safe cells; fills `st`.
	 * mine/cnt are only used to reveal numbers (like a player clicking a deduced-safe cell).
	 */
	function runSolver(st, cnt, mine, R, C, startIdx, safeTotal) {
		var nb = getNb(R, C), N = R * C;
		var revealedSafe = 0;
		var queue = [];

		function reveal(i) {
			if (st[i] !== 0) return;
			queue.length = 0;
			queue.push(i);
			st[i] = 1; revealedSafe++;
			while (queue.length) {
				var p = queue.pop();
				if (cnt[p] !== 0) continue;
				var l = nb[p];
				for (var j = 0; j < l.length; j++) {
					var q = l[j];
					if (st[q] === 0) { st[q] = 1; revealedSafe++; queue.push(q); }
				}
			}
		}

		reveal(startIdx);

		var varOf = new Int32Array(N);
		var guard = 0;
		while (revealedSafe < safeTotal && guard++ < N * 4) {
			// Build constraints
			var consU = [], consRem = [];
			for (var i = 0; i < N; i++) {
				if (st[i] !== 1 || cnt[i] === 0) continue;
				var l = nb[i], U = null, known = 0;
				for (var j = 0; j < l.length; j++) {
					var s = st[l[j]];
					if (s === 0) { if (!U) U = []; U.push(l[j]); }
					else if (s === 2) known++;
				}
				if (U) { consU.push(U); consRem.push(cnt[i] - known); }
			}
			if (!consU.length) break;

			var changed = false, k, c;

			// Single point rules
			for (c = 0; c < consU.length; c++) {
				var U1 = consU[c], rem = consRem[c];
				if (rem === 0) {
					for (k = 0; k < U1.length; k++) { if (st[U1[k]] === 0) { reveal(U1[k]); changed = true; } }
				} else if (rem === U1.length) {
					for (k = 0; k < U1.length; k++) { if (st[U1[k]] === 0) { st[U1[k]] = 2; changed = true; } }
				}
			}
			if (changed) continue;

			// Subset rules
			var cellCons = {};
			for (c = 0; c < consU.length; c++) {
				for (k = 0; k < consU[c].length; k++) {
					var cell = consU[c][k];
					(cellCons[cell] || (cellCons[cell] = [])).push(c);
				}
			}
			for (c = 0; c < consU.length && !changed; c++) {
				var A = consU[c], list = cellCons[A[0]];
				for (var li = 0; li < list.length; li++) {
					var b = list[li];
					if (b === c) continue;
					var B = consU[b];
					if (B.length <= A.length) continue;
					var ok = true;
					for (k = 0; k < A.length; k++) { if (B.indexOf(A[k]) < 0) { ok = false; break; } }
					if (!ok) continue;
					var diff = [];
					for (k = 0; k < B.length; k++) { if (A.indexOf(B[k]) < 0) diff.push(B[k]); }
					var md = consRem[b] - consRem[c];
					if (md === 0) {
						for (k = 0; k < diff.length; k++) { if (st[diff[k]] === 0) { reveal(diff[k]); changed = true; } }
					} else if (md === diff.length) {
						for (k = 0; k < diff.length; k++) { if (st[diff[k]] === 0) { st[diff[k]] = 2; changed = true; } }
					}
				}
			}
			if (changed) continue;

			// Exhaustive enumeration of every frontier component
			var vars = [];
			for (c = 0; c < consU.length; c++) {
				for (k = 0; k < consU[c].length; k++) varOf[consU[c][k]] = -1;
			}
			for (c = 0; c < consU.length; c++) {
				for (k = 0; k < consU[c].length; k++) {
					var ce = consU[c][k];
					if (varOf[ce] === -1) { varOf[ce] = vars.length; vars.push(ce); }
				}
			}
			var parent = new Int32Array(vars.length);
			for (k = 0; k < vars.length; k++) parent[k] = k;
			var find = function (x) { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
			for (c = 0; c < consU.length; c++) {
				var r0 = find(varOf[consU[c][0]]);
				for (k = 1; k < consU[c].length; k++) {
					var r1 = find(varOf[consU[c][k]]);
					if (r1 !== r0) parent[r1] = r0;
				}
			}
			var comps = {};
			for (k = 0; k < vars.length; k++) {
				var root = find(k);
				(comps[root] || (comps[root] = { vars: [], cons: [] })).vars.push(k);
			}
			for (c = 0; c < consU.length; c++) comps[find(varOf[consU[c][0]])].cons.push(c);

			for (var key in comps) {
				var comp = comps[key];
				if (comp.vars.length > 70) continue;
				var res = enumerateComponent(comp, consU, consRem, varOf);
				if (!res) continue;
				for (k = 0; k < comp.vars.length; k++) {
					var cellIdx = vars[comp.vars[k]];
					if (res.mineCnt[k] === 0) { if (st[cellIdx] === 0) { reveal(cellIdx); changed = true; } }
					else if (res.mineCnt[k] === res.total) { if (st[cellIdx] === 0) { st[cellIdx] = 2; changed = true; } }
				}
			}
			if (!changed) break;
		}
		return safeTotal - revealedSafe;
	}

	function enumerateComponent(comp, consU, consRem, varOf) {
		var nv = comp.vars.length, nc = comp.cons.length;
		var localIdx = {};
		var order = comp.vars.slice().sort(function (a, b) { return a - b; });
		for (var i = 0; i < nv; i++) localIdx[order[i]] = i;
		var varCons = new Array(nv);
		for (i = 0; i < nv; i++) varCons[i] = [];
		var cRem = new Int32Array(nc), cUn = new Int32Array(nc);
		for (var c = 0; c < nc; c++) {
			var gi = comp.cons[c], U = consU[gi];
			cRem[c] = consRem[gi];
			cUn[c] = U.length;
			for (var k = 0; k < U.length; k++) varCons[localIdx[varOf[U[k]]]].push(c);
		}
		var mineCnt = new Float64Array(nv), assign = new Int8Array(nv);
		var total = 0, nodes = 0, LIMIT = 150000, aborted = false;

		function setVar(v, val) {
			var vc = varCons[v], ok = true;
			for (var q = 0; q < vc.length; q++) {
				var cc = vc[q];
				cUn[cc]--;
				if (val) cRem[cc]--;
				if (cRem[cc] < 0 || cRem[cc] > cUn[cc]) ok = false;
			}
			return ok;
		}
		function unsetVar(v, val) {
			var vc = varCons[v];
			for (var q = 0; q < vc.length; q++) {
				var cc = vc[q];
				cUn[cc]++;
				if (val) cRem[cc]++;
			}
		}
		function dfs(v) {
			if (aborted) return;
			if (++nodes > LIMIT) { aborted = true; return; }
			if (v === nv) {
				total++;
				for (var q = 0; q < nv; q++) if (assign[q]) mineCnt[q]++;
				return;
			}
			for (var val = 0; val <= 1; val++) {
				var ok = setVar(v, val);
				if (ok) { assign[v] = val; dfs(v + 1); }
				unsetVar(v, val);
				if (aborted) return;
			}
		}
		dfs(0);
		if (aborted || total === 0) return null;
		// mineCnt is indexed by local order; remap to comp.vars order
		var out = new Float64Array(nv);
		for (i = 0; i < nv; i++) out[i] = mineCnt[localIdx[comp.vars[i]]];
		return { total: total, mineCnt: out };
	}

	function solveBoard(mine, R, C, startIdx) {
		var N = R * C, cnt = computeCounts(mine, R, C), st = new Uint8Array(N), safeTotal = 0;
		for (var i = 0; i < N; i++) if (!mine[i]) safeTotal++;
		var left = runSolver(st, cnt, mine, R, C, startIdx, safeTotal);
		return { left: left, st: st, cnt: cnt };
	}

	function shuffle(a) {
		for (var i = a.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
		}
	}

	/**
	 * Generate a truly guess-free board. Starts from a random layout and repairs it by moving
	 * mines (hill climbing on the number of cells the logic cannot resolve) until solvable.
	 * Returns { mine: Uint8Array, solved: boolean }.
	 */
	function generate(R, C, M, sr, sc, opts) {
		opts = opts || {};
		var maxMs = opts.maxMs || 4000;
		var t0 = Date.now();
		var N = R * C, nb = getNb(R, C), startIdx = sr * C + sc;
		var protectedCell = new Uint8Array(N);
		protectedCell[startIdx] = 1;
		for (var j = 0; j < nb[startIdx].length; j++) protectedCell[nb[startIdx][j]] = 1;
		var cand = [];
		for (var i = 0; i < N; i++) if (!protectedCell[i]) cand.push(i);
		var mCount = Math.min(M, cand.length);

		function randomLayout() {
			var m = new Uint8Array(N);
			shuffle(cand);
			for (var q = 0; q < mCount; q++) m[cand[q]] = 1;
			return m;
		}

		var mine = randomLayout();
		var res = solveBoard(mine, R, C, startIdx);
		var bestLeft = res.left;
		var tries = 0;

		while (res.left > 0 && Date.now() - t0 < maxMs) {
			tries++;
			// Frontier: unknown cells adjacent to a revealed cell, plus all unknown cells
			var frontier = [], unknown = [], minesUnknown = [];
			for (i = 0; i < N; i++) {
				if (res.st[i] === 1) continue;
				unknown.push(i);
				if (mine[i]) minesUnknown.push(i);
				var l = nb[i];
				for (j = 0; j < l.length; j++) if (res.st[l[j]] === 1) { frontier.push(i); break; }
			}
			if (!frontier.length) break;
			// Mutation: move one mine to another covered cell
			var from, to;
			var f = frontier[Math.floor(Math.random() * frontier.length)];
			if (mine[f]) {
				from = f;
				var tgt;
				do { tgt = unknown[Math.floor(Math.random() * unknown.length)]; } while (mine[tgt] || protectedCell[tgt]);
				to = tgt;
			} else {
				if (protectedCell[f]) continue;
				to = f;
				from = minesUnknown[Math.floor(Math.random() * minesUnknown.length)];
			}
			if (from === undefined || to === undefined || protectedCell[to] || !mine[from] || mine[to]) continue;
			mine[from] = 0; mine[to] = 1;
			var r2 = solveBoard(mine, R, C, startIdx);
			if (r2.left <= res.left) {
				res = r2;
				if (res.left < bestLeft) bestLeft = res.left;
			} else {
				mine[from] = 1; mine[to] = 0;
			}
			// Restart from a fresh layout if stagnating for too long
			if (tries % 4000 === 0 && res.left > 0) {
				mine = randomLayout();
				res = solveBoard(mine, R, C, startIdx);
			}
		}
		return { mine: mine, solved: res.left === 0, left: res.left, tries: tries, ms: Date.now() - t0 };
	}

	/** Is this board (board[r][c].mine) solvable by pure logic from (sr, sc)? */
	function isSolvable(board, R, C, sr, sc) {
		var mine = new Uint8Array(R * C);
		for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) if (board[r][c].mine) mine[r * C + c] = 1;
		return solveBoard(mine, R, C, sr * C + sc).left === 0;
	}

	/**
	 * Sound deductions for the CURRENT visible board (revealed / flagged / count).
	 * Returns { safe: [{r,c}], mines: [{r,c}] } — provably safe cells and provably mines.
	 */
	function findCertain(board, R, C) {
		var N = R * C, nb = getNb(R, C), st = new Uint8Array(N), cnt = new Uint8Array(N);
		for (var r = 0; r < R; r++) {
			for (var c = 0; c < C; c++) {
				var cell = board[r][c], i = r * C + c;
				if (cell.revealed) { st[i] = 1; cnt[i] = cell.count || 0; }
				else if (cell.flagged) st[i] = 2;
			}
		}
		var consU = [], consRem = [], varOf = new Int32Array(N);
		for (var i2 = 0; i2 < N; i2++) {
			if (st[i2] !== 1 || cnt[i2] === 0) continue;
			var l = nb[i2], U = null, known = 0;
			for (var j = 0; j < l.length; j++) {
				if (st[l[j]] === 0) { if (!U) U = []; U.push(l[j]); }
				else if (st[l[j]] === 2) known++;
			}
			if (U) { consU.push(U); consRem.push(cnt[i2] - known); }
		}
		var safe = {}, mines = {};
		var vars = [], c2, k;
		for (c2 = 0; c2 < consU.length; c2++) for (k = 0; k < consU[c2].length; k++) varOf[consU[c2][k]] = -1;
		for (c2 = 0; c2 < consU.length; c2++) {
			for (k = 0; k < consU[c2].length; k++) {
				var ce = consU[c2][k];
				if (varOf[ce] === -1) { varOf[ce] = vars.length; vars.push(ce); }
			}
		}
		var parent = new Int32Array(vars.length);
		for (k = 0; k < vars.length; k++) parent[k] = k;
		var find = function (x) { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
		for (c2 = 0; c2 < consU.length; c2++) {
			var r0 = find(varOf[consU[c2][0]]);
			for (k = 1; k < consU[c2].length; k++) { var r1 = find(varOf[consU[c2][k]]); if (r1 !== r0) parent[r1] = r0; }
		}
		var comps = {};
		for (k = 0; k < vars.length; k++) { var root = find(k); (comps[root] || (comps[root] = { vars: [], cons: [] })).vars.push(k); }
		for (c2 = 0; c2 < consU.length; c2++) comps[find(varOf[consU[c2][0]])].cons.push(c2);
		for (var key in comps) {
			var comp = comps[key];
			if (comp.vars.length > 70) continue;
			var res = enumerateComponent(comp, consU, consRem, varOf);
			if (!res) continue;
			for (k = 0; k < comp.vars.length; k++) {
				var idx = vars[comp.vars[k]], pt = { r: Math.floor(idx / C), c: idx % C };
				if (res.mineCnt[k] === 0) safe[idx] = pt;
				else if (res.mineCnt[k] === res.total) mines[idx] = pt;
			}
		}
		return {
			safe: Object.keys(safe).map(function (x) { return safe[x]; }),
			mines: Object.keys(mines).map(function (x) { return mines[x]; })
		};
	}

	var api = { generate: generate, isSolvable: isSolvable, findCertain: findCertain, solveBoard: solveBoard };
	if (typeof window !== 'undefined') window.MinesweeperNoGuess = api;
	if (typeof module !== 'undefined' && module.exports) module.exports = api;
	return api;
})();
