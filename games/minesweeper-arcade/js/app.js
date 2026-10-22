/**
 * Minesweeper Arcade — Main Application Controller
 * Handles gameplay loop, UI interaction, Educational Tutor Mode, and PointNet API integration.
 */
(function () {
	'use strict';

	/* ============================================================
	   CONFIG & PRESETS
	   ============================================================ */
	var CLASSIC_PRESETS = {
		easy:    { rows: 9,  cols: 9,  mines: 10,  label: 'Facile',    key: 'easy',    par: 120, baseScore: 5000,  maxBonus: 5000 },
		medium:  { rows: 16, cols: 16, mines: 40,  label: 'Medio',     key: 'medium',  par: 300, baseScore: 15000, maxBonus: 10000 },
		hard:    { rows: 16, cols: 30, mines: 99,  label: 'Difficile', key: 'hard',    par: 600, baseScore: 35000, maxBonus: 15000 },
		extreme: { rows: 18, cols: 32, mines: 150, label: 'Estremo',   key: 'extreme', par: 900, baseScore: 70000, maxBonus: 30000 }
	};

	var SCALATA_LEVELS = [
		{ rows: 8,  cols: 8,  mines: 7,   label: '1' },
		{ rows: 8,  cols: 8,  mines: 9,   label: '2' },
		{ rows: 9,  cols: 9,  mines: 10,  label: '3' },
		{ rows: 10, cols: 9,  mines: 12,  label: '4' },
		{ rows: 10, cols: 10, mines: 15,  label: '5' },
		{ rows: 12, cols: 10, mines: 18,  label: '6' },
		{ rows: 12, cols: 12, mines: 22,  label: '7' },
		{ rows: 14, cols: 12, mines: 26,  label: '8' },
		{ rows: 14, cols: 14, mines: 31,  label: '9' },
		{ rows: 16, cols: 14, mines: 36,  label: '10' },
		{ rows: 16, cols: 16, mines: 40,  label: '11' },
		{ rows: 18, cols: 16, mines: 47,  label: '12' },
		{ rows: 20, cols: 16, mines: 55,  label: '13' },
		{ rows: 22, cols: 16, mines: 64,  label: '14' },
		{ rows: 25, cols: 16, mines: 75,  label: '15' },
		{ rows: 28, cols: 16, mines: 88,  label: '16' },
		{ rows: 30, cols: 16, mines: 99,  label: '17' },
		{ rows: 32, cols: 18, mines: 150, label: '18' }
	];

	/* ============================================================
	   GAME STATE
	   ============================================================ */
	var state = {
		mode: 'classic', // 'classic' or 'arcade' (Scalata)
		classicDifficulty: 'easy',
		levelIndex: 0,
		board: [],
		actualRows: 9,
		actualCols: 9,
		revealed: 0,
		safeCells: 0,
		flags: 0,
		started: false,
		gameOver: false,
		scoreSubmitted: false,
		timerInterval: null,
		elapsed: 0,
		totalElapsed: 0,
		firstClick: true,
		inputMode: 'dig', // 'dig', 'flag', or 'inspect'
		snapshot: null,
		preExplosion: null,
		isReplay: false,
		isDidactic: false, // Educational practice mode
		heatmapEnabled: false
	};

	var totalScore = 0;

	/* ============================================================
	   DOM REFERENCES
	   ============================================================ */
	var boardArenaEl = document.getElementById('board-arena');
	var boardViewportEl = document.getElementById('board-viewport');
	var boardLayerEl = document.getElementById('board-layer');
	var boardEl = document.getElementById('board');
	var mineCountEl = document.getElementById('mine-count');
	var timerEl = document.getElementById('timer');
	var scoreTotalEl = document.getElementById('score-total');
	var levelLabelEl = document.getElementById('level-label');
	var levelProgressEl = document.getElementById('level-progress');
	var btnModeDig = document.getElementById('btn-mode-dig');
	var btnModeFlag = document.getElementById('btn-mode-flag');
	var btnModeInspect = document.getElementById('btn-mode-inspect');
	var btnZoomFit = document.getElementById('btn-zoom-fit');
	var btnZoomIn = document.getElementById('btn-zoom-in');
	var btnZoomOut = document.getElementById('btn-zoom-out');
	var soundToggle = document.getElementById('sound-toggle');
	var btnMenu = document.getElementById('btn-menu');
	var overlayEl = document.getElementById('overlay');
	var modalEmoji = document.getElementById('modal-emoji');
	var modalTitle = document.getElementById('modal-title');
	var modalScore = document.getElementById('modal-score');
	var modalPosition = document.getElementById('modal-position');
	var splashEl = document.getElementById('splash');
	var splashScalataBtn = document.getElementById('splash-play-scalata');
	var splashPlayerStatus = document.getElementById('splash-player-status');
	var fsCloseBtn = document.getElementById('fs-close');

	// Educational Mode UI Elements
	var didacticBanner = document.getElementById('didactic-banner');
	var btnDidacticHeatmap = document.getElementById('btn-didactic-heatmap');
	var btnDidacticHint = document.getElementById('btn-didactic-hint');
	var didacticToast = document.getElementById('didactic-toast');
	var didacticToastTitle = document.getElementById('didactic-toast-title');
	var didacticToastText = document.getElementById('didactic-toast-text');
	var didacticToastClose = document.getElementById('didactic-toast-close');

	soundToggle.textContent = AudioFX.isEnabled() ? '🔊' : '🔇';

	/* ============================================================
	   HELPERS & UTILITIES
	   ============================================================ */
	function haptic(ms) {
		AudioFX.haptic(ms);
	}

	function shuffle(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i]; array[i] = array[j]; array[j] = temp;
		}
		return array;
	}

	function getNeighbors(r, c, rows, cols) {
		var neighbors = [];
		for (var dr = -1; dr <= 1; dr++) {
			for (var dc = -1; dc <= 1; dc++) {
				if (dr === 0 && dc === 0) continue;
				var nr = r + dr, nc = c + dc;
				if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) neighbors.push({ r: nr, c: nc });
			}
		}
		return neighbors;
	}

	function particleBurst(x, y, colors, count) {
		for (var i = 0; i < count; i++) {
			var particle = document.createElement('div');
			particle.className = 'particle';
			var size = 4 + Math.random() * 6;
			particle.style.width = size + 'px';
			particle.style.height = size + 'px';
			particle.style.background = colors[Math.floor(Math.random() * colors.length)];
			particle.style.left = x + 'px';
			particle.style.top = y + 'px';
			var angle = Math.random() * Math.PI * 2;
			var dist = 24 + Math.random() * 45;
			particle.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
			particle.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
			document.body.appendChild(particle);
			setTimeout(function (p) { p.remove(); }, 650, particle);
		}
	}

	function launchConfetti() {
		var colors = ['#38bdf8', '#f472b6', '#fbbf24', '#34d399', '#a78bfa', '#fb923c'];
		for (var i = 0; i < 80; i++) {
			setTimeout(function () {
				var conf = document.createElement('div');
				conf.className = 'confetti';
				conf.style.left = Math.random() * 100 + 'vw';
				conf.style.background = colors[Math.floor(Math.random() * colors.length)];
				conf.style.animationDelay = (Math.random() * 0.4) + 's';
				conf.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
				document.body.appendChild(conf);
				setTimeout(function (c) { c.remove(); }, 3000, conf);
			}, Math.random() * 400);
		}
	}

	function formatTime(seconds) {
		var s = Math.max(0, parseInt(seconds, 10) || 0);
		var mins = Math.floor(s / 60);
		var secs = s % 60;
		return (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
	}

	/* ============================================================
	   GRID & DIMENSIONS
	   ============================================================ */
	function getGridDimensions() {
		if (state.mode === 'classic') {
			var preset = CLASSIC_PRESETS[state.classicDifficulty] || CLASSIC_PRESETS.easy;
			var isPortrait = window.innerHeight > window.innerWidth;
			if (isPortrait && preset.cols > preset.rows) {
				return { rows: preset.cols, cols: preset.rows, mines: preset.mines };
			}
			return { rows: preset.rows, cols: preset.cols, mines: preset.mines };
		}

		var level = SCALATA_LEVELS[Math.min(state.levelIndex, SCALATA_LEVELS.length - 1)];
		var isLandscape = window.matchMedia('(orientation: landscape)').matches && window.innerHeight < 600;
		if (isLandscape && level.rows > level.cols) {
			return { rows: level.cols, cols: level.rows, mines: level.mines };
		}
		var isPort = window.innerHeight > window.innerWidth;
		if (isPort && level.cols > level.rows) {
			return { rows: level.cols, cols: level.rows, mines: level.mines };
		}
		return { rows: level.rows, cols: level.cols, mines: level.mines };
	}

	function initBoard(rows, cols) {
		state.actualRows = rows;
		state.actualCols = cols;
		state.board = [];
		for (var r = 0; r < rows; r++) {
			state.board[r] = [];
			for (var c = 0; c < cols; c++) {
				state.board[r][c] = { mine: false, revealed: false, flagged: false, count: 0 };
			}
		}
	}

	function placeMines(rows, cols, mines, safeR, safeC) {
		var safe = {};
		safe[safeR + ',' + safeC] = true;
		getNeighbors(safeR, safeC, rows, cols).forEach(function (n) {
			safe[n.r + ',' + n.c] = true;
		});

		var positions = [];
		for (var r = 0; r < rows; r++) {
			for (var c = 0; c < cols; c++) {
				if (!safe[r + ',' + c]) positions.push({ r: r, c: c });
			}
		}

		shuffle(positions);
		for (var i = 0; i < mines && i < positions.length; i++) {
			var pos = positions[i];
			state.board[pos.r][pos.c].mine = true;
		}

		for (var r2 = 0; r2 < rows; r2++) {
			for (var c2 = 0; c2 < cols; c2++) {
				if (state.board[r2][c2].mine) continue;
				var count = 0;
				getNeighbors(r2, c2, rows, cols).forEach(function (n) {
					if (state.board[n.r][n.c].mine) count++;
				});
				state.board[r2][c2].count = count;
			}
		}
	}

	function getCellSize() {
		var dims = getGridDimensions();
		var maxDim = Math.max(dims.rows, dims.cols);
		if (maxDim <= 9) return 40;
		if (maxDim <= 16) return 34;
		return 30;
	}

	/* ============================================================
	   TIMER CONTROLLER
	   ============================================================ */
	function startTimer() {
		stopTimer();
		state.timerInterval = setInterval(function () {
			state.elapsed++;
			timerEl.textContent = state.elapsed;
		}, 1000);
	}

	function stopTimer() {
		if (state.timerInterval) {
			clearInterval(state.timerInterval);
			state.timerInterval = null;
		}
	}

	/* ============================================================
	   RENDERING & BOARD DISPLAY
	   ============================================================ */
	function clearDidacticHighlights(keepHeatmap) {
		var selector = keepHeatmap ?
			'.cell-hint-inspect, .cell-hint-cause' :
			'.cell-hint-safe, .cell-hint-mine, .cell-hint-cause, .cell-hint-guess, .cell-hint-inspect';
		var highlighted = boardEl.querySelectorAll(selector);
		highlighted.forEach(function (el) {
			if (keepHeatmap) {
				el.classList.remove('cell-hint-inspect', 'cell-hint-cause');
			} else {
				el.classList.remove('cell-hint-safe', 'cell-hint-mine', 'cell-hint-cause', 'cell-hint-guess', 'cell-hint-inspect');
			}
		});
		if (didacticToast) didacticToast.classList.remove('show');
	}

	function applyHeatmapOverlay() {
		if (!state.isDidactic || !state.heatmapEnabled || typeof MinesweeperSolver === 'undefined') return;
		var dims = getGridDimensions();
		var hints = MinesweeperSolver.getAllHints(state.board, dims.rows, dims.cols);

		hints.safe.forEach(function (pos) {
			var el = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
			if (el && !el.classList.contains('cell-hint-inspect')) el.classList.add('cell-hint-safe');
		});

		hints.mines.forEach(function (pos) {
			var el = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
			if (el && !el.classList.contains('cell-hint-inspect')) el.classList.add('cell-hint-mine');
		});

		hints.guesses.forEach(function (pos) {
			var el = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
			if (el && !el.classList.contains('cell-hint-inspect')) el.classList.add('cell-hint-guess');
		});
	}

	function renderBoard() {
		var dims = getGridDimensions();
		var cellSize = getCellSize();

		boardEl.innerHTML = '';
		boardEl.style.gridTemplateColumns = 'repeat(' + dims.cols + ', ' + cellSize + 'px)';

		for (var r = 0; r < dims.rows; r++) {
			for (var c = 0; c < dims.cols; c++) {
				var cellEl = document.createElement('button');
				cellEl.className = 'cell';
				cellEl.style.width = cellSize + 'px';
				cellEl.style.height = cellSize + 'px';
				cellEl.dataset.r = r;
				cellEl.dataset.c = c;

				// Touch Handling
				cellEl.addEventListener('touchstart', function () {
					var el = this;
					var r = parseInt(el.dataset.r, 10);
					var c = parseInt(el.dataset.c, 10);
					el._longPressFired = false;
					clearTimeout(el._longPressTimer);

					el._longPressTimer = setTimeout(function () {
						el._longPressFired = true;
						el._lastLongPressTime = Date.now();
						handleFlag(r, c);
						haptic(20);
					}, 350);
				}, { passive: true });

				cellEl.addEventListener('touchend', function () {
					clearTimeout(this._longPressTimer);
					if (this._longPressFired) {
						this._preventClickUntil = Date.now() + 350;
					}
				});

				cellEl.addEventListener('touchmove', function () {
					clearTimeout(this._longPressTimer);
					this._longPressFired = false;
				}, { passive: true });

				cellEl.addEventListener('contextmenu', function (e) {
					e.preventDefault();
					var el = this;
					if (el._longPressFired || (el._lastLongPressTime && Date.now() - el._lastLongPressTime < 450)) {
						return;
					}
					var r = parseInt(el.dataset.r, 10);
					var c = parseInt(el.dataset.c, 10);
					handleFlag(r, c);
				});

				cellEl.addEventListener('click', function (e) {
					var el = this;
					if (el._preventClickUntil && Date.now() < el._preventClickUntil) {
						e.preventDefault();
						e.stopImmediatePropagation();
						el._preventClickUntil = 0;
						return;
					}
					if (ViewportManager.shouldPreventClick()) {
						return;
					}

					var r = parseInt(el.dataset.r, 10);
					var c = parseInt(el.dataset.c, 10);
					var cell = state.board[r] && state.board[r][c];
					if (!cell) return;

					// If in Didactic Mode and Inspect button is active, explain any clicked cell!
					if (state.isDidactic && state.inputMode === 'inspect') {
						inspectCell(r, c);
						return;
					}

					clearDidacticHighlights(state.heatmapEnabled);

					// When clicking an already revealed cell (with a number), perform chording (dig remaining safe cells)!
					if (cell.revealed) {
						handleChord(r, c);
						return;
					}

					if (state.inputMode === 'flag') {
						handleFlag(r, c);
					} else {
						handleReveal(r, c);
					}
				});

				boardEl.appendChild(cellEl);
			}
		}

		updateBoardDisplay();
		ViewportManager.fitToScreen(false);
	}

	function updateBoardDisplay() {
		var dims = getGridDimensions();
		var cells = boardEl.querySelectorAll('.cell');

		cells.forEach(function (cellEl) {
			var r = parseInt(cellEl.dataset.r, 10);
			var c = parseInt(cellEl.dataset.c, 10);
			if (!state.board[r] || !state.board[r][c]) return;
			var cell = state.board[r][c];

			cellEl.className = 'cell';
			cellEl.textContent = '';
			cellEl.style.pointerEvents = state.gameOver ? 'none' : '';

			if (cell.flagged) {
				cellEl.classList.add('flagged');
				if (state.isDidactic && !cell.mine) {
					cellEl.classList.add('didactic-wrong-flag');
					cellEl.textContent = '❌';
					cellEl.title = 'Bandiera errata: qui non c\'è una mina!';
				} else {
					cellEl.textContent = '🚩';
				}
			} else if (cell.revealed) {
				cellEl.classList.add('revealed');
				if (cell.mine) {
					cellEl.textContent = '💣';
				} else if (cell.count > 0) {
					cellEl.textContent = cell.count;
					cellEl.classList.add('num-' + cell.count, 'has-number');
				}
			}
		});

		mineCountEl.textContent = Math.max(0, dims.mines - state.flags);

		// If heatmap is active in didactic mode, re-apply colors to frontier cells
		if (state.isDidactic && state.heatmapEnabled) {
			applyHeatmapOverlay();
		}
	}

	/* ============================================================
	   CHORDING
	   ============================================================ */
	function handleChord(r, c) {
		if (state.gameOver) return;
		var cell = state.board[r][c];
		if (!cell.revealed || cell.count === 0) return;

		var dims = getGridDimensions();
		var neighbors = getNeighbors(r, c, dims.rows, dims.cols);

		var flaggedCount = 0;
		neighbors.forEach(function (n) {
			if (state.board[n.r][n.c].flagged) flaggedCount++;
		});

		if (flaggedCount === cell.count) {
			var fatalMine = null;
			var safeToReveal = [];

			neighbors.forEach(function (n) {
				var nCell = state.board[n.r][n.c];
				if (!nCell.revealed && !nCell.flagged) {
					if (nCell.mine) {
						if (!fatalMine) fatalMine = n;
					} else {
						safeToReveal.push(n);
					}
				}
			});

			if (fatalMine) {
				var preMove = {
					board: JSON.stringify(state.board),
					revealed: state.revealed,
					flags: state.flags,
					elapsed: state.elapsed
				};
				haptic(120);
				revealMine(fatalMine.r, fatalMine.c, preMove);
				return;
			}

			if (safeToReveal.length > 0) {
				AudioFX.chord();
				haptic(25);
				safeToReveal.forEach(function (n) {
					if (!state.board[n.r][n.c].revealed) {
						floodReveal(n.r, n.c);
					}
				});

				if (state.revealed >= state.safeCells) {
					levelComplete();
				}
			}
		} else {
			neighbors.forEach(function (n) {
				var nCell = state.board[n.r][n.c];
				if (!nCell.revealed && !nCell.flagged) {
					var el = boardEl.querySelector('[data-r="' + n.r + '"][data-c="' + n.c + '"]');
					if (el) {
						el.classList.add('cell-hint');
						setTimeout(function () { el.classList.remove('cell-hint'); }, 180);
					}
				}
			});
		}
	}

	/* ============================================================
	   REVEAL & EXPANSION
	   ============================================================ */
	function handleReveal(r, c) {
		if (state.gameOver) return;

		var cell = state.board[r][c];
		if (cell.revealed || cell.flagged) return;

		AudioFX.click();
		haptic(12);

		if (state.firstClick) {
			state.firstClick = false;
			var dims = getGridDimensions();
			placeMines(dims.rows, dims.cols, dims.mines, r, c);
			state.safeCells = dims.rows * dims.cols - dims.mines;
			state.snapshot = JSON.stringify(state.board);
			startTimer();
		}

		var preMove = {
			board: JSON.stringify(state.board),
			revealed: state.revealed,
			flags: state.flags,
			elapsed: state.elapsed
		};

		if (cell.mine) {
			haptic(120);
			revealMine(r, c, preMove);
			return;
		}

		floodReveal(r, c);

		if (state.revealed >= state.safeCells) {
			levelComplete();
		}
	}

	function floodReveal(originR, originC) {
		var dims = getGridDimensions();
		var queue = [{ r: originR, c: originC }];
		var newRevealed = [];

		while (queue.length) {
			var pos = queue.shift();
			var cell = state.board[pos.r][pos.c];
			if (cell.revealed || cell.flagged || cell.mine) continue;

			cell.revealed = true;
			newRevealed.push(pos);

			if (cell.count === 0) {
				getNeighbors(pos.r, pos.c, dims.rows, dims.cols).forEach(function (n) {
					var nCell = state.board[n.r][n.c];
					if (!nCell.revealed && !nCell.flagged && !nCell.mine) queue.push(n);
				});
			}
		}

		state.revealed += newRevealed.length;
		if (newRevealed.length > 1) {
			AudioFX.reveal();
		} else if (newRevealed.length === 1) {
			AudioFX.revealNumber(state.board[originR][originC].count);
		}

		newRevealed.forEach(function (pos) {
			var cellEl = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
			if (cellEl) {
				var dist = Math.hypot(pos.r - originR, pos.c - originC);
				cellEl.style.animation = 'none';
				void cellEl.offsetHeight;
				cellEl.style.animation = 'cell-ripple-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both ' + (dist * 0.035) + 's';
			}
		});

		updateBoardDisplay();
	}

	function handleFlag(r, c) {
		if (state.gameOver) return;
		var cell = state.board[r][c];
		if (cell.revealed) return;

		if (cell.flagged) {
			cell.flagged = false;
			state.flags--;
			AudioFX.unflag();
			haptic(12);
		} else {
			cell.flagged = true;
			state.flags++;
			AudioFX.flag();
			haptic(18);
			var cellEl = boardEl.querySelector('[data-r="' + r + '"][data-c="' + c + '"]');
			if (cellEl) {
				var rect = cellEl.getBoundingClientRect();
				particleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#fbbf24', '#f59e0b', '#38bdf8'], 7);
			}
		}

		updateBoardDisplay();
	}

	function revealMine(r, c, preMove) {
		state.gameOver = true;
		state.started = false;
		stopTimer();
		AudioFX.explosion();
		AudioFX.lose();

		if (preMove) state.preExplosion = preMove;

		var dims = getGridDimensions();

		for (var row = 0; row < dims.rows; row++) {
			for (var col = 0; col < dims.cols; col++) {
				var cell = state.board[row][col];
				if (cell.mine) cell.revealed = true;
			}
		}

		updateBoardDisplay();

		var bombPositions = [];
		for (var row2 = 0; row2 < dims.rows; row2++) {
			for (var col2 = 0; col2 < dims.cols; col2++) {
				if (state.board[row2][col2].mine) bombPositions.push({ r: row2, c: col2 });
			}
		}

		bombPositions.forEach(function (pos) {
			var cellEl = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
			if (cellEl) cellEl.classList.add('mine-shown');
		});

		var hitCell = boardEl.querySelector('[data-r="' + r + '"][data-c="' + c + '"]');
		if (hitCell) {
			hitCell.classList.add('mine-hit');
			var rect = hitCell.getBoundingClientRect();
			particleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, ['#ef4444', '#fb923c', '#fbbf24'], 24);
		}

		for (var r2 = 0; r2 < dims.rows; r2++) {
			for (var c2 = 0; c2 < dims.cols; c2++) {
				if (state.board[r2][c2].flagged && !state.board[r2][c2].mine) {
					var wrongEl = boardEl.querySelector('[data-r="' + r2 + '"][data-c="' + c2 + '"]');
					if (wrongEl) { wrongEl.classList.add('wrong-flag'); wrongEl.textContent = '❌'; }
				}
			}
		}

		boardEl.classList.add('game-over');

		setTimeout(function () {
			showGameOver();
		}, 700);
	}

	/* ============================================================
	   GAME COMPLETION & OVERLAY
	   ============================================================ */
	function levelComplete() {
		state.gameOver = true;
		stopTimer();
		AudioFX.levelUp();

		var dims = getGridDimensions();

		for (var r = 0; r < dims.rows; r++) {
			for (var c = 0; c < dims.cols; c++) {
				if (state.board[r][c].mine && !state.board[r][c].flagged) {
					state.board[r][c].flagged = true;
					state.flags++;
				}
			}
		}
		updateBoardDisplay();
		launchConfetti();

		var nextBtn = document.getElementById('modal-next');
		var replayBtn = document.getElementById('modal-replay');
		var closeBtn = document.getElementById('modal-close');
		replayBtn.style.display = 'none';

		closeBtn.textContent = '🏠 Menu';
		closeBtn.onclick = function () {
			overlayEl.classList.remove('show');
			openMenu();
		};

		if (state.isDidactic) {
			modalEmoji.textContent = '🎓';
			modalTitle.textContent = 'Tavola Superata in Didattica!';
			modalScore.textContent = 'Ottimo lavoro! Hai risolto la tavola usando il ragionamento logico.';
			modalPosition.textContent = 'ℹ️ Modalità di apprendimento: nessun punteggio inviato.';
			nextBtn.textContent = '🔁 Esci al Menu';
			nextBtn.onclick = function () {
				overlayEl.classList.remove('show');
				openMenu();
			};
		} else if (state.mode === 'classic') {
			var preset = CLASSIC_PRESETS[state.classicDifficulty] || CLASSIC_PRESETS.easy;
			var par = preset.par || 120;
			var timeRatio = Math.max(0, 1 - Math.min(state.elapsed, par) / par);
			var speedBonus = Math.round(timeRatio * preset.maxBonus);
			var finalScore = preset.baseScore + speedBonus;
			var timeFormatted = formatTime(state.elapsed);

			modalEmoji.textContent = '🎉';
			modalTitle.textContent = 'Tavola ' + preset.label + ' Completata!';
			modalScore.textContent = '⏱️ Tempo: ' + timeFormatted + ' · ⭐ Punti: ' + finalScore.toLocaleString();
			modalPosition.textContent = 'Invio record in classifica...';
			submitFinalScore(1);

			nextBtn.textContent = '🔁 Gioca Ancora';
			nextBtn.onclick = function () {
				overlayEl.classList.remove('show');
				startClassic(state.classicDifficulty);
			};
		} else {
			// Scalata mode
			var levelNum = state.levelIndex + 1;
			var isLastLevel = state.levelIndex >= SCALATA_LEVELS.length - 1;
			var pctPerLevel = 100 / SCALATA_LEVELS.length;
			levelProgressEl.style.width = Math.min(100, levelNum * pctPerLevel) + '%';

			var lvlScore = Math.max(50, Math.floor((state.safeCells * 15 + Math.max(0, 180 - state.elapsed) * 12) * (1 + levelNum * 0.12)));
			totalScore += lvlScore;
			scoreTotalEl.textContent = totalScore;

			if (isLastLevel) {
				submitFinalScore(SCALATA_LEVELS.length);
				modalEmoji.textContent = '👑';
				modalTitle.textContent = 'Campione della Scalata!';
				modalScore.textContent = 'Tutti i 18 livelli completati! ⏱️ ' + formatTime(state.totalElapsed || state.elapsed) + ' · ⭐ Punti: ' + totalScore.toLocaleString();
				modalPosition.textContent = 'Invio record in classifica...';
				nextBtn.textContent = '🔁 Nuova Scalata';
				nextBtn.onclick = function () {
					overlayEl.classList.remove('show');
					startNewRun();
				};
			} else {
				submitFinalScore(levelNum);
				modalEmoji.textContent = '🏆';
				modalTitle.textContent = 'Livello ' + levelNum + ' Completato!';
				modalScore.textContent = 'Livello: +' + lvlScore.toLocaleString() + ' · Totale: ' + totalScore.toLocaleString();
				modalPosition.textContent = 'Invio record in classifica...';
				nextBtn.textContent = '▶ Prossimo Livello (Lv ' + (levelNum + 1) + ')';
				nextBtn.onclick = function () {
					overlayEl.classList.remove('show');
					startAtLevel(state.levelIndex + 1);
				};
			}
		}

		overlayEl.classList.add('show');
	}

	function showGameOver() {
		modalEmoji.textContent = '💥';
		modalTitle.textContent = 'BOOM!';
		modalPosition.textContent = '';

		// Freeze official competitive score at the exact point of explosion
		if (!state.isDidactic) {
			submitFinalScore(Math.min(state.levelIndex + 1, SCALATA_LEVELS.length));
		}

		var nextBtn = document.getElementById('modal-next');
		var replayBtn = document.getElementById('modal-replay');
		var closeBtn = document.getElementById('modal-close');

		if (state.mode === 'classic') {
			var preset = CLASSIC_PRESETS[state.classicDifficulty] || CLASSIC_PRESETS.easy;
			var pct = state.safeCells > 0 ? Math.round((state.revealed / state.safeCells) * 100) : 0;
			modalScore.textContent = 'Tavola ' + preset.label + ' · Caselle: ' + state.revealed + ' / ' + state.safeCells + ' (' + pct + '%)';
			modalPosition.textContent = '⏱️ Tempo: ' + formatTime(state.elapsed);
			nextBtn.textContent = '🔄 Riprova Partita';
			nextBtn.onclick = function () {
				overlayEl.classList.remove('show');
				startClassic(state.classicDifficulty);
			};
		} else {
			modalScore.textContent = 'Scalata interrotta al Livello ' + (state.levelIndex + 1) + ' / ' + SCALATA_LEVELS.length + ' · ⭐ Punti: ' + totalScore.toLocaleString();
			modalPosition.textContent = '⏱️ Tempo totale: ' + formatTime(state.totalElapsed || state.elapsed);
			nextBtn.textContent = '🔄 Nuova Scalata';
			nextBtn.onclick = function () {
				overlayEl.classList.remove('show');
				startNewRun();
			};
		}

		// Offer Educational Practice Mode Replay on any game over
		if (state.preExplosion) {
			replayBtn.style.display = 'inline-flex';
			replayBtn.innerHTML = '🎓 Rigioca in Didattica';
			replayBtn.title = 'Riavvolgi la tavola un momento prima dell\'errore per imparare la mossa giusta';
			replayBtn.onclick = function () {
				overlayEl.classList.remove('show');
				startDidacticReplay();
			};
		} else {
			replayBtn.style.display = 'none';
		}

		closeBtn.textContent = '🏠 Menu';
		closeBtn.onclick = function () {
			overlayEl.classList.remove('show');
			openMenu();
		};

		overlayEl.classList.add('show');
	}

	/* ============================================================
	   EDUCATIONAL TUTOR MODE
	   ============================================================ */
	function startDidacticReplay() {
		var dims = getGridDimensions();
		var saved = state.preExplosion;
		if (!saved) return;

		state.isDidactic = true;
		document.body.classList.add('didactic-mode');

		state.firstClick = false;
		state.gameOver = false;
		state.scoreSubmitted = true; // Block sending competitive scores
		state.started = true;
		state.isReplay = true;
		state.heatmapEnabled = false;
		if (btnDidacticHeatmap) btnDidacticHeatmap.classList.remove('active');
		setInputMode('dig');

		state.board = JSON.parse(saved.board);
		state.revealed = saved.revealed;
		state.flags = saved.flags;
		state.elapsed = saved.elapsed;
		state.safeCells = dims.rows * dims.cols - dims.mines;

		stopTimer();
		timerEl.textContent = state.elapsed;
		scoreTotalEl.textContent = '0 (Didattica)';

		renderBoard();
		mineCountEl.textContent = Math.max(0, dims.mines - state.flags);

		boardEl.classList.add('flipping');
		setTimeout(function () {
			boardEl.classList.remove('flipping');
		}, 240);

		if (splashEl.classList.contains('hidden')) {
			requestGameFullscreen();
		}
		setTimeout(function () { ViewportManager.fitToScreen(true); }, 60);

		// Trigger hint explanation immediately after rewind
		setTimeout(function () {
			showDidacticHint();
		}, 400);
	}

	function inspectCell(r, c) {
		if (typeof MinesweeperSolver === 'undefined') return;
		clearDidacticHighlights(state.heatmapEnabled);

		var dims = getGridDimensions();
		var info = MinesweeperSolver.explainCell(r, c, state.board, dims.rows, dims.cols);
		if (!info) return;

		// Highlight target cell in blue / focus border
		var targetEl = boardEl.querySelector('[data-r="' + r + '"][data-c="' + c + '"]');
		if (targetEl) targetEl.classList.add('cell-hint-inspect');

		// Highlight cause numbers if any
		if (info.causeCells && info.causeCells.length > 0) {
			info.causeCells.forEach(function (pos) {
				var el = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
				if (el) el.classList.add('cell-hint-cause');
			});
		}

		// Also highlight secondary targets if inspecting a satisfied number
		if (info.targetCells && info.targetCells.length > 0) {
			info.targetCells.forEach(function (pos) {
				var el = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
				if (el && !el.classList.contains('cell-hint-inspect')) {
					if (info.action === 'reveal') el.classList.add('cell-hint-safe');
					else if (info.action === 'flag') el.classList.add('cell-hint-mine');
					else if (info.action === 'guess') el.classList.add('cell-hint-guess');
				}
			});
		}

		didacticToastTitle.innerHTML = '🔍 ' + info.title;
		didacticToastText.textContent = info.explanation;
		didacticToast.classList.add('show');
		haptic(15);
	}

	function toggleDidacticHeatmap() {
		state.heatmapEnabled = !state.heatmapEnabled;
		if (btnDidacticHeatmap) {
			btnDidacticHeatmap.classList.toggle('active', state.heatmapEnabled);
		}
		if (state.heatmapEnabled) {
			applyHeatmapOverlay();
		} else {
			clearDidacticHighlights(false);
		}
		haptic(15);
	}

	function showDidacticHint() {
		if (typeof MinesweeperSolver === 'undefined') return;
		clearDidacticHighlights(state.heatmapEnabled);

		var dims = getGridDimensions();
		var hint = MinesweeperSolver.findHint(state.board, dims.rows, dims.cols);

		if (!hint || hint.type === 'empty') {
			didacticToastTitle.innerHTML = '💡 Consiglio Didattico';
			didacticToastText.textContent = 'Non ci sono numeri attivi vicini a caselle coperte. Prova a cliccare un\'altra casella non esplorata.';
			didacticToast.classList.add('show');
			return;
		}

		// Highlight cause numbers in gold
		if (hint.causeCells && hint.causeCells.length > 0) {
			hint.causeCells.forEach(function (pos) {
				var el = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
				if (el) el.classList.add('cell-hint-cause');
			});
		}

		// Highlight target cells in green (safe to dig), red (mine to flag), or indigo (probabilistic guess)
		if (hint.targetCells && hint.targetCells.length > 0) {
			hint.targetCells.forEach(function (pos) {
				var el = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
				if (el) {
					if (hint.action === 'reveal') {
						el.classList.add('cell-hint-safe');
					} else if (hint.action === 'flag') {
						el.classList.add('cell-hint-mine');
					} else if (hint.action === 'unflag') {
						el.classList.add('cell-hint-inspect');
					} else if (hint.action === 'guess') {
						el.classList.add('cell-hint-guess');
					} else {
						el.classList.add('cell-hint-safe');
					}
				}
			});
		}

		var icon = '🟢 Casella Sicura al 100%';
		if (hint.action === 'unflag') {
			icon = '❌ Rimuovi Bandiera Errata';
		} else if (hint.action === 'flag') {
			icon = '🚩 Mina Certa al 100%';
		} else if (hint.action === 'guess') {
			icon = hint.safeProb ? ('🎲 Scelta a Minor Rischio (' + hint.safeProb + '% sicura)') : '🎲 Scelta a Probabilità';
		}
		didacticToastTitle.innerHTML = '💡 ' + icon;
		didacticToastText.textContent = hint.explanation;
		didacticToast.classList.add('show');
	}

	if (btnDidacticHint) {
		btnDidacticHint.addEventListener('click', function () {
			AudioFX.initOnGesture();
			AudioFX.click();
			showDidacticHint();
		});
	}

	if (btnDidacticHeatmap) {
		btnDidacticHeatmap.addEventListener('click', function () {
			AudioFX.initOnGesture();
			AudioFX.click();
			toggleDidacticHeatmap();
		});
	}

	if (didacticToastClose) {
		didacticToastClose.addEventListener('click', function () {
			clearDidacticHighlights(state.heatmapEnabled);
		});
	}

	/* ============================================================
	   START FLOWS
	   ============================================================ */
	function startClassic(difficultyKey) {
		state.mode = 'classic';
		state.classicDifficulty = difficultyKey || 'easy';
		state.isDidactic = false;
		state.heatmapEnabled = false;
		if (btnDidacticHeatmap) btnDidacticHeatmap.classList.remove('active');
		setInputMode('dig');
		document.body.classList.remove('didactic-mode');
		clearDidacticHighlights();

		splashEl.classList.add('hidden');
		requestGameFullscreen();

		var preset = CLASSIC_PRESETS[state.classicDifficulty] || CLASSIC_PRESETS.easy;
		levelLabelEl.textContent = preset.label.toUpperCase();
		levelProgressEl.style.width = '100%';

		state.firstClick = true;
		state.gameOver = false;
		state.scoreSubmitted = false;
		state.started = true;
		state.revealed = 0;
		state.flags = 0;
		state.elapsed = 0;
		state.preExplosion = null;

		stopTimer();
		timerEl.textContent = '0';
		scoreTotalEl.textContent = '0';

		var dims = getGridDimensions();
		state.safeCells = dims.rows * dims.cols - dims.mines;
		initBoard(dims.rows, dims.cols);
		renderBoard();
	}

	function startNewRun() {
		state.mode = 'arcade';
		state.isDidactic = false;
		state.heatmapEnabled = false;
		if (btnDidacticHeatmap) btnDidacticHeatmap.classList.remove('active');
		setInputMode('dig');
		document.body.classList.remove('didactic-mode');
		clearDidacticHighlights();

		splashEl.classList.add('hidden');
		requestGameFullscreen();

		totalScore = 0;
		state.totalElapsed = 0;
		scoreTotalEl.textContent = '0';
		startAtLevel(0);
	}

	function startAtLevel(index) {
		state.levelIndex = Math.max(0, Math.min(index, SCALATA_LEVELS.length - 1));
		state.isDidactic = false;
		state.heatmapEnabled = false;
		if (btnDidacticHeatmap) btnDidacticHeatmap.classList.remove('active');
		setInputMode('dig');
		document.body.classList.remove('didactic-mode');
		clearDidacticHighlights();

		var levelNum = state.levelIndex + 1;
		levelLabelEl.textContent = 'LVL ' + levelNum;

		var pct = (levelNum / SCALATA_LEVELS.length) * 100;
		levelProgressEl.style.width = pct + '%';

		state.firstClick = true;
		state.gameOver = false;
		state.scoreSubmitted = false;
		state.started = true;
		state.revealed = 0;
		state.flags = 0;
		state.elapsed = 0;
		state.preExplosion = null;

		stopTimer();
		timerEl.textContent = '0';

		var dims = getGridDimensions();
		state.safeCells = dims.rows * dims.cols - dims.mines;
		initBoard(dims.rows, dims.cols);
		renderBoard();
	}

	function openMenu() {
		stopTimer();
		state.gameOver = true;
		state.isDidactic = false;
		state.heatmapEnabled = false;
		if (btnDidacticHeatmap) btnDidacticHeatmap.classList.remove('active');
		setInputMode('dig');
		document.body.classList.remove('didactic-mode');
		clearDidacticHighlights();
		overlayEl.classList.remove('show');
		splashEl.classList.remove('hidden');
	}

	/* ============================================================
	   CONTROLS & LISTENERS
	   ============================================================ */
	function setInputMode(mode) {
		state.inputMode = mode;
		if (btnModeDig) btnModeDig.classList.remove('active');
		if (btnModeFlag) btnModeFlag.classList.remove('active');
		if (btnModeInspect) btnModeInspect.classList.remove('active');

		if (mode === 'flag') {
			if (btnModeFlag) btnModeFlag.classList.add('active');
		} else if (mode === 'inspect') {
			if (btnModeInspect) btnModeInspect.classList.add('active');
		} else {
			if (btnModeDig) btnModeDig.classList.add('active');
		}
		haptic(15);
	}

	btnModeDig.addEventListener('click', function () { setInputMode('dig'); });
	btnModeFlag.addEventListener('click', function () { setInputMode('flag'); });
	if (btnModeInspect) {
		btnModeInspect.addEventListener('click', function () { setInputMode('inspect'); });
	}

	document.getElementById('modal-close').addEventListener('click', function () {
		overlayEl.classList.remove('show');
	});

	soundToggle.addEventListener('click', function () {
		var newState = !AudioFX.isEnabled();
		AudioFX.setEnabled(newState);
		this.textContent = newState ? '🔊' : '🔇';
		if (newState) {
			AudioFX.initOnGesture();
			AudioFX.click();
		}
	});

	if (btnZoomFit) btnZoomFit.addEventListener('click', function () { ViewportManager.fitToScreen(true); });
	if (btnZoomIn) btnZoomIn.addEventListener('click', function () { ViewportManager.zoomStep(1); });
	if (btnZoomOut) btnZoomOut.addEventListener('click', function () { ViewportManager.zoomStep(-1); });
	if (btnMenu) btnMenu.addEventListener('click', openMenu);

	// Splash mode switcher tabs (Scalata vs Partita Rapida)
	var tabBtnScalata = document.getElementById('tab-btn-scalata');
	var tabBtnClassic = document.getElementById('tab-btn-classic');
	var panelScalata = document.getElementById('panel-scalata');
	var panelClassic = document.getElementById('panel-classic');

	function switchSplashMode(mode) {
		AudioFX.initOnGesture();
		AudioFX.click();
		if (mode === 'classic') {
			tabBtnClassic.classList.add('active');
			tabBtnClassic.setAttribute('aria-selected', 'true');
			tabBtnScalata.classList.remove('active');
			tabBtnScalata.setAttribute('aria-selected', 'false');
			panelClassic.classList.add('active');
			panelScalata.classList.remove('active');
		} else {
			tabBtnScalata.classList.add('active');
			tabBtnScalata.setAttribute('aria-selected', 'true');
			tabBtnClassic.classList.remove('active');
			tabBtnClassic.setAttribute('aria-selected', 'false');
			panelScalata.classList.add('active');
			panelClassic.classList.remove('active');
		}
	}

	if (tabBtnScalata && tabBtnClassic) {
		tabBtnScalata.addEventListener('click', function () { switchSplashMode('scalata'); });
		tabBtnClassic.addEventListener('click', function () { switchSplashMode('classic'); });
	}

	var presetBtns = document.querySelectorAll('.btn-preset');
	presetBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			var presetKey = this.dataset.preset;
			AudioFX.initOnGesture();
			AudioFX.click();
			startClassic(presetKey);
		});
	});

	if (splashScalataBtn) {
		splashScalataBtn.addEventListener('click', function () {
			AudioFX.initOnGesture();
			AudioFX.click();
			startNewRun();
		});
	}

	document.addEventListener('keydown', function (e) {
		if (e.key === 'm' || e.key === 'M') soundToggle.click();
		if (e.key === 'f' || e.key === 'F') setInputMode(state.inputMode === 'dig' ? 'flag' : 'dig');
		if (state.isDidactic && (e.key === 'i' || e.key === 'I')) {
			setInputMode(state.inputMode === 'inspect' ? 'dig' : 'inspect');
		}
		if (e.key === '+' || e.key === '=') ViewportManager.zoomStep(1);
		if (e.key === '-' || e.key === '_') ViewportManager.zoomStep(-1);
		if (e.key === '0') ViewportManager.fitToScreen(true);
		if (e.key === 'Escape') {
			if (!splashEl.classList.contains('hidden')) {
				exitGameFullscreen();
			} else {
				openMenu();
			}
		}
	});

	/* ============================================================
	   FULLSCREEN & RESIZE
	   ============================================================ */
	function requestGameFullscreen() {
		var inIframe = window.parent !== window;
		if (inIframe) {
			window.parent.postMessage({ type: 'pointnet-games:fullscreen-request' }, window.location.origin);
		} else {
			if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
				document.documentElement.requestFullscreen().catch(function () {});
			}
			document.body.classList.add('pointnet-games-fs');
			fsCloseBtn.style.display = 'flex';
		}
	}

	function exitGameFullscreen() {
		var inIframe = window.parent !== window;
		if (inIframe) {
			window.parent.postMessage({ type: 'pointnet-games:fullscreen-exit' }, window.location.origin);
		} else {
			if (document.fullscreenElement && document.exitFullscreen) {
				document.exitFullscreen().catch(function () {});
			}
			document.body.classList.remove('pointnet-games-fs');
			fsCloseBtn.style.display = 'none';
		}
	}

	fsCloseBtn.addEventListener('click', exitGameFullscreen);

	var resizeTimer = null;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			if (!splashEl.classList.contains('hidden')) return;
			ViewportManager.fitToScreen(false);
		}, 100);
	});

	if (window.matchMedia) {
		var mql = window.matchMedia('(orientation: landscape)');
		var handleOrientation = function () {
			if (!splashEl.classList.contains('hidden')) return;
			var dims = getGridDimensions();
			initBoard(dims.rows, dims.cols);
			renderBoard();
			setTimeout(function () {
				ViewportManager.fitToScreen(true);
			}, 100);
		};
		if (mql.addEventListener) {
			mql.addEventListener('change', handleOrientation);
		} else if (mql.addListener) {
			mql.addListener(handleOrientation);
		}
	}

	/* ============================================================
	   POINTNET GAMES API & POSTMESSAGE BRIDGE
	   ============================================================ */
	function submitFinalScore(levelReached) {
		if (typeof window.pointnetGamesAPI === 'undefined' || state.scoreSubmitted || state.isDidactic) return;
		state.scoreSubmitted = true;

		var scoreToSend = 0;
		var meta = {};

		if (state.mode === 'classic') {
			var preset = CLASSIC_PRESETS[state.classicDifficulty] || CLASSIC_PRESETS.easy;
			var isWin = state.revealed >= state.safeCells;
			var timeFormatted = formatTime(state.elapsed);

			if (isWin) {
				var par = preset.par || 120;
				var timeRatio = Math.max(0, 1 - Math.min(state.elapsed, par) / par);
				var speedBonus = Math.round(timeRatio * preset.maxBonus);
				scoreToSend = preset.baseScore + speedBonus;
			} else {
				scoreToSend = Math.max(10, state.revealed * 50);
			}

			meta = {
				difficulty: state.classicDifficulty,
				tempo: timeFormatted,
				esito: isWin ? 'Vittoria 🏆' : 'Esploso 💥'
			};
		} else {
			scoreToSend = totalScore;
			meta = {
				difficulty: 'arcade',
				livello: levelReached + ' / ' + SCALATA_LEVELS.length,
				tempo: formatTime(state.totalElapsed || state.elapsed)
			};
		}

		window.pointnetGamesAPI.submitScore(scoreToSend, meta, function (result) {
			if (!result || !result.success) return;
			var posText = result.position ? '#' + result.position : '';
			if (result.personal_best) {
				modalPosition.innerHTML = '🌟 <b>Nuovo Record Personale!</b> ' + (posText ? 'Posizione in classifica: ' + posText : '');
			} else if (posText) {
				modalPosition.textContent = 'Posizione in classifica: ' + posText;
			}
		}).catch(function () {});
	}

	function updateSplashPlayerStatus() {
		if (!splashPlayerStatus) return;
		var loggedIn = false;
		var nick = '';
		var loginUrl = '/wp-login.php';

		if (typeof window.pointnetGamesAPI !== 'undefined' && typeof window.pointnetGamesAPI.isUserLoggedIn === 'function') {
			loggedIn = window.pointnetGamesAPI.isUserLoggedIn();
			nick = window.pointnetGamesAPI.getNickname();
		} else if (window.__wpGamesState) {
			loggedIn = !!window.__wpGamesState.loggedIn;
			nick = window.__wpGamesState.nickname || '';
			if (window.__wpGamesState.loginUrl) loginUrl = window.__wpGamesState.loginUrl;
		}

		if (loggedIn) {
			splashPlayerStatus.innerHTML = '👤 Connesso: <b style="color:#38bdf8;">' + (nick || 'Giocatore') + '</b>';
		} else {
			splashPlayerStatus.innerHTML = '🔒 <a href="' + loginUrl + '" target="_top" style="color:#38bdf8;text-decoration:underline;">Accedi o registrati</a> per salvare il record';
		}
	}

	function initWPGamesBridge() {
		var params = new URLSearchParams(window.location.search);
		var gameId = params.get('pointnet_game_id');

		if (gameId) {
			if (typeof window.pointnetGamesAPI !== 'undefined') {
				if (typeof window.pointnetGamesAPI._setGameId === 'function') {
					window.pointnetGamesAPI._setGameId(parseInt(gameId, 10) || 0);
				}
			} else {
				window.parent.postMessage({ type: 'pointnet-games:init' }, window.location.origin);
			}
		}

		window.addEventListener('message', function (event) {
			if (event.origin !== window.location.origin || event.source !== window.parent) return;
			var msg = event.data;
			if (!msg || typeof msg !== 'object' || !msg.type) return;

			if (msg.type === 'pointnet-games:init-confirm') {
				window.__wpGamesState = window.__wpGamesState || {};
				window.__wpGamesState.gameId = msg.data.gameId;
				window.__wpGamesState.nickname = msg.data.nickname;
				window.__wpGamesState.loggedIn = msg.data.loggedIn;
				if (msg.data.loginUrl) window.__wpGamesState.loginUrl = msg.data.loginUrl;
				updateSplashPlayerStatus();
			}
			if (msg.type === 'pointnet-games:start') {
				AudioFX.initOnGesture();
				startNewRun();
			}
		});

		updateSplashPlayerStatus();
	}

	function wirePostMessageAPI() {
		if (typeof window.pointnetGamesAPI !== 'undefined') return;

		window.pointnetGamesAPI = {
			_currentGameId: parseInt(new URLSearchParams(window.location.search).get('pointnet_game_id'), 10) || 0,
			_setGameId: function (id) { this._currentGameId = parseInt(id, 10) || 0; },
			submitScore: function (score, meta, callback) {
				return new Promise(function (resolve, reject) {
					window.parent.postMessage({
						type: 'pointnet-games:submit-score',
						data: { score: score, meta: meta }
					}, window.location.origin);

					var responseHandler = function (event) {
						if (event.origin !== window.location.origin || event.source !== window.parent) return;
						var msg = event.data;
						if (msg && msg.type === 'pointnet-games:score-submitted') {
							window.removeEventListener('message', responseHandler);
							resolve(msg.data);
							if (typeof callback === 'function') callback(msg.data);
						}
						if (msg && msg.type === 'pointnet-games:score-error') {
							window.removeEventListener('message', responseHandler);
							reject(new Error((msg.data && msg.data.message) || 'Score submission failed'));
						}
					};
					window.addEventListener('message', responseHandler);
				});
			},
			getLeaderboard: function (limit, callback, difficulty) {
				return new Promise(function (resolve) {
					window.parent.postMessage({
						type: 'pointnet-games:get-leaderboard',
						data: { limit: limit || 10, difficulty: difficulty || '' }
					}, window.location.origin);

					var responseHandler = function (event) {
						if (event.origin !== window.location.origin || event.source !== window.parent) return;
						var msg = event.data;
						if (msg && msg.type === 'pointnet-games:leaderboard') {
							window.removeEventListener('message', responseHandler);
							resolve(msg.data);
							if (typeof callback === 'function') callback(msg.data);
						}
					};
					window.addEventListener('message', responseHandler);
				});
			},
			getNickname: function () { return window.__wpGamesState ? window.__wpGamesState.nickname || '' : ''; },
			isUserLoggedIn: function () { return !!(window.__wpGamesState && window.__wpGamesState.loggedIn); },
			requestFullscreen: requestGameFullscreen,
			exitFullscreen: exitGameFullscreen
		};
	}

	/* ============================================================
	   BOOTSTRAP
	   ============================================================ */
	if (window.I18n && typeof window.I18n.init === 'function') {
		window.I18n.init();
		window.I18n.onLanguageChange(function () {
			updateHUD();
			if (state.didacticActive) {
				if (state.heatmapEnabled) applyHeatmapOverlay();
			}
		});
	}
	initWPGamesBridge();
	wirePostMessageAPI();
	ViewportManager.init(boardViewportEl, boardLayerEl, boardEl);
	var initialDims = getGridDimensions();
	state.safeCells = initialDims.rows * initialDims.cols - initialDims.mines;
	initBoard(initialDims.rows, initialDims.cols);
	renderBoard();
})();
