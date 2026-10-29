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
		heatmapEnabled: false,
		patternsActive: false, // Tactical pattern visualizer mode
		activePatterns: [],    // Currently highlighted pattern list
		focusedPattern: null,  // Currently zoomed/focused single pattern
		history: [],       // Snapshots for Undo in didactic mode
		future: []         // Snapshots for Redo in didactic mode
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
	var btnDidacticUndo = document.getElementById('btn-didactic-undo');
	var btnDidacticRedo = document.getElementById('btn-didactic-redo');
	var btnDidacticPatterns = document.getElementById('btn-didactic-patterns');
	var btnDidacticHeatmap = document.getElementById('btn-didactic-heatmap');
	var btnDidacticHint = document.getElementById('btn-didactic-hint');
	var didacticToast = document.getElementById('didactic-toast');
	var didacticToastHandle = document.getElementById('didactic-toast-handle');
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
	function dismissPatternFocus() {
		state.focusedPattern = null;
		if (boardEl) boardEl.classList.remove('pattern-focus-active');
		var oldFocused = boardEl.querySelectorAll('.cell-pattern-focus');
		oldFocused.forEach(function (el) { el.classList.remove('cell-pattern-focus'); });

		// Ripristina il toast panoramico con il riassunto di tutti i pattern trovati
		if (state.patternsActive && state.activePatterns && state.activePatterns.length > 0) {
			var uniqueNames = [];
			state.activePatterns.forEach(function (p) {
				if (p.patternName && uniqueNames.indexOf(p.patternName) === -1) {
					uniqueNames.push(p.patternName);
				}
			});
			var namesListStr = uniqueNames.join(', ');
			var countMsg = state.activePatterns.length === 1 ?
				(window.I18n ? window.I18n.t('didactic.patterns_found_single') : 'Trovato 1 pattern tattico!') :
				(window.I18n ? window.I18n.t('didactic.patterns_found', { count: state.activePatterns.length }) : ('Trovati ' + state.activePatterns.length + ' pattern tattici!'));

			didacticToastTitle.innerHTML = '🧩 ' + (window.I18n ? window.I18n.t('didactic.patterns') : 'Pattern');
			didacticToastText.textContent = countMsg + (namesListStr ? ' (' + namesListStr + '). Tocca le caselle viola per i dettagli.' : '');
			didacticToast.classList.add('show');
		} else {
			if (didacticToast) didacticToast.classList.remove('show');
		}
	}

	function clearDidacticHighlights(keepHeatmap, keepPatterns) {
		var classesToRemove = ['cell-hint-inspect', 'cell-hint-cause', 'cell-pattern-focus'];
		state.focusedPattern = null;
		if (!keepHeatmap) {
			classesToRemove.push('cell-hint-safe', 'cell-hint-mine', 'cell-hint-guess');
		}
		if (!keepPatterns) {
			classesToRemove.push('cell-pattern-clue', 'cell-pattern-safe', 'cell-pattern-mine');
			state.patternsActive = false;
			state.activePatterns = [];
			if (btnDidacticPatterns) btnDidacticPatterns.classList.remove('active');
		}

		if (boardEl) boardEl.classList.remove('pattern-focus-active');

		var selector = '.' + classesToRemove.join(', .');
		var highlighted = boardEl.querySelectorAll(selector);
		highlighted.forEach(function (el) {
			classesToRemove.forEach(function (cls) {
				el.classList.remove(cls);
			});
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

				// Touch Handling (Tactile Quick Long-Press ~230ms & Double Tap Support)
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
						haptic(22);
					}, 230);
				}, { passive: true });

				cellEl.addEventListener('touchend', function () {
					clearTimeout(this._longPressTimer);
					if (this._longPressFired) {
						this._preventClickUntil = Date.now() + 300;
					}
				});

				cellEl.addEventListener('touchmove', function () {
					clearTimeout(this._longPressTimer);
					this._longPressFired = false;
				}, { passive: true });

				cellEl.addEventListener('contextmenu', function (e) {
					e.preventDefault();
					var el = this;
					if (el._longPressFired || (el._lastLongPressTime && Date.now() - el._lastLongPressTime < 350)) {
						return;
					}
					var r = parseInt(el.dataset.r, 10);
					var c = parseInt(el.dataset.c, 10);
					var cell = state.board[r] && state.board[r][c];
					if (!cell) return;

					// Se la casella è già scoperta con un numero, il tasto destro esegue il chord
					if (cell.revealed) {
						handleChord(r, c);
						return;
					}

					// Se siamo in modalità Academy:
					if (state.mode === 'academy') {
						handleAcademyAction(state.inputMode === 'flag' ? 'reveal' : 'flag', r, c);
						return;
					}

					// Azione inversa rispetto alla modalità selezionata (o click secondario)
					if (state.inputMode === 'flag') {
						// Se lo strumento attivo è BANDIERINA, il tasto destro SCAVA
						if (cell.flagged) {
							handleFlag(r, c); // rimuove prima la bandiera se presente
						} else {
							handleReveal(r, c);
						}
					} else {
						// Se lo strumento attivo è SCAVA (o inspect), il tasto destro mette/toglie BANDIERINA
						handleFlag(r, c);
					}
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

					// Se siamo in modalità Scuola di Logica (Academy)
					if (state.mode === 'academy') {
						if (cell.revealed) {
							handleAcademyAction('chord', r, c);
						} else {
							handleAcademyAction(state.inputMode === 'flag' ? 'flag' : 'reveal', r, c);
						}
						return;
					}

					// If in Didactic Mode and Inspect button is active, explain any clicked cell!
					if (state.isDidactic && state.inputMode === 'inspect') {
						inspectCell(r, c);
						return;
					}

					// Modalità Didattica - Gestione click su Pattern e click fuori dal Pattern:
					if (state.isDidactic && state.patternsActive) {
						var matchedPattern = state.activePatterns && state.activePatterns.find(function (p) {
							var inCause = p.causeCells && p.causeCells.some(function (pos) { return pos.r === r && pos.c === c; });
							var inTarget = p.targetCells && p.targetCells.some(function (pos) { return pos.r === r && pos.c === c; });
							return inCause || inTarget;
						});

						if (matchedPattern) {
							// Se questo specifico pattern era già ingrandito/a fuoco (con spiegazione aperta) e l'utente ci riclicca sopra:
							// si torna alla visualizzazione generale dei pattern tattici!
							if (state.focusedPattern === matchedPattern) {
								dismissPatternFocus();
								return;
							}
							// Altrimenti si mette a fuoco questo pattern
							showPatternDetail(matchedPattern);
							return;
						} else {
							// Se si clicca FUORI da qualsiasi pattern (o casella non coinvolta), si disattivano tutti i pattern
							// tornando alla visualizzazione normale della tavola!
							clearDidacticHighlights(state.heatmapEnabled, false);
						}
					}

					clearDidacticHighlights(state.heatmapEnabled);

					// When clicking an already revealed cell (with a number), perform chording (dig remaining safe cells)!
					if (cell.revealed) {
						handleChord(r, c);
						return;
					}

					// If cell is already flagged, any tap on it removes the flag safely!
					if (cell.flagged) {
						handleFlag(r, c);
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
				recordDidacticStep();

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
		recordDidacticStep();

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
		recordDidacticStep();
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

		closeBtn.textContent = window.I18n ? window.I18n.t('game.return_to_menu') : '🏠 Menu';
		closeBtn.onclick = function () {
			overlayEl.classList.remove('show');
			openMenu();
		};

		if (state.isDidactic) {
			modalEmoji.textContent = '🎓';
			modalTitle.textContent = window.I18n ? window.I18n.t('game.board_cleared_didactic_title') : 'Tavola Superata in Didattica!';
			modalScore.textContent = window.I18n ? window.I18n.t('game.board_cleared_didactic_desc') : 'Ottimo lavoro! Hai risolto la tavola usando il ragionamento logico.';
			modalPosition.textContent = window.I18n ? window.I18n.t('game.didactic_no_score_notice') : 'ℹ️ Modalità di apprendimento: nessun punteggio inviato.';
			nextBtn.textContent = window.I18n ? window.I18n.t('game.replay_board') : '🔁 Rigioca Tavola';
			nextBtn.onclick = function () {
				overlayEl.classList.remove('show');
				startDidacticReplay();
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

		// Initialize undo history with the rewind state
		state.history = [JSON.stringify({
			board: state.board,
			revealed: state.revealed,
			flags: state.flags,
			elapsed: state.elapsed
		})];
		state.future = [];
		updateUndoRedoButtons();

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

	function updateUndoRedoButtons() {
		if (btnDidacticUndo) {
			btnDidacticUndo.disabled = !(state.isDidactic && state.history && state.history.length > 1);
		}
		if (btnDidacticRedo) {
			btnDidacticRedo.disabled = !(state.isDidactic && state.future && state.future.length > 0);
		}
	}

	function recordDidacticStep() {
		if (!state.isDidactic) return;
		var snapshot = JSON.stringify({
			board: state.board,
			revealed: state.revealed,
			flags: state.flags,
			elapsed: state.elapsed
		});
		state.history.push(snapshot);
		state.future = []; // Clear redo chain on new move
		updateUndoRedoButtons();
	}

	function didacticUndo() {
		if (!state.isDidactic || !state.history || state.history.length <= 1) return;
		var current = state.history.pop();
		state.future.push(current);

		var previousStr = state.history[state.history.length - 1];
		var previous = JSON.parse(previousStr);
		applyDidacticSnapshot(previous);
		updateUndoRedoButtons();
		AudioFX.unflag();
		haptic(15);
	}

	function didacticRedo() {
		if (!state.isDidactic || !state.future || state.future.length === 0) return;
		var nextStr = state.future.pop();
		state.history.push(nextStr);

		var nextState = JSON.parse(nextStr);
		applyDidacticSnapshot(nextState);
		updateUndoRedoButtons();
		AudioFX.click();
		haptic(15);
	}

	function applyDidacticSnapshot(snap) {
		var dims = getGridDimensions();
		state.board = snap.board;
		state.revealed = snap.revealed;
		state.flags = snap.flags;
		state.elapsed = snap.elapsed;
		state.gameOver = false;

		renderBoard();
		mineCountEl.textContent = Math.max(0, dims.mines - state.flags);
		timerEl.textContent = state.elapsed;

		clearDidacticHighlights(state.heatmapEnabled);
		if (state.heatmapEnabled) {
			applyHeatmapOverlay();
		}
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

	if (btnDidacticUndo) {
		btnDidacticUndo.addEventListener('click', function () {
			AudioFX.initOnGesture();
			didacticUndo();
		});
	}

	if (btnDidacticRedo) {
		btnDidacticRedo.addEventListener('click', function () {
			AudioFX.initOnGesture();
			didacticRedo();
		});
	}

	if (btnDidacticHeatmap) {
		btnDidacticHeatmap.addEventListener('click', function () {
			AudioFX.initOnGesture();
			AudioFX.click();
			toggleDidacticHeatmap();
		});
	}

	function showPatternDetail(pattern) {
		if (!pattern) return;
		state.focusedPattern = pattern;

		// Clear previous individual pattern focus
		var oldFocused = boardEl.querySelectorAll('.cell-pattern-focus');
		oldFocused.forEach(function (el) { el.classList.remove('cell-pattern-focus'); });

		// Activate spotlight on board (dims other cells)
		boardEl.classList.add('pattern-focus-active');

		// Highlight this specific pattern's cause cells and target cells
		var patternCells = (pattern.causeCells || []).concat(pattern.targetCells || []);
		patternCells.forEach(function (pos) {
			var el = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
			if (el) {
				el.classList.add('cell-pattern-focus');
			}
		});

		var badge = pattern.action === 'flag' ? '🚩 Mina' : '🟢 Libera';
		didacticToastTitle.innerHTML = '🧩 ' + pattern.patternName + ' <span style="font-size:0.75rem; font-weight:700; opacity:0.85; margin-left:6px;">(' + badge + ')</span>';
		didacticToastText.textContent = pattern.explanation;
		didacticToast.classList.add('show');
		haptic(18);
	}

	function toggleDidacticPatterns() {
		if (!state.isDidactic || typeof MinesweeperSolver === 'undefined') return;

		if (state.patternsActive) {
			clearDidacticHighlights(state.heatmapEnabled, false);
			return;
		}

		clearDidacticHighlights(state.heatmapEnabled, false);

		var dims = getGridDimensions();
		var patterns = MinesweeperSolver.findAllTacticalPatterns(state.board, dims.rows, dims.cols);

		if (!patterns || patterns.length === 0) {
			didacticToastTitle.innerHTML = '🧩 ' + (window.I18n ? window.I18n.t('didactic.patterns') : 'Pattern');
			didacticToastText.textContent = window.I18n ? window.I18n.t('didactic.no_patterns_found') : 'Nessun pattern tattico standard trovato al momento.';
			didacticToast.classList.add('show');
			return;
		}

		state.patternsActive = true;
		state.activePatterns = patterns;
		if (btnDidacticPatterns) btnDidacticPatterns.classList.add('active');

		patterns.forEach(function (p) {
			p.causeCells.forEach(function (pos) {
				var el = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
				if (el) el.classList.add('cell-pattern-clue');
			});

			p.targetCells.forEach(function (pos) {
				var el = boardEl.querySelector('[data-r="' + pos.r + '"][data-c="' + pos.c + '"]');
				if (el) {
					if (p.action === 'flag') {
						el.classList.add('cell-pattern-mine');
					} else {
						el.classList.add('cell-pattern-safe');
					}
				}
			});
		});

		// Collect unique pattern names
		var uniqueNames = [];
		patterns.forEach(function (p) {
			if (p.patternName && uniqueNames.indexOf(p.patternName) === -1) {
				uniqueNames.push(p.patternName);
			}
		});

		var namesListStr = uniqueNames.join(', ');
		var countMsg = patterns.length === 1 ?
			(window.I18n ? window.I18n.t('didactic.patterns_found_single') : 'Trovato 1 pattern tattico!') :
			(window.I18n ? window.I18n.t('didactic.patterns_found', { count: patterns.length }) : ('Trovati ' + patterns.length + ' pattern tattici!'));

		didacticToastTitle.innerHTML = '🧩 ' + (window.I18n ? window.I18n.t('didactic.patterns') : 'Pattern');
		didacticToastText.textContent = countMsg + (namesListStr ? ' (' + namesListStr + '). Tocca le caselle viola per i dettagli.' : '');
		didacticToast.classList.add('show');
		haptic(20);
	}

	if (btnDidacticPatterns) {
		btnDidacticPatterns.addEventListener('click', function () {
			AudioFX.initOnGesture();
			AudioFX.click();
			toggleDidacticPatterns();
		});
	}

	if (didacticToastClose) {
		didacticToastClose.addEventListener('click', function () {
			if (state.focusedPattern) {
				dismissPatternFocus();
			} else {
				clearDidacticHighlights(state.heatmapEnabled, state.patternsActive);
			}
		});
	}

	/* ============================================================
	   DRAGGABLE DIDACTIC TOAST (Touch & Mouse Drag-and-Drop)
	   ============================================================ */
	(function initDraggableDidacticToast() {
		if (!didacticToast) return;

		var isDragging = false;
		var dragStartX = 0;
		var dragStartY = 0;
		var initialLeft = 0;
		var initialTop = 0;

		function startDrag(clientX, clientY) {
			isDragging = true;
			didacticToast.classList.add('is-dragged');

			var rect = didacticToast.getBoundingClientRect();
			dragStartX = clientX;
			dragStartY = clientY;
			initialLeft = rect.left;
			initialTop = rect.top;

			// Switch styling to absolute viewport coords while keeping size
			didacticToast.style.left = initialLeft + 'px';
			didacticToast.style.top = initialTop + 'px';
			didacticToast.style.bottom = 'auto';
			didacticToast.style.right = 'auto';
			didacticToast.style.transform = 'none';
		}

		function moveDrag(clientX, clientY) {
			if (!isDragging) return;
			var dx = clientX - dragStartX;
			var dy = clientY - dragStartY;

			var newLeft = initialLeft + dx;
			var newTop = initialTop + dy;

			// Clamp inside viewport
			var toastW = didacticToast.offsetWidth;
			var toastH = didacticToast.offsetHeight;
			var maxLeft = Math.max(10, window.innerWidth - toastW - 10);
			var maxTop = Math.max(10, window.innerHeight - toastH - 10);

			newLeft = Math.min(Math.max(10, newLeft), maxLeft);
			newTop = Math.min(Math.max(10, newTop), maxTop);

			didacticToast.style.left = newLeft + 'px';
			didacticToast.style.top = newTop + 'px';
		}

		function endDrag() {
			if (!isDragging) return;
			isDragging = false;
			didacticToast.classList.remove('is-dragged');
		}

		// Touch events: tutto il popup è trascinabile tranne il bottone di chiusura
		didacticToast.addEventListener('touchstart', function (e) {
			if (e.target.closest('#didactic-toast-close')) return;
			if (e.touches && e.touches.length === 1) {
				startDrag(e.touches[0].clientX, e.touches[0].clientY);
			}
		}, { passive: true });

		window.addEventListener('touchmove', function (e) {
			if (!isDragging) return;
			if (e.touches && e.touches.length > 0) {
				moveDrag(e.touches[0].clientX, e.touches[0].clientY);
			}
		}, { passive: true });

		window.addEventListener('touchend', endDrag, { passive: true });
		window.addEventListener('touchcancel', endDrag, { passive: true });

		// Mouse events: tutto il popup è trascinabile con il click sinistro
		didacticToast.addEventListener('mousedown', function (e) {
			if (e.target.closest('#didactic-toast-close')) return;
			if (e.button === 0) {
				startDrag(e.clientX, e.clientY);
				e.preventDefault();
			}
		});

		window.addEventListener('mousemove', function (e) {
			if (!isDragging) return;
			moveDrag(e.clientX, e.clientY);
		});

		window.addEventListener('mouseup', endDrag);
	})();

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
		state.history = [];
		state.future = [];
		updateUndoRedoButtons();

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
		state.history = [];
		state.future = [];
		updateUndoRedoButtons();

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
			document.body.classList.add('mode-flag-active');
		} else if (mode === 'inspect') {
			if (btnModeInspect) btnModeInspect.classList.add('active');
			document.body.classList.remove('mode-flag-active');
		} else {
			if (btnModeDig) btnModeDig.classList.add('active');
			document.body.classList.remove('mode-flag-active');
		}
		haptic(15);
	}

	function toggleInputMode() {
		if (state.inputMode === 'flag') {
			setInputMode('dig');
		} else {
			setInputMode('flag');
		}
	}

	btnModeDig.addEventListener('click', function () {
		if (state.inputMode === 'dig') {
			setInputMode('flag');
		} else {
			setInputMode('dig');
		}
	});

	btnModeFlag.addEventListener('click', function () {
		if (state.inputMode === 'flag') {
			setInputMode('dig');
		} else {
			setInputMode('flag');
		}
	});

	if (btnModeInspect) {
		btnModeInspect.addEventListener('click', function () { setInputMode('inspect'); });
	}

	// Prevent browser native double-tap zoom & handle desktop mouse double-click to toggle mode (Dig <-> Flag)
	function handleMouseDoubleToggle(target) {
		if (target.closest('button') && !target.closest('.cell')) return;
		var targetCell = target.closest('.cell');
		if (targetCell && !targetCell.classList.contains('revealed')) {
			return;
		}
		if (target.closest('#board-arena') || target.closest('#board')) {
			toggleInputMode();
		}
	}

	// 1) Doppio click Tasto Sinistro
	document.addEventListener('dblclick', function (e) {
		e.preventDefault();
		if (e.button === 0) {
			handleMouseDoubleToggle(e.target);
		}
	}, { passive: false });

	// 2) Doppio click Tasto Destro (Right-click double click)
	var lastRightClickTime = 0;
	var lastRightClickX = 0;
	var lastRightClickY = 0;

	window.addEventListener('mousedown', function (e) {
		if (e.button !== 2) return; // solo tasto destro
		var now = Date.now();
		var dist = Math.hypot(e.clientX - lastRightClickX, e.clientY - lastRightClickY);

		if (lastRightClickTime && (now - lastRightClickTime < 380) && dist < 35) {
			handleMouseDoubleToggle(e.target);
			lastRightClickTime = 0;
		} else {
			lastRightClickTime = now;
			lastRightClickX = e.clientX;
			lastRightClickY = e.clientY;
		}
	});

	// Quick Mode Toggle Shortcut 1: Two-Finger Tap anywhere on the board toggles between Dig and Flag!
	var twoFingerTouchStart = 0;
	boardArenaEl.addEventListener('touchstart', function (e) {
		if (e.touches && e.touches.length === 2) {
			twoFingerTouchStart = Date.now();
		} else {
			twoFingerTouchStart = 0;
		}
	}, { passive: true });

	boardArenaEl.addEventListener('touchend', function (e) {
		if (twoFingerTouchStart && (Date.now() - twoFingerTouchStart < 350) && (!e.touches || e.touches.length === 0)) {
			toggleInputMode();
			twoFingerTouchStart = 0;
		}
	}, { passive: true });

	// Quick Mode Toggle Shortcut 2: Rapid Double-Tap anywhere on the board arena or revealed areas!
	var lastTapTime = 0;
	var lastTapX = 0;
	var lastTapY = 0;

	boardArenaEl.addEventListener('touchend', function (e) {
		if (e.touches && e.touches.length > 0) return;
		var touch = e.changedTouches && e.changedTouches[0];
		if (!touch) return;

		var target = e.target;
		// Non attivare il toggle se il doppio tap avviene su una casella coperta (dove vogliamo consentire scavi rapidi)
		var cell = target && target.closest ? target.closest('.cell') : null;
		if (cell && !cell.classList.contains('revealed')) {
			return;
		}

		var now = Date.now();
		var dist = Math.hypot(touch.clientX - lastTapX, touch.clientY - lastTapY);

		// Finestra temporale di 420ms e raggio di 50px per dita su smartphone
		if (lastTapTime && (now - lastTapTime < 420) && dist < 50) {
			toggleInputMode();
			lastTapTime = 0;
		} else {
			lastTapTime = now;
			lastTapX = touch.clientX;
			lastTapY = touch.clientY;
		}
	}, { passive: true });

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

	// Splash mode switcher tabs (Scalata vs Partita Rapida vs Academy)
	var tabBtnScalata = document.getElementById('tab-btn-scalata');
	var tabBtnClassic = document.getElementById('tab-btn-classic');
	var tabBtnAcademy = document.getElementById('tab-btn-academy');
	var panelScalata = document.getElementById('panel-scalata');
	var panelClassic = document.getElementById('panel-classic');
	var panelAcademy = document.getElementById('panel-academy');
	var academyLessonsList = document.getElementById('academy-lessons-list');

	var splashPlayAcademyBtn = document.getElementById('splash-play-academy');

	function renderAcademyList() {
		if (typeof MinesweeperAcademy === 'undefined') return;
		var lessons = MinesweeperAcademy.getLessons();
		var prog = MinesweeperAcademy.getProgress();
		var isIt = !window.I18n || window.I18n.getLocale() === 'it';
		var unlockedLvl = prog.unlockedLevel || 1;
		var nextLessonIdx = Math.min(lessons.length - 1, unlockedLvl - 1);

		// Update main Play / Resume Academy button
		if (splashPlayAcademyBtn) {
			var hasCompletedAny = prog.completed && Object.keys(prog.completed).length > 0;
			var allCompleted = prog.completed && Object.keys(prog.completed).length >= lessons.length;

			if (allCompleted) {
				splashPlayAcademyBtn.textContent = isIt ? '🎓 Rigioca Corso di Logica' : '🎓 Replay Logic Course';
			} else if (hasCompletedAny) {
				var resumeStr = isIt ?
					(window.I18n ? window.I18n.t('academy.resume_course', { level: unlockedLvl }) : ('▶ Continua Corso (Lezione ' + unlockedLvl + ')')) :
					(window.I18n ? window.I18n.t('academy.resume_course', { level: unlockedLvl }) : ('▶ Resume Course (Lesson ' + unlockedLvl + ')'));
				splashPlayAcademyBtn.textContent = resumeStr;
			} else {
				splashPlayAcademyBtn.textContent = isIt ?
					(window.I18n ? window.I18n.t('academy.start_course') : '▶ Inizia il Corso') :
					(window.I18n ? window.I18n.t('academy.start_course') : '▶ Start Academy Course');
			}

			splashPlayAcademyBtn.onclick = function () {
				AudioFX.initOnGesture();
				AudioFX.click();
				startAcademyLesson(nextLessonIdx, 0);
			};
		}

		if (!academyLessonsList) return;
		academyLessonsList.innerHTML = '';

		lessons.forEach(function (l, idx) {
			var unlocked = MinesweeperAcademy.isUnlocked(idx);
			var completed = !!(prog.completed && prog.completed[l.id]);

			var card = document.createElement('div');
			card.className = 'academy-card' + (completed ? ' completed' : '') + (!unlocked ? ' locked' : '');

			var title = isIt ? l.title_it : l.title_en;
			var badge = isIt ? l.badge_it : l.badge_en;
			var desc = isIt ? l.desc_it : l.desc_en;
			var statusText = completed ? '✓ Superato' : (unlocked ? '▶ Inizia' : '🔒 Bloccato');
			if (!isIt) {
				statusText = completed ? '✓ Mastered' : (unlocked ? '▶ Start' : '🔒 Locked');
			}

			card.innerHTML =
				'<div class="academy-card-header">' +
					'<span class="academy-card-title">' + (completed ? '⭐ ' : '') + title + '</span>' +
					'<span class="academy-card-badge">' + badge + '</span>' +
				'</div>' +
				'<p class="academy-card-desc">' + desc + '</p>' +
				'<div class="academy-card-footer">' +
					'<span class="academy-status-tag">' + statusText + '</span>' +
				'</div>';

			if (unlocked) {
				card.addEventListener('click', function () {
					AudioFX.initOnGesture();
					AudioFX.click();
					startAcademyLesson(idx);
				});
			}

			academyLessonsList.appendChild(card);
		});
	}

	function switchSplashMode(mode) {
		AudioFX.initOnGesture();
		AudioFX.click();
		if (tabBtnScalata) { tabBtnScalata.classList.remove('active'); tabBtnScalata.setAttribute('aria-selected', 'false'); }
		if (tabBtnClassic) { tabBtnClassic.classList.remove('active'); tabBtnClassic.setAttribute('aria-selected', 'false'); }
		if (tabBtnAcademy) { tabBtnAcademy.classList.remove('active'); tabBtnAcademy.setAttribute('aria-selected', 'false'); }
		if (panelScalata) panelScalata.classList.remove('active');
		if (panelClassic) panelClassic.classList.remove('active');
		if (panelAcademy) panelAcademy.classList.remove('active');

		if (mode === 'classic') {
			if (tabBtnClassic) { tabBtnClassic.classList.add('active'); tabBtnClassic.setAttribute('aria-selected', 'true'); }
			if (panelClassic) panelClassic.classList.add('active');
		} else if (mode === 'academy') {
			if (tabBtnAcademy) { tabBtnAcademy.classList.add('active'); tabBtnAcademy.setAttribute('aria-selected', 'true'); }
			if (panelAcademy) panelAcademy.classList.add('active');
			renderAcademyList();
		} else {
			if (tabBtnScalata) { tabBtnScalata.classList.add('active'); tabBtnScalata.setAttribute('aria-selected', 'true'); }
			if (panelScalata) panelScalata.classList.add('active');
		}
	}

	if (tabBtnScalata) tabBtnScalata.addEventListener('click', function () { switchSplashMode('scalata'); });
	if (tabBtnClassic) tabBtnClassic.addEventListener('click', function () { switchSplashMode('classic'); });
	if (tabBtnAcademy) tabBtnAcademy.addEventListener('click', function () { switchSplashMode('academy'); });

	/* ============================================================
	   ACADEMY INTERACTIVE COURSE RUNNER
	   ============================================================ */
	function startAcademyLesson(lessonIndex, puzzleIndex) {
		if (typeof MinesweeperAcademy === 'undefined') return;
		var lesson = MinesweeperAcademy.getLesson(lessonIndex);
		if (!lesson) return;

		puzzleIndex = puzzleIndex || 0;
		var puzzle = lesson.puzzles[puzzleIndex];
		if (!puzzle) return;

		state.mode = 'academy';
		state.academyLessonIndex = lessonIndex;
		state.academyPuzzleIndex = puzzleIndex;
		state.isDidactic = true;
		state.heatmapEnabled = false;
		if (btnDidacticHeatmap) btnDidacticHeatmap.classList.remove('active');
		setInputMode('dig');
		document.body.classList.add('didactic-mode');
		clearDidacticHighlights();

		splashEl.classList.add('hidden');
		requestGameFullscreen();

		var isIt = !window.I18n || window.I18n.getLocale() === 'it';
		levelLabelEl.textContent = 'LEZ ' + lesson.level + '.' + (puzzleIndex + 1);
		levelProgressEl.style.width = ((lesson.level / MinesweeperAcademy.getLessons().length) * 100) + '%';

		state.firstClick = false;
		state.gameOver = false;
		state.started = true;
		state.revealed = 0;
		state.flags = 0;
		state.elapsed = 0;
		stopTimer();
		timerEl.textContent = '0';
		scoreTotalEl.textContent = '🎓';

		// Setup mini-board from preset
		state.actualRows = puzzle.rows;
		state.actualCols = puzzle.cols;
		state.board = [];
		var mineCount = 0;

		for (var r = 0; r < puzzle.rows; r++) {
			state.board[r] = [];
			for (var c = 0; c < puzzle.cols; c++) {
				var pCell = puzzle.board[r][c];
				var isMine = !!pCell.mine;
				if (isMine) mineCount++;
				state.board[r][c] = {
					mine: isMine,
					revealed: !!pCell.rev,
					flagged: !!pCell.flag,
					count: pCell.val || 0
				};
				if (pCell.flag) state.flags++;
				if (pCell.rev) state.revealed++;
			}
		}

		mineCountEl.textContent = Math.max(0, mineCount - state.flags);
		renderBoard();

		// Show instructional toast
		var instr = isIt ? puzzle.instruction_it : puzzle.instruction_en;
		didacticToastTitle.innerHTML = '🎓 ' + (isIt ? lesson.title_it : lesson.title_en);
		didacticToastText.textContent = instr;
		didacticToast.classList.add('show');
	}

	function handleAcademyAction(action, r, c) {
		var lesson = MinesweeperAcademy.getLesson(state.academyLessonIndex);
		if (!lesson) return;
		var puzzle = lesson.puzzles[state.academyPuzzleIndex];
		if (!puzzle) return;

		var isTarget = (puzzle.target && puzzle.target.r === r && puzzle.target.c === c) ||
			(puzzle.alternateTarget && puzzle.alternateTarget.r === r && puzzle.alternateTarget.c === c);
		var isCorrectAction = (action === puzzle.requiredAction);

		var isIt = !window.I18n || window.I18n.getLocale() === 'it';

		if (isTarget && isCorrectAction) {
			AudioFX.levelUp();
			haptic(35);

			// Apply visual move
			if (action === 'flag') {
				state.board[r][c].flagged = true;
			} else if (action === 'reveal' || action === 'chord') {
				state.board[r][c].revealed = true;
			}
			updateBoardDisplay();

			// Advance to next puzzle or complete lesson
			var hasNextPuzzle = state.academyPuzzleIndex + 1 < lesson.puzzles.length;
			if (hasNextPuzzle) {
				didacticToastTitle.innerHTML = '✅ ' + (isIt ? 'Eccellente!' : 'Well Done!');
				didacticToastText.textContent = isIt ? 'Deduzione corretta! Passiamo al banco di prova successivo.' : 'Correct deduction! Moving to the next test board.';
				didacticToast.classList.add('show');
				setTimeout(function () {
					startAcademyLesson(state.academyLessonIndex, state.academyPuzzleIndex + 1);
				}, 900);
			} else {
				MinesweeperAcademy.completeLesson(state.academyLessonIndex);
				launchConfetti();
				didacticToast.classList.remove('show');

				// Trigger WordPress Achievement & Badge Unlock on Milestones:
				// Lesson 1 completed -> logic_cadet
				// Lesson 5 (1-2-1) completed -> tactical_analyst
				// All 8 lessons completed -> logic_scholar
				var inIframe = window.parent !== window;
				if (inIframe) {
					if (state.academyLessonIndex === 0) {
						window.parent.postMessage({
							type: 'pointnet-games:unlock-achievement',
							data: { achievement_id: 'logic_cadet', source: 'minesweeper-arcade' }
						}, window.location.origin);
					}
					if (state.academyLessonIndex === 4) {
						window.parent.postMessage({
							type: 'pointnet-games:unlock-achievement',
							data: { achievement_id: 'tactical_analyst', source: 'minesweeper-arcade' }
						}, window.location.origin);
					}
					if (state.academyLessonIndex >= MinesweeperAcademy.getLessons().length - 1) {
						window.parent.postMessage({
							type: 'pointnet-games:unlock-achievement',
							data: { achievement_id: 'logic_scholar', source: 'minesweeper-arcade' }
						}, window.location.origin);
					}
				}

				modalEmoji.textContent = '🎓';
				modalTitle.textContent = isIt ? window.I18n.t('academy.lesson_passed_title') : 'Lesson Mastered!';
				modalScore.textContent = isIt ? lesson.title_it : lesson.title_en;
				modalPosition.textContent = isIt ? window.I18n.t('academy.lesson_passed_desc') : 'You have mastered this logical principle!';

				var nextBtn = document.getElementById('modal-next');
				var replayBtn = document.getElementById('modal-replay');
				var closeBtn = document.getElementById('modal-close');
				replayBtn.style.display = 'none';

				var hasNextLesson = state.academyLessonIndex + 1 < MinesweeperAcademy.getLessons().length;
				if (hasNextLesson) {
					nextBtn.textContent = isIt ? window.I18n.t('academy.continue_course') : 'Next Lesson ▶';
					nextBtn.onclick = function () {
						overlayEl.classList.remove('show');
						startAcademyLesson(state.academyLessonIndex + 1, 0);
					};
				} else {
					nextBtn.textContent = isIt ? '🏆 Corso Completato!' : '🏆 Academy Completed!';
					nextBtn.onclick = function () {
						overlayEl.classList.remove('show');
						openMenu();
					};
				}

				closeBtn.textContent = isIt ? window.I18n.t('academy.back_to_curriculum') : 'Academy';
				closeBtn.onclick = function () {
					overlayEl.classList.remove('show');
					openMenu();
					switchSplashMode('academy');
				};

				overlayEl.classList.add('show');
			}
		} else {
			AudioFX.lose();
			haptic(60);
			var wrongEl = boardEl.querySelector('[data-r="' + r + '"][data-c="' + c + '"]');
			if (wrongEl) {
				wrongEl.classList.add('wrong-flag');
				setTimeout(function () { wrongEl.classList.remove('wrong-flag'); }, 600);
			}
			didacticToastTitle.innerHTML = '❌ ' + (isIt ? 'Mossa non corretta' : 'Incorrect Move');
			didacticToastText.textContent = isIt ?
				('Questa mossa non è corretta. ' + puzzle.instruction_it) :
				('That move is incorrect. ' + puzzle.instruction_en);
			didacticToast.classList.add('show');
		}
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
			if (fsCloseBtn) fsCloseBtn.style.display = 'inline-flex';
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
			if (fsCloseBtn) fsCloseBtn.style.display = 'none';
		}
	}

	if (fsCloseBtn) fsCloseBtn.addEventListener('click', exitGameFullscreen);

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
