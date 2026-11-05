/**
 * Minesweeper Arcade — Interactive Academy ("Impara dalle Basi")
 * Progressive step-by-step logic course with authentic, focused real game boards.
 */
var MinesweeperAcademy = (function () {
	'use strict';

	var STORAGE_KEY = 'minesweeper_academy_progress';

	var LESSONS = [
		{
			id: "controls",
			level: 0,
			title_it: "0. Basi & Comandi di Gioco",
			title_en: "0. Controls & Interface",
			badge_it: "Guida Introduttiva",
			badge_en: "Quickstart",
			desc_it: "Impara i comandi di gioco: come scavare caselle sicure, come piazzare e togliere bandierine e come usare i controlli di zoom e visualizzazione.",
			desc_en: "Master the game controls: how to dig safe tiles, how to place and remove flags, and how to use zoom and viewport buttons.",
			puzzles: [
				{
					instruction_it: "Con lo strumento '⛏️ Scava' attivo (tasto 'D'), tocca o clicca col tasto sinistro la casella verde (1,1) per SCAVARE ⛏️ la prima casella sicura!",
					instruction_en: "With '⛏️ Dig' active (key 'D'), tap or left-click the green highlighted tile (1,1) to DIG ⛏️ your first safe tile!",
					requiredAction: "reveal",
					target: {"r":1,"c":1},
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, val: 0, rev: false }, { r: 0, c: 1, val: 0, rev: false }, { r: 0, c: 2, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 0, rev: false }, { r: 1, c: 1, val: 0, rev: false }, { r: 1, c: 2, val: 0, rev: false } ],
						[ { r: 2, c: 0, val: 0, rev: false }, { r: 2, c: 1, val: 0, rev: false }, { r: 2, c: 2, val: 0, rev: false } ]
					]
				},
				{
					instruction_it: "Cambia strumento: tocca il pulsante '🚩 Bandiera', premi tasto 'F', fai doppio clic o tocca con 2 dita. Poi tocca la casella rossa (0,1) per piazzare la bandiera 🚩!",
					instruction_en: "Switch tool: click '🚩 Flag', press 'F', double-click or two-finger tap. Then select red tile (0,1) to place a flag 🚩!",
					requiredAction: "flag",
					target: {"r":0,"c":1},
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, val: 0, rev: false }, { r: 0, c: 2, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true } ]
					]
				},
				{
					instruction_it: "Scorciatoia rapida: puoi sempre usare il TASTO DESTRO del mouse (o pressione prolungata su touch) per mettere la bandiera 🚩 istantaneamente senza cambiare strumento!",
					instruction_en: "Quick shortcut: you can always RIGHT-CLICK (or long-press on touch) to place a flag 🚩 instantly without switching tools!",
					requiredAction: "flag",
					target: {"r":0,"c":1},
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, val: 0, rev: false }, { r: 0, c: 2, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: "saturation",
			level: 1,
			title_it: "1. Regola della Saturazione",
			title_en: "1. Saturation Rule",
			badge_it: "Le Basi Fondamentali",
			badge_en: "Fundamentals",
			desc_it: "Se un numero tocca tante caselle coperte quante sono le sue mine residue, sono tutte mine. Se le sue mine sono già tutte trovate, le altre caselle sono sicure al 100%.",
			desc_en: "If a number touches as many hidden tiles as its remaining mines, they are all mines. If all its mines are flagged, all other adjacent tiles are 100% safe.",
			puzzles: [
				{
					instruction_it: "Il numero 1 tocca una sola casella coperta: è saturo al 100%! Metti una bandiera 🚩 sulla mina in evidenza!",
					instruction_en: "The clue 1 touches only a single hidden tile: it is 100% saturated! Place a flag 🚩 on the mine!",
					requiredAction: "flag",
					target: {"r":0,"c":1},
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, val: 1, rev: true }, { r: 0, c: 1, mine: true, val: 0, rev: false }, { r: 0, c: 2, val: 1, rev: true } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true } ]
					]
				},
				{
					instruction_it: "Il numero 1 ha già la sua mina contrassegnata con una bandiera. Tutte le altre sue caselle sono libere: scava ⛏️ le caselle sicure adiacenti (0,0 e 0,2)!",
					instruction_en: "The clue 1 already has its mine flagged. All other neighbors are safe: dig ⛏️ the adjacent safe tiles (0,0 and 0,2)!",
					requiredAction: "reveal",
					patternCells: [{"r":1,"c":0},{"r":1,"c":2}],
					targets: [{"r":0,"c":0},{"r":0,"c":2}],
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, val: 0, rev: false, flag: true }, { r: 0, c: 2, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true } ]
					]
				},
				{
					isTest: true,
					instruction_it: "🎯 Riprova: individua autonomamente le caselle sature al 100% senza aiuti visivi e metti la bandiera 🚩 su entrambe le mine (0,1 e 0,2)!",
					instruction_en: "🎯 Challenge: independently locate both 100% saturated clues without visual aids and flag 🚩 both mines (0,1 and 0,2)!",
					requiredAction: "flag",
					targets: [{"r":0,"c":1,"action":"flag"},{"r":0,"c":2,"action":"flag"}],
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, val: 1, rev: true }, { r: 0, c: 1, mine: true, val: 0, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false }, { r: 0, c: 3, val: 1, rev: true } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 2, rev: true }, { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: "chording",
			level: 2,
			title_it: "2. L'Arte del Chording",
			title_en: "2. The Art of Chording",
			badge_it: "Tecnica di Gioco Rapido",
			badge_en: "Speed Technique",
			desc_it: "Quando le bandiere attorno a un numero scoperto equivalgono al suo valore, toccare o cliccare il numero apre simultaneamente tutte le sue caselle adiacenti sicure!",
			desc_en: "When flagged mines around a revealed number equal its count, tapping or clicking that number instantly clears all its safe neighbors at once!",
			puzzles: [
				{
					instruction_it: "Tocca il numero 2 cerchiato al centro (1,1) con le sue due bandiere già posizionate per eseguire il chording ed aprire tutte le caselle libere vicine!",
					instruction_en: "Tap the circled number 2 at (1,1) with both flags placed to chord and reveal all adjacent safe tiles!",
					requiredAction: "chord",
					target: {"r":1,"c":1},
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, val: 0, rev: false, flag: true }, { r: 0, c: 2, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 2, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 2, rev: true } ],
						[ { r: 2, c: 0, val: 1, rev: false }, { r: 2, c: 1, mine: true, val: 0, rev: false, flag: true }, { r: 2, c: 2, val: 1, rev: false } ]
					]
				},
				{
					isTest: true,
					instruction_it: "🎯 Riprova: trova il numero che ha già tutte le bandiere necessarie attorno a sé ed esegui il chording per liberare le celle sicure!",
					instruction_en: "🎯 Challenge: find the number whose required flags are already set and chord it to clear the safe neighbors!",
					requiredAction: "chord",
					target: {"r":1,"c":1},
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, val: 0, rev: false, flag: true }, { r: 0, c: 2, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 2, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 2, rev: true } ],
						[ { r: 2, c: 0, val: 1, rev: false }, { r: 2, c: 1, mine: true, val: 0, rev: false, flag: true }, { r: 2, c: 2, val: 1, rev: false } ]
					]
				}
			]
		},
		{
			id: "pattern_11",
			level: 3,
			title_it: "3. Pattern 1-1 su Parete",
			title_en: "3. 1-1 Wall Pattern",
			badge_it: "Deduzione a Bordo",
			badge_en: "Border Deduction",
			desc_it: "Lungo una parete o bordo, se due 1 consecutivi condividono due caselle, la mina è confinata tra quelle due. La terza casella toccata solo dal secondo 1 è GARANTITA SICURA!",
			desc_en: "Along a wall or boundary, if two consecutive 1s share two tiles, the mine must be among those two. The third tile touched only by the second 1 is GUARANTEED SAFE!",
			puzzles: [
				{
					instruction_it: "Lungo la parete superiore, il primo 1 a (1,0) confina la mina in (0,0) o (0,1). Il secondo 1 a (1,1) garantisce che la terza casella (0,2) è LIBERA! Scava ⛏️ la casella sicura (0,2)!",
					instruction_en: "Along the wall, the first 1 at (1,0) confines the mine to (0,0) or (0,1). The second 1 at (1,1) guarantees the third tile (0,2) is SAFE! Dig ⛏️ tile (0,2)!",
					requiredAction: "reveal",
					patternCells: [{"r":1,"c":0},{"r":1,"c":1}],
					target: {"r":0,"c":2},
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, mine: true, val: 0, rev: false }, { r: 0, c: 1, val: 1, rev: false }, { r: 0, c: 2, val: 0, rev: false }, { r: 0, c: 3, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, val: 0, rev: true }, { r: 1, c: 3, val: 0, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				},
				{
					isTest: true,
					instruction_it: "🎯 Riprova: osserva la parete a sinistra con la sequenza 1-1, deduci quale casella coperta è sicuramente libera e scavala ⛏️!",
					instruction_en: "🎯 Challenge: analyze the 1-1 sequence along the left wall, deduce which covered cell is 100% safe, and dig ⛏️ it!",
					requiredAction: "reveal",
					target: {"r":0,"c":2},
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, mine: true, val: 0, rev: false }, { r: 0, c: 1, val: 1, rev: false }, { r: 0, c: 2, val: 1, rev: false }, { r: 0, c: 3, mine: true, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, val: 1, rev: true }, { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: "pattern_12x",
			level: 4,
			title_it: "4. Pattern Fondamentale 1-2-X",
			title_en: "4. Core 1-2-X Pattern",
			badge_it: "La Mina Esterna",
			badge_en: "The Outer Mine",
			desc_it: "Un 2 tocca 3 caselle con 2 mine, ma il vicino 1 limita 1 mina alle prime due caselle. La terza casella (X) toccata solo dal 2 è SICURAMENTE UNA MINA!",
			desc_en: "A 2 touches 3 tiles with 2 mines, but an adjacent 1 confines 1 mine to the first two tiles. The third tile (X) touched only by the 2 is DEFINITELY A MINE!",
			puzzles: [
				{
					instruction_it: "L'1 a (1,0) limita 1 mina tra (0,0) e (0,1). Il 2 a (1,1) tocca anche (0,2): la mina esterna è su (0,2)! Metti la bandiera 🚩 su (0,2)!",
					instruction_en: "The 1 at (1,0) confines 1 mine to (0,0) and (0,1). The 2 at (1,1) also touches (0,2): the outer mine is at (0,2)! Flag 🚩 (0,2)!",
					requiredAction: "flag",
					patternCells: [{"r":1,"c":0},{"r":1,"c":1}],
					target: {"r":0,"c":2},
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, val: 0, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false }, { r: 0, c: 3, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 2, rev: true }, { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				},
				{
					instruction_it: "Ora che la mina esterna è identificata, completa il pattern 1-2: metti entrambe le bandierine 🚩 sulle mine del 2 (a 0,1 e 0,2)!",
					instruction_en: "Now that the outer mine is identified, complete the 1-2 pattern: place both flags 🚩 on the 2's mines (at 0,1 and 0,2)!",
					requiredAction: "flag",
					patternCells: [{"r":1,"c":0},{"r":1,"c":1}],
					targets: [{"r":0,"c":1},{"r":0,"c":2}],
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, val: 0, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false }, { r: 0, c: 3, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 2, rev: true }, { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				},
				{
					isTest: true,
					instruction_it: "🎯 Riprova: individua la coppia 1-2 a contatto con il bordo, identifica la mina esterna del 2 e piazza la bandiera 🚩!",
					instruction_en: "🎯 Challenge: locate the 1-2 pattern along the edge, spot the 2's outer mine, and flag 🚩 it!",
					requiredAction: "flag",
					target: {"r":0,"c":2},
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, val: 0, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false }, { r: 0, c: 3, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 2, rev: true }, { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: "pattern_121",
			level: 5,
			title_it: "5. Pattern Classico 1-2-1",
			title_en: "5. Classic 1-2-1 Pattern",
			badge_it: "Pattern Reale",
			badge_en: "Royal Pattern",
			desc_it: "La sequenza 1-2-1 lungo una parete diritta ha una soluzione universale immediata: le caselle davanti ai due 1 sono MINE (🚩), mentre la casella davanti al 2 centrale è LIBERA (⛏️)!",
			desc_en: "The 1-2-1 sequence along a flat wall has a universal rule: tiles facing the two 1s are MINES (🚩), while the tile facing the central 2 is SAFE (⛏️)!",
			puzzles: [
				{
					instruction_it: "Pattern 1-2-1 su parete: la casella centrale (0,1) davanti al 2 è sempre garantita libera! Scava ⛏️ la casella centrale (0,1).",
					instruction_en: "1-2-1 wall pattern: the central tile (0,1) facing the 2 is always guaranteed safe! Dig ⛏️ the middle safe tile (0,1).",
					requiredAction: "reveal",
					patternCells: [{"r":1,"c":0},{"r":1,"c":1},{"r":1,"c":2}],
					target: {"r":0,"c":1},
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, mine: true, val: 0, rev: false }, { r: 0, c: 1, val: 2, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true } ]
					]
				},
				{
					instruction_it: "Pattern 1-2-1 su parete: le caselle davanti ai due 1 sono sempre mine! Metti la bandiera 🚩 su entrambe le mine esterne (0,0 e 0,2).",
					instruction_en: "1-2-1 wall pattern: the tiles facing the two 1s are always mines! Flag 🚩 both outer mines (0,0 and 0,2).",
					requiredAction: "flag",
					patternCells: [{"r":1,"c":0},{"r":1,"c":1},{"r":1,"c":2}],
					targets: [{"r":0,"c":0},{"r":0,"c":2}],
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, mine: true, val: 0, rev: false }, { r: 0, c: 1, val: 2, rev: true }, { r: 0, c: 2, mine: true, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true } ]
					]
				},
				{
					isTest: true,
					instruction_it: "🎯 Riprova: individua il pattern 1-2-1 sulla frontiera, scava ⛏️ la casella centrale libera e metti le bandiere 🚩 sulle due mine esterne!",
					instruction_en: "🎯 Challenge: identify the 1-2-1 pattern on the frontier, dig ⛏️ the central safe cell, and flag 🚩 both outer mines!",
					targets: [{"r":0,"c":0,"action":"flag"},{"r":0,"c":1,"action":"reveal"},{"r":0,"c":2,"action":"flag"}],
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, mine: true, val: 0, rev: false }, { r: 0, c: 1, val: 2, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false }, { r: 0, c: 3, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 1, rev: true }, { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: "pattern_1221",
			level: 6,
			title_it: "6. Pattern 1-2-2-1",
			title_en: "6. 1-2-2-1 Pattern",
			badge_it: "Doppia Coppia",
			badge_en: "Double Pair",
			desc_it: "In una sequenza 1-2-2-1 lungo una parete, le mine sono esattamente davanti ai due numeri 2. Le caselle davanti ai due numeri 1 sono SEMPRE SICURE al 100%!",
			desc_en: "In a 1-2-2-1 sequence along a wall, the mines are directly in front of the two 2s. The tiles facing the two 1s are ALWAYS 100% SAFE!",
			puzzles: [
				{
					instruction_it: "Pattern 1-2-2-1: scava ⛏️ entrambe le caselle esterne sicure davanti agli 1 (in colonna 0 e 3)!",
					instruction_en: "1-2-2-1 Pattern: dig ⛏️ both outer safe tiles facing the 1s (columns 0 and 3)!",
					requiredAction: "reveal",
					patternCells: [{"r":1,"c":0},{"r":1,"c":1},{"r":1,"c":2},{"r":1,"c":3}],
					targets: [{"r":0,"c":0},{"r":0,"c":3}],
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, val: 0, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false }, { r: 0, c: 3, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 2, rev: true }, { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				},
				{
					instruction_it: "Pattern 1-2-2-1: metti le bandiere 🚩 su entrambe le mine davanti ai due numeri 2 (in colonna 1 e 2)!",
					instruction_en: "1-2-2-1 Pattern: flag 🚩 both mines in front of the two 2s (columns 1 and 2)!",
					requiredAction: "flag",
					patternCells: [{"r":1,"c":0},{"r":1,"c":1},{"r":1,"c":2},{"r":1,"c":3}],
					targets: [{"r":0,"c":1},{"r":0,"c":2}],
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, val: 1, rev: true }, { r: 0, c: 1, mine: true, val: 0, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false }, { r: 0, c: 3, val: 1, rev: true } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 2, rev: true }, { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				},
				{
					isTest: true,
					instruction_it: "🎯 Riprova: individua la sequenza 1-2-2-1, scava ⛏️ le due celle sicure davanti agli 1 e metti le bandiere 🚩 sulle mine davanti ai 2!",
					instruction_en: "🎯 Challenge: recognize the 1-2-2-1 pattern, dig ⛏️ both safe cells facing the 1s, and flag 🚩 both mines facing the 2s!",
					targets: [{"r":0,"c":0,"action":"reveal"},{"r":0,"c":1,"action":"flag"},{"r":0,"c":2,"action":"flag"},{"r":0,"c":3,"action":"reveal"}],
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, val: 0, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false }, { r: 0, c: 3, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 2, rev: true }, { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: "reductions",
			level: 7,
			title_it: "7. Riduzioni Algebriche (1-2-2 ➔ 1-2-1)",
			title_en: "7. Reductions (1-2-2 ➔ 1-2-1)",
			badge_it: "Algebra delle Bandiere",
			badge_en: "Flag Arithmetic",
			desc_it: "La maggior parte dei pattern apparentemente complessi (es. 1-2-2 o 2-3-2) si trasforma in un semplice 1-2-1 sottraendo le mine già contrassegnate con bandiera (2 - 1 = 1)!",
			desc_en: "Most complex layouts (e.g. 1-2-2 or 2-3-2) reduce into a clean 1-2-1 by subtracting already placed flags (2 - 1 = 1)!",
			puzzles: [
				{
					instruction_it: "La bandiera piazzata a (0,3) riduce il 2 adiacente a valore residuo 1: la sequenza 1-2-2 si comporta come un classico 1-2-1! Scava ⛏️ la casella centrale (0,1) e metti le bandiere 🚩 sulle mine (0,0 e 0,2).",
					instruction_en: "The flag placed at (0,3) reduces the adjacent 2 to 1: the 1-2-2 sequence behaves as a classic 1-2-1! Dig ⛏️ the middle safe cell (0,1) and flag 🚩 the mines (0,0 and 0,2).",
					patternCells: [{"r":1,"c":0},{"r":1,"c":1},{"r":1,"c":2}],
					targets: [
						{"r":0,"c":0,"action":"flag"},
						{"r":0,"c":1,"action":"reveal"},
						{"r":0,"c":2,"action":"flag"}
					],
					rows: 3,
					cols: 5,
					board: [
						[ { r: 0, c: 0, mine: true, val: 0, rev: false }, { r: 0, c: 1, val: 2, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false }, { r: 0, c: 3, mine: true, val: 0, rev: false, flag: true }, { r: 0, c: 4, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 2, rev: true }, { r: 1, c: 3, val: 2, rev: true }, { r: 1, c: 4, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true }, { r: 2, c: 4, val: 0, rev: true } ]
					]
				},
				{
					isTest: true,
					instruction_it: "🎯 Riprova: sottrai la bandiera già presente per ridurre il 2 a 1 (effetto 1-2-1). Scava ⛏️ la casella centrale libera e metti le bandiere 🚩 sulle due mine!",
					instruction_en: "🎯 Challenge: subtract the existing flag to reduce 2 to 1 (1-2-1 effect). Dig ⛏️ the central safe cell and flag 🚩 both mines!",
					targets: [
						{"r":0,"c":0,"action":"flag"},
						{"r":0,"c":1,"action":"reveal"},
						{"r":0,"c":2,"action":"flag"}
					],
					rows: 3,
					cols: 5,
					board: [
						[ { r: 0, c: 0, mine: true, val: 0, rev: false }, { r: 0, c: 1, val: 2, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false }, { r: 0, c: 3, mine: true, val: 0, rev: false, flag: true }, { r: 0, c: 4, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 2, rev: true }, { r: 1, c: 3, val: 2, rev: true }, { r: 1, c: 4, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true }, { r: 2, c: 4, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: "corners_niches",
			level: 8,
			title_it: "8. Angoli e Nicchie (Hole in the Wall)",
			title_en: "8. Corners & Wall Holes",
			badge_it: "Geometria Avanzata",
			badge_en: "Advanced Geometry",
			desc_it: "Un numero 1 dentro una rientranza o nicchia tocca una sola casella coperta d'angolo: la mina è lì. I numeri esterni possono subito dedurre che le altre celle coperte sono sicure!",
			desc_en: "A clue 1 inside a pocket or indentation touches a single corner tile: the mine must be there. Adjacent numbers can safely clear other covered tiles!",
			puzzles: [
				{
					instruction_it: "La nicchia d'angolo confina la mina del numero 1 esattamente in (0,0). Metti la bandiera 🚩 sulla mina!",
					instruction_en: "The corner pocket confines the clue 1's mine directly at (0,0). Place a flag 🚩 on it!",
					requiredAction: "flag",
					patternCells: [{"r":0,"c":1},{"r":1,"c":0}],
					target: {"r":0,"c":0},
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, mine: true, val: 0, rev: false }, { r: 0, c: 1, val: 1, rev: true }, { r: 0, c: 2, val: 0, rev: true } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, val: 0, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true } ]
					]
				},
				{
					isTest: true,
					instruction_it: "🎯 Riprova: individua le nicchie agli angoli opposti, deduci la posizione delle mine intrappolate e metti entrambe le bandiere 🚩 (a 0,0 e 0,3)!",
					instruction_en: "🎯 Challenge: spot both opposite corner niches, deduce the trapped mines, and flag 🚩 both corners (0,0 and 0,3)!",
					requiredAction: "flag",
					targets: [{"r":0,"c":0,"action":"flag"},{"r":0,"c":3,"action":"flag"}],
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, mine: true, val: 0, rev: false }, { r: 0, c: 1, val: 1, rev: true }, { r: 0, c: 2, val: 1, rev: true }, { r: 0, c: 3, mine: true, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, val: 1, rev: true }, { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: "final_exam",
			level: 9,
			title_it: "9. Esame Finale di Tattica",
			title_en: "9. Final Tactical Exam",
			badge_it: "Gran Maestro di Logica",
			badge_en: "Grandmaster Tactician",
			desc_it: "Metti alla prova tutte le competenze acquisite: analizza una tavola reale con molteplici pattern combinati (1-2-1, 1-1 e saturazione) e risolvila senza aiuti visivi!",
			desc_en: "Put all learned skills to the test: analyze an authentic board with combined patterns (1-2-1, 1-1 and saturation) and clear it without visual aids!",
			puzzles: [
				{
					isTest: true,
					instruction_it: "🎯 Esame Finale: analizza l'intera frontiera! A sinistra compare un 1-2-1 classico, a destra una deduzione 1-1 / saturazione. Risolvi tutti i bersagli!",
					instruction_en: "🎯 Final Exam: scan the whole frontier! Spot the 1-2-1 on the left and the 1-1 / saturation on the right. Solve all targets!",
					targets: [{"r":0,"c":0,"action":"flag"},{"r":0,"c":1,"action":"reveal"},{"r":0,"c":2,"action":"flag"},{"r":0,"c":3,"action":"reveal"},{"r":0,"c":4,"action":"reveal"},{"r":0,"c":5,"action":"flag"}],
					rows: 4,
					cols: 6,
					board: [
						[ { r: 0, c: 0, mine: true, val: 0, rev: false }, { r: 0, c: 1, val: 2, rev: false }, { r: 0, c: 2, mine: true, val: 0, rev: false }, { r: 0, c: 3, val: 1, rev: false }, { r: 0, c: 4, val: 1, rev: false }, { r: 0, c: 5, mine: true, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 2, rev: true }, { r: 1, c: 2, val: 1, rev: true }, { r: 1, c: 3, val: 1, rev: true }, { r: 1, c: 4, val: 1, rev: true }, { r: 1, c: 5, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true }, { r: 2, c: 4, val: 0, rev: true }, { r: 2, c: 5, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 0, rev: true }, { r: 3, c: 1, val: 0, rev: true }, { r: 3, c: 2, val: 0, rev: true }, { r: 3, c: 3, val: 0, rev: true }, { r: 3, c: 4, val: 0, rev: true }, { r: 3, c: 5, val: 0, rev: true } ]
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
