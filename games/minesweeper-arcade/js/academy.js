/**
 * Minesweeper Arcade — Interactive Academy ("Impara dalle Basi")
 * Progressive step-by-step logic course with authentic 100% 9x9 real game boards.
 */
var MinesweeperAcademy = (function () {
	'use strict';

	var STORAGE_KEY = 'minesweeper_academy_progress';

	var LESSONS = [
	{
		"id": "controls",
		"level": 1,
		"title_it": "1. Basi & Comandi di Gioco",
		"title_en": "1. Controls & Interface",
		"badge_it": "Guida Introduttiva",
		"badge_en": "Quickstart",
		"desc_it": "Impara i comandi su una vera griglia 9×9: come scavare, come piazzare bandierine e tutti i modi per passare rapidamente da Scava a Bandiera (pulsante nella barra superiore, doppio clic/tap o due dita).",
		"desc_en": "Master controls on an authentic 9×9 grid: digging, placing flags, and every way to switch tools (top toolbar button, double-click/double-tap, or two-finger tap).",
		"puzzles": [
			{
				"forcedInputMode": "dig",
				"instruction_it": "Tocca o fai clic con il tasto sinistro sulla casella verde al centro della tavola per eseguire il tuo primo scavo e aprire la griglia!",
				"instruction_en": "Tap or left-click the highlighted green tile in the center of the board to make your first dig and open the grid!",
				"requiredAction": "reveal",
				"target": {
					"r": 4,
					"c": 4
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": false
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": false
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": false
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": false
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 1,
							"c": 7,
							"val": 1,
							"rev": false
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": false
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": false
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": false
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": false
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": false
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": false
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": false
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": false
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": false
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": false
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": false
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": false
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": false
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": false
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": false
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": false
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": false
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": false
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": false
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": false
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": false
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": false
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": false
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": false
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": false
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": false
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": false
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": false
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": false
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": false
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": false
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": false
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": false
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": false
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": false
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": false
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": false
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": false
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": false
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": false
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": false
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": false
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": false
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": false
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": false
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": false
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": false
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": false
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": false
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": false
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": false
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": false
						},
						{
							"r": 8,
							"c": 7,
							"val": 2,
							"rev": false
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					]
				]
			},
			{
				"forcedInputMode": "dig",
				"highlightFlagBtn": true,
				"instruction_it": "Attiva la modalità Bandiera facendo clic sul pulsante '🚩 Bandiera' nella barra dei comandi (sopra la griglia) oppure fai doppio clic in un punto qualsiasi della tavola. Poi tocca la casella rossa per segnalare la mina!",
				"instruction_en": "Switch to Flag mode by clicking the '🚩 Flag' button in the toolbar (above the grid) or double-click anywhere on the board. Then tap the red tile to flag the mine!",
				"instruction_desktop_it": "Attiva la modalità Bandiera facendo clic sul pulsante '🚩 Bandiera' nella barra dei comandi (sopra la griglia) oppure fai doppio clic sulla tavola o premi 'F'. Poi fai clic sulla casella rossa per segnalare la mina!",
				"instruction_desktop_en": "Switch to Flag mode by clicking the '🚩 Flag' button in the toolbar (above the grid) or double-click on the board or press 'F'. Then left-click the red tile to flag the mine!",
				"instruction_mobile_it": "Attiva la modalità Bandiera toccando il pulsante '🚩 Bandiera' nella barra dei comandi (sopra la griglia) oppure tocca con 2 dita o fai doppio tap sulla tavola. Poi tocca la casella rossa per segnalare la mina!",
				"instruction_mobile_en": "Switch to Flag mode by tapping the '🚩 Flag' button in the toolbar (above the grid) or tap with 2 fingers or double-tap on the board. Then tap the red tile to flag the mine!",
				"instruction_flag_mode_it": "Ottimo, ora sei in modalità Bandiera 🚩! Tocca la casella rossa per piazzare la bandiera sulla mina.",
				"instruction_flag_mode_en": "Great, Flag mode 🚩 is active! Tap the red tile to place a flag on the mine.",
				"requiredAction": "flag",
				"target": {
					"r": 0,
					"c": 1
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					]
				]
			},
			{
				"forcedInputMode": "dig",
				"instruction_it": "Scorciatoia rapida: mentre hai lo strumento Scava ⛏️ attivo, usa il TASTO DESTRO del mouse (o tieni premuto a lungo su touch) direttamente sulla casella rossa per piazzare la bandiera 🚩 all'istante senza cambiare strumento!",
				"instruction_en": "Quick shortcut: while Dig ⛏️ is active, RIGHT-CLICK (or long-press on touch) directly on the red tile to place a flag 🚩 instantly without switching tools!",
				"instruction_desktop_it": "Scorciatoia rapida da mouse: mentre hai lo strumento Scava ⛏️ attivo, fai clic con il TASTO DESTRO del mouse direttamente sulla casella rossa per piazzare la bandiera 🚩 all'istante!",
				"instruction_desktop_en": "Quick mouse shortcut: while Dig ⛏️ is active, RIGHT-CLICK directly on the red tile to place a flag 🚩 instantly without switching tools!",
				"instruction_mobile_it": "Scorciatoia rapida su touch: mentre hai lo strumento Scava ⛏️ attivo, TIENI PREMUTO a lungo sulla casella rossa per piazzare la bandiera 🚩 senza cambiare strumento!",
				"instruction_mobile_en": "Quick touch shortcut: while Dig ⛏️ is active, LONG-PRESS on the red tile to place a flag 🚩 without switching tools!",
				"instruction_flag_mode_it": "Sei già in modalità Bandiera 🚩: tocca direttamente la casella rossa per piazzare la bandiera!",
				"instruction_flag_mode_en": "You are in Flag 🚩 mode: simply tap the red tile to place the flag!",
				"requiredAction": "flag",
				"target": {
					"r": 0,
					"c": 4
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true,
							"flag": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					]
				]
			}
		]
	},
	{
		"id": "saturation",
		"level": 2,
		"title_it": "2. Regola della Saturazione",
		"title_en": "2. Saturation Rule",
		"badge_it": "Le Basi Fondamentali",
		"badge_en": "Fundamentals",
		"desc_it": "Se un numero tocca tante caselle coperte quante sono le sue mine mancanti, sono tutte mine. Se le sue mine sono già tutte trovate, le altre caselle attorno sono sicure al 100%.",
		"desc_en": "If a clue touches as many hidden tiles as its remaining mines, they are all mines. Once all its mines are flagged, every other neighbor is 100% safe.",
		"puzzles": [
			{
				"instruction_it": "Guarda in basso a sinistra: il numero 1 evidenziato tocca una sola casella coperta! È saturo, quindi deve essere una mina: metti una bandiera 🚩 sulla casella rossa.",
				"instruction_en": "Look at the bottom-left: the highlighted clue 1 touches only a single hidden tile! It is fully saturated, so it must be a mine: place a flag 🚩 on the red tile.",
				"requiredAction": "flag",
				"patternCells": [
					{
						"r": 6,
						"c": 0
					}
				],
				"target": {
					"r": 7,
					"c": 0
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					]
				]
			},
			{
				"instruction_it": "Una volta posizionata la bandiera sulla mina, il numero 1 vicino ha già trovato la sua unica mina: tutte le altre sue caselle attorno sono sicure! Scava ⛏️ la casella verde libera.",
				"instruction_en": "Once the flag is placed on the mine, the adjacent 1 already has its single mine found: all its other neighbors are safe! Dig ⛏️ the green safe tile.",
				"requiredAction": "reveal",
				"patternCells": [
					{
						"r": 1,
						"c": 0
					},
					{
						"r": 1,
						"c": 1
					}
				],
				"target": {
					"r": 0,
					"c": 0
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true,
							"flag": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					]
				]
			},
			{
				"isTest": true,
				"instruction_it": "🎯 Sfida Pratica: analizza questa nuova tavola! Guarda lungo la parete destra: il numero 1 tocca una sola casella coperta rimasta. È saturo: individua la mina e piazza la bandiera 🚩!",
				"instruction_en": "🎯 Practical Challenge: analyze this new board! Look along the right edge: the clue 1 touches only one remaining hidden tile. It is saturated: spot the mine and place a flag 🚩!",
				"requiredAction": "flag",
				"target": {
					"r": 1,
					"c": 8
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 3,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 3,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					]
				]
			}
		]
	},
	{
		"id": "chording",
		"level": 3,
		"title_it": "3. L'Arte del Chording",
		"title_en": "3. The Art of Chording",
		"badge_it": "Tecnica di Gioco Rapido",
		"badge_en": "Speed Technique",
		"desc_it": "Quando le bandiere attorno a un numero scoperto equivalgono al suo valore, toccare il numero apre istantaneamente tutte le sue caselle adiacenti sicure!",
		"desc_en": "When flagged mines around a revealed number equal its count, tapping that number instantly clears all its safe neighbors at once!",
		"puzzles": [
			{
				"instruction_it": "L'1 in alto a sinistra tocca già la sua bandiera sopra di sé: tocca o clicca il numero 1 evidenziato per eseguire il chording ed aprire in un colpo solo le caselle sicure vicine!",
				"instruction_en": "The 1 at the top-left already touches its flag above: tap or click the highlighted clue 1 to chord and reveal all adjacent safe tiles at once!",
				"requiredAction": "chord",
				"target": {
					"r": 1,
					"c": 1
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true,
							"flag": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					]
				]
			},
			{
				"isTest": true,
				"instruction_it": "🎯 Sfida Pratica: nuova tavola! Cerca lungo la parete destra il numero 1 che tocca già la sua bandiera (3, 8): cliccalo o toccalo per fare chording ed aprire all'istante le caselle libere adiacenti!",
				"instruction_en": "🎯 Practical Challenge: new board! Find the clue 1 along the right wall touching its flag (3, 8): click/tap it to chord and instantly clear adjacent safe tiles!",
				"requiredAction": "chord",
				"target": {
					"r": 2,
					"c": 7
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 3,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true,
							"flag": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 3,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					]
				]
			}
		]
	},
	{
		"id": "pattern_11",
		"level": 4,
		"title_it": "4. Pattern 1-1 e 1-1-X su Parete",
		"title_en": "4. 1-1 and 1-1-X Wall Pattern",
		"badge_it": "Deduzione a Bordo",
		"badge_en": "Border Deduction",
		"desc_it": "Lungo un bordo, due numeri 1 consecutivi condividono la loro unica mina. La terza casella che sporge oltre il secondo 1 è GARANTITA SICURA, a prescindere dal numero successivo (X)!",
		"desc_en": "Along an edge, two consecutive 1s share their single mine. The third tile sticking out past the second 1 is GUARANTEED SAFE, regardless of the following number (X)!",
		"puzzles": [
			{
				"instruction_it": "In alto a sinistra, i due 1 evidenziati condividono la mina nelle prime due caselle sopra. La terza casella sopra a X è garantita libera: scava ⛏️ la casella verde!",
				"instruction_en": "At the top-left, the two highlighted 1s share their mine in the first two tiles above. The third tile above X is guaranteed safe: dig ⛏️ the green tile!",
				"requiredAction": "reveal",
				"patternCells": [
					{
						"r": 1,
						"c": 0
					},
					{
						"r": 1,
						"c": 1
					}
				],
				"target": {
					"r": 0,
					"c": 2
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					]
				]
			},
			{
				"isTest": true,
				"instruction_it": "🎯 Sfida Pratica: nuova tavola! Guarda in basso lungo l'ottava riga (riga 7). I primi due numeri (1 e 1) condividono la mina nelle prime due caselle coperte sotto. Applica il pattern 1-1-X: scava ⛏️ la terza casella coperta a destra garantita libera!",
				"instruction_en": "🎯 Practical Challenge: new board! Look at the bottom along row 7. The two 1s share their mine in the first two hidden tiles below. Apply the 1-1-X pattern: dig ⛏️ the third covered tile to the right!",
				"requiredAction": "reveal",
				"target": {
					"r": 8,
					"c": 2
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 7,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 3,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 1,
							"rev": false
						}
					]
				]
			}
		]
	},
	{
		"id": "pattern_12x",
		"level": 5,
		"title_it": "5. Pattern Generale 1-2-X (La Mina Esterna)",
		"title_en": "5. General 1-2-X Pattern (Outer Mine)",
		"badge_it": "La Mina Esterna",
		"badge_en": "The Outer Mine",
		"desc_it": "In una coppia 1-2 su parete, l'1 trattiene la prima mina nelle celle condivise: la seconda mina del 2 viene spinta per forza all'esterno, sopra al numero successivo (X, qualsiasi esso sia)! Sulle altre celle non c'è certezza, ma sopra a X c'è SEMPRE una mina.",
		"desc_en": "In a 1-2 pair along an edge, the 1 locks the first mine into the shared tiles: the 2's second mine is forced onto the outer tile above the next number (X, whatever it is)! While other tiles remain uncertain, the tile above X is ALWAYS a mine.",
		"puzzles": [
			{
				"instruction_it": "Regola del pattern 1-2-X: l'1 evidenziato confina 1 mina nelle prime due celle, quindi la seconda mina del 2 sporge per forza sopra a X! Metti la bandiera 🚩 sulla casella rossa.",
				"instruction_en": "1-2-X rule: the highlighted 1 locks 1 mine in the first two tiles, forcing the 2's second mine onto the outer tile above X! Flag 🚩 the red tile.",
				"requiredAction": "flag",
				"patternCells": [
					{
						"r": 1,
						"c": 1
					},
					{
						"r": 1,
						"c": 2
					}
				],
				"target": {
					"r": 0,
					"c": 3
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 1,
							"rev": false
						}
					]
				]
			},
			{
				"isTest": true,
				"instruction_it": "🎯 Sfida Pratica: nuova tavola! Cerca la coppia 1-2 lungo il bordo inferiore (riga 7). Applica la regola dell'1-2-X: l'1 trattiene una mina condivisa, costringendo la seconda mina del 2 a sporgere all'esterno sotto a X: piazza la bandiera 🚩!",
				"instruction_en": "🎯 Practical Challenge: new board! Find the 1-2 pair along the bottom edge (row 7). Apply the 1-2-X rule: the 1 locks a shared mine, forcing the 2's second mine onto the outer tile below X: flag 🚩 it!",
				"requiredAction": "flag",
				"target": {
					"r": 8,
					"c": 3
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 1,
							"rev": false
						}
					]
				]
			}
		]
	},
	{
		"id": "pattern_121",
		"level": 6,
		"title_it": "6. Pattern Classico 1-2-1 (Il Caso Perfetto)",
		"title_en": "6. Classic 1-2-1 Pattern (The Perfect Case)",
		"badge_it": "Pattern Reale",
		"badge_en": "Royal Pattern",
		"desc_it": "Quando la famosa 'X' dell'1-2-X è a sua volta un numero 1, la sequenza diventa simmetrica: l'1-2-X si applica da entrambi i lati! Le due estremità davanti agli 1 sono sempre MINE (🚩), e la casella centrale davanti al 2 è garantita LIBERA (⛏️)!",
		"desc_en": "When the 'X' of 1-2-X is itself a 1, the sequence becomes symmetric: 1-2-X applies from both sides! The outer ends facing the 1s are always MINES (🚩), and the center tile facing the 2 is guaranteed SAFE (⛏️)!",
		"puzzles": [
			{
				"instruction_it": "Regola aurea del pattern 1-2-1: applicando la regola dell'1-2 da ambo i lati, le due estremità sono mine e il centro davanti al 2 è sempre garantito libero! Scava ⛏️ la casella verde centrale.",
				"instruction_en": "Golden rule of 1-2-1: applying the 1-2 logic from both sides, the outer ends are mines and the center facing the 2 is guaranteed safe! Dig ⛏️ the green central tile.",
				"requiredAction": "reveal",
				"patternCells": [
					{
						"r": 1,
						"c": 1
					},
					{
						"r": 1,
						"c": 2
					},
					{
						"r": 1,
						"c": 3
					}
				],
				"target": {
					"r": 0,
					"c": 2
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 2,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 1,
							"rev": false
						}
					]
				]
			},
			{
				"instruction_it": "Ora che il centro è scavato, piazza le bandiere sulle due estremità davanti ai numeri 1! Metti le bandiere 🚩 sulle due caselle rosse.",
				"instruction_en": "Now that the center is cleared, flag both ends facing the 1s! Flag 🚩 both outer red tiles.",
				"requiredAction": "flag",
				"patternCells": [
					{
						"r": 1,
						"c": 1
					},
					{
						"r": 1,
						"c": 2
					},
					{
						"r": 1,
						"c": 3
					}
				],
				"targets": [
					{
						"r": 0,
						"c": 1,
						"action": "flag"
					},
					{
						"r": 0,
						"c": 3,
						"action": "flag"
					}
				],
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 2,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 1,
							"rev": false
						}
					]
				]
			},
			{
				"isTest": true,
				"instruction_it": "🎯 Sfida Pratica: nuova tavola! Cerca la sequenza 1-2-1 lungo il bordo inferiore (riga 7). Applica la regola d'oro: scava ⛏️ la casella centrale e piazza la bandiera 🚩 sulle due estremità!",
				"instruction_en": "🎯 Practical Challenge: new board! Spot the 1-2-1 sequence along the bottom edge (row 7). Apply the golden rule: dig ⛏️ the central tile and flag 🚩 both outer ends!",
				"targets": [
					{
						"r": 8,
						"c": 1,
						"action": "flag"
					},
					{
						"r": 8,
						"c": 2,
						"action": "reveal"
					},
					{
						"r": 8,
						"c": 3,
						"action": "flag"
					}
				],
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 2,
							"rev": false
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 1,
							"rev": false
						}
					]
				]
			}
		]
	},
	{
		"id": "pattern_1221",
		"level": 7,
		"title_it": "7. Pattern 1-2-2-1 e 1-2-2-X",
		"title_en": "7. 1-2-2-1 and 1-2-2-X Pattern",
		"badge_it": "Doppia Coppia",
		"badge_en": "Double Pair",
		"desc_it": "In una sequenza 1-2-2-X lungo una parete, l'1 confina la prima mina, costringendo le mine a trovarsi esattamente davanti ai due numeri 2. Le caselle davanti agli 1 sono sempre SICURE al 100%, anche se dopo c'è un altro numero (X)!",
		"desc_en": "In a 1-2-2-X sequence along a wall, the 1 locks the first mine, forcing mines directly in front of the two 2s. Tiles facing the 1s are ALWAYS 100% safe, even if another number follows (X)!",
		"puzzles": [
			{
				"instruction_it": "Regola del pattern 1-2-2-X: le caselle davanti agli 1 sono sempre libere! Scava ⛏️ le due caselle verdi alle estremità esterne.",
				"instruction_en": "1-2-2-X rule: the tiles facing both 1s are always safe! Dig ⛏️ both green outer tiles.",
				"requiredAction": "reveal",
				"patternCells": [
					{
						"r": 1,
						"c": 2
					},
					{
						"r": 1,
						"c": 3
					},
					{
						"r": 1,
						"c": 4
					},
					{
						"r": 1,
						"c": 5
					}
				],
				"targets": [
					{
						"r": 0,
						"c": 2,
						"action": "reveal"
					},
					{
						"r": 0,
						"c": 5,
						"action": "reveal"
					}
				],
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 2,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 2,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 8,
							"val": 0,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 0,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 1,
							"rev": false
						}
					]
				]
			},
			{
				"instruction_it": "Regola del pattern 1-2-2-X: le mine sono esattamente davanti ai due numeri 2! Metti la bandiera 🚩 sulle due caselle rosse centrali.",
				"instruction_en": "1-2-2-X rule: the mines are directly in front of both 2s! Flag 🚩 both central red tiles.",
				"requiredAction": "flag",
				"patternCells": [
					{
						"r": 1,
						"c": 2
					},
					{
						"r": 1,
						"c": 3
					},
					{
						"r": 1,
						"c": 4
					},
					{
						"r": 1,
						"c": 5
					}
				],
				"targets": [
					{
						"r": 0,
						"c": 3,
						"action": "flag"
					},
					{
						"r": 0,
						"c": 4,
						"action": "flag"
					}
				],
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 2,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 2,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 8,
							"val": 0,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 0,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 1,
							"rev": false
						}
					]
				]
			},
			{
				"isTest": true,
				"instruction_it": "🎯 Sfida Pratica: nuova tavola! Trova la sequenza 1-2-2-1 lungo il bordo inferiore (riga 7). Scava ⛏️ le caselle davanti agli 1 e piazza le bandiere 🚩 davanti ai due 2 centrali!",
				"instruction_en": "🎯 Practical Challenge: new board! Find the 1-2-2-1 sequence along the bottom edge (row 7). Dig ⛏️ facing the 1s and flag 🚩 facing both central 2s!",
				"targets": [
					{
						"r": 8,
						"c": 2,
						"action": "reveal"
					},
					{
						"r": 8,
						"c": 3,
						"action": "flag"
					},
					{
						"r": 8,
						"c": 4,
						"action": "flag"
					},
					{
						"r": 8,
						"c": 5,
						"action": "reveal"
					}
				],
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 2,
							"rev": false
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 2,
							"rev": false
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": true
						}
					]
				]
			}
		]
	},
	{
		"id": "reductions",
		"level": 8,
		"title_it": "8. Riduzioni con Bandiere (1-2-2 ➔ 1-2-1)",
		"title_en": "8. Flag Reductions (1-2-2 ➔ 1-2-1)",
		"badge_it": "Sottrazione Visiva",
		"badge_en": "Visual Reduction",
		"desc_it": "Sottraendo le bandiere già piazzate, un 2 diventa 1 (2 - 1 = 1)! Così una sequenza complessa come 1-2-2 si risolve esattamente come un semplice 1-2-1.",
		"desc_en": "By subtracting already placed flags, a 2 becomes a 1! Complex layouts like 1-2-2 simplify instantly into a standard 1-2-1.",
		"puzzles": [
			{
				"instruction_it": "La bandiera già presente sottrae 1 dal 2 vicino (2 - 1 = 1): la sequenza diventa un classico 1-2-1! Scava ⛏️ al centro (verde) e metti le bandiere 🚩 sui lati (rosso).",
				"instruction_en": "The existing flag reduces the adjacent 2 to 1 (2 - 1 = 1): the sequence becomes a classic 1-2-1! Dig ⛏️ the middle (green) and flag 🚩 the sides (red).",
				"patternCells": [
					{
						"r": 1,
						"c": 1
					},
					{
						"r": 1,
						"c": 2
					},
					{
						"r": 1,
						"c": 3
					}
				],
				"targets": [
					{
						"r": 0,
						"c": 1,
						"action": "flag"
					},
					{
						"r": 0,
						"c": 2,
						"action": "reveal"
					},
					{
						"r": 0,
						"c": 3,
						"action": "flag"
					}
				],
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 2,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true,
							"flag": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 1,
							"rev": false
						}
					]
				]
			},
			{
				"isTest": true,
				"instruction_it": "🎯 Sfida Pratica: nuova tavola! Guarda in basso: la bandiera piazzata su (8, 4) sottrae 1 dal 2 adiacente, riducendo la parete a un 1-2-1. Risolvi il pattern: scava ⛏️ al centro e piazza le bandiere 🚩 ai lati!",
				"instruction_en": "🎯 Practical Challenge: new board! Look at the bottom: the flag at (8, 4) reduces the adjacent 2 to 1, creating a 1-2-1. Solve the pattern: dig ⛏️ the center and flag 🚩 both sides!",
				"targets": [
					{
						"r": 8,
						"c": 1,
						"action": "flag"
					},
					{
						"r": 8,
						"c": 2,
						"action": "reveal"
					},
					{
						"r": 8,
						"c": 3,
						"action": "flag"
					}
				],
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 2,
							"rev": false
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true,
							"flag": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 8,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 1,
							"rev": false
						}
					]
				]
			}
		]
	},
	{
		"id": "corners_niches",
		"level": 9,
		"title_it": "9. Angoli e Nicchie Chiuse",
		"title_en": "9. Corners & Enclosed Niches",
		"badge_it": "Geometria di Bordo",
		"badge_en": "Border Geometry",
		"desc_it": "Un numero 1 dentro una rientranza tocca una sola casella coperta nell'angolo: la mina è intrappolata lì! I numeri adiacenti sanno subito che le altre celle coperte sono sicure.",
		"desc_en": "A 1 tucked inside a pocket touches only one hidden corner tile: the mine is trapped there! Adjacent clues can safely clear their remaining tiles.",
		"puzzles": [
			{
				"instruction_it": "La nicchia d'angolo intrappola la mina del numero 1: c'è una sola casella coperta possibile! Metti la bandiera 🚩 sulla casella rossa nell'angolino.",
				"instruction_en": "The corner pocket traps the 1's mine: there is only one available covered tile! Flag 🚩 the red corner tile.",
				"requiredAction": "flag",
				"patternCells": [
					{
						"r": 0,
						"c": 1
					},
					{
						"r": 1,
						"c": 0
					}
				],
				"target": {
					"r": 0,
					"c": 0
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 7,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					]
				]
			},
			{
				"isTest": true,
				"instruction_it": "🎯 Sfida Pratica: nuova tavola! Ispeziona gli angoli della griglia: trova la nicchia chiusa dove un numero 1 tocca una sola casella rimasta nell'angolo e piazza la bandiera 🚩!",
				"instruction_en": "🎯 Practical Challenge: new board! Inspect the corners of the grid: find the closed pocket where a 1 touches only a single hidden corner tile and place a flag 🚩!",
				"requiredAction": "flag",
				"target": {
					"r": 8,
					"c": 8
				},
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 2,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 4,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 2,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 3,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 5,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 0,
							"rev": true
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 1,
							"rev": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					]
				]
			}
		]
	},
	{
		"id": "final_exam",
		"level": 10,
		"title_it": "10. Esame Finale di Tattica",
		"title_en": "10. Final Tactical Exam",
		"badge_it": "Gran Maestro di Logica",
		"badge_en": "Grandmaster Tactician",
		"desc_it": "Metti alla prova tutte le competenze acquisite: analizza una tavola reale con molteplici pattern combinati (1-2-1, 1-1 e saturazione) e risolvila senza aiuti visivi!",
		"desc_en": "Put all learned skills to the test: analyze an authentic board with combined patterns (1-2-1, 1-1 and saturation) and clear it without visual aids!",
		"puzzles": [
			{
				"isTest": true,
				"instruction_it": "🎯 Esame Finale: dimostra la tua maestria su questa tavola 9×9! In alto applica il pattern 1-2-1 (scava al centro, bandiere ai lati) e in basso a sinistra individua la mina satura: risolvi tutte le caselle bersaglio!",
				"instruction_en": "🎯 Final Exam: prove your mastery on this real 9×9 board! At the top apply the 1-2-1 pattern (dig middle, flag sides) and at bottom-left spot the saturated mine: clear all target tiles!",
				"targets": [
					{
						"r": 0,
						"c": 1,
						"action": "flag"
					},
					{
						"r": 0,
						"c": 2,
						"action": "reveal"
					},
					{
						"r": 0,
						"c": 3,
						"action": "flag"
					},
					{
						"r": 7,
						"c": 0,
						"action": "flag"
					}
				],
				"rows": 9,
				"cols": 9,
				"board": [
					[
						{
							"r": 0,
							"c": 0,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 1,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 2,
							"val": 2,
							"rev": false
						},
						{
							"r": 0,
							"c": 3,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 4,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 5,
							"val": 1,
							"rev": false
						},
						{
							"r": 0,
							"c": 6,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 7,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 0,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 1,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 2,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 3,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 4,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 5,
							"val": 1,
							"rev": true
						},
						{
							"r": 1,
							"c": 6,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 1,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 2,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 2,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 2,
							"c": 8,
							"val": 1,
							"rev": false
						}
					],
					[
						{
							"r": 3,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 3,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 3,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 4,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 4,
							"c": 7,
							"val": 3,
							"rev": true
						},
						{
							"r": 4,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 5,
							"c": 0,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 1,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 5,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 5,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 6,
							"c": 0,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 1,
							"val": 1,
							"rev": true
						},
						{
							"r": 6,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 6,
							"c": 7,
							"val": 2,
							"rev": true
						},
						{
							"r": 6,
							"c": 8,
							"val": 2,
							"rev": false
						}
					],
					[
						{
							"r": 7,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 7,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 7,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 7,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 7,
							"c": 8,
							"val": 0,
							"rev": false,
							"mine": true
						}
					],
					[
						{
							"r": 8,
							"c": 0,
							"val": 0,
							"rev": false,
							"mine": true
						},
						{
							"r": 8,
							"c": 1,
							"val": 2,
							"rev": true
						},
						{
							"r": 8,
							"c": 2,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 3,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 4,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 5,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 6,
							"val": 0,
							"rev": true
						},
						{
							"r": 8,
							"c": 7,
							"val": 1,
							"rev": true
						},
						{
							"r": 8,
							"c": 8,
							"val": 1,
							"rev": false
						}
					]
				]
			}
		]
	}
];

	function getProgress() {
		try {
			var raw = localStorage.getItem(STORAGE_KEY);
			if (raw) return JSON.parse(raw);
		} catch (e) {}
		return { unlockedLevel: 1, completed: {} };
	}

	function saveProgress(prog) {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
		} catch (e) {}
	}

	function isLessonUnlocked(lessonIndex) {
		var prog = getProgress();
		return (lessonIndex + 1) <= (prog.unlockedLevel || 1);
	}

	function completeLesson(lessonIndex) {
		var prog = getProgress();
		var lesson = LESSONS[lessonIndex];
		if (lesson) {
			prog.completed = prog.completed || {};
			prog.completed[lesson.id] = true;
			if (prog.unlockedLevel <= lessonIndex + 1) {
				prog.unlockedLevel = Math.min(LESSONS.length, lessonIndex + 2);
			}
		saveProgress(prog);
		}
		return prog;
	}

	function getLesson(index) {
		return LESSONS[index] || null;
	}

	function getAllLessons() {
		return LESSONS;
	}

	function resetProgress() {
		saveProgress({ unlockedLevel: 1, completed: {} });
	}

	return {
		getLessons: getAllLessons,
		getLesson: getLesson,
		getProgress: getProgress,
		isUnlocked: isLessonUnlocked,
		completeLesson: completeLesson,
		resetProgress: resetProgress
	};
})();
