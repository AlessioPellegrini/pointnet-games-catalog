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
			desc_it: "Impara i comandi di base: come scavare le caselle sicure, posizionare bandiere e usare le scorciatoie rapide.",
			desc_en: "Master basic controls: how to uncover safe tiles, place flags, and use fast shortcuts.",
			puzzles: [
				{
					forcedInputMode: 'dig',
					instruction_it: "Con lo strumento '⛏️ Scava' attivo, tocca o fai clic sulla casella verde per scoprire la prima casella sicura!",
					instruction_en: "With '⛏️ Dig' active, tap or click the green highlighted tile to reveal your first safe tile!",
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
					forcedInputMode: 'dig',
					highlightFlagBtn: true,
					instruction_it: "Attiva lo strumento '🚩 Bandiera' (pulsante in basso o tasto 'F'), poi tocca la casella rossa per segnalare la mina!",
					instruction_en: "Switch to '🚩 Flag' mode (bottom button or 'F' key), then tap the red tile to flag the mine!",
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
					forcedInputMode: 'dig',
					instruction_it: "Scorciatoia rapida: mentre sei in modalità Scava ⛏️, usa il TASTO DESTRO del mouse (o pressione prolungata) sulla casella rossa per piazzare la bandiera 🚩 senza cambiare strumento!",
					instruction_en: "Quick shortcut: while in Dig ⛏️ mode, RIGHT-CLICK (or long-press) the red tile to place a flag 🚩 instantly without switching tools!",
					instruction_flag_mode_it: "Sei già in modalità Bandiera 🚩: tocca la casella rossa con un semplice clic!",
					instruction_flag_mode_en: "You are in Flag 🚩 mode: simply tap or click the red tile to flag it!",
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
			desc_it: "Se un numero tocca tante caselle coperte quante sono le sue mine residue, sono tutte mine. Se le sue mine sono già tutte trovate, le altre caselle adiacenti sono sicure al 100%.",
			desc_en: "If a clue touches as many hidden tiles as its remaining mines, they are all mines. Once all its mines are flagged, every other neighbor is 100% safe.",
			puzzles: [
				{
					instruction_it: "Il numero 1 tocca una sola casella coperta: è per forza una mina! Metti una bandiera 🚩 sulla casella rossa.",
					instruction_en: "The clue 1 touches only a single hidden tile: it must be a mine! Place a flag 🚩 on the red tile.",
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
					instruction_it: "Il numero 1 ha già la sua bandiera: le altre caselle attorno sono tutte sicure! Scava ⛏️ le due caselle verdi.",
					instruction_en: "The clue 1 already has its flag: its other neighbors are completely safe! Dig ⛏️ both green tiles.",
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
					instruction_it: "🎯 Riprova: individua i numeri 1 che toccano una sola casella coperta e metti la bandiera 🚩 su entrambe le mine!",
					instruction_en: "🎯 Challenge: spot the clues touching only one hidden tile and place flags 🚩 on both mines!",
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
					instruction_it: "Il 2 centrale tocca già due bandiere: tocca il numero 2 per eseguire il chording e aprire tutte le caselle sicure attorno ad esso!",
					instruction_en: "The central 2 already touches two flags: tap the number 2 to chord and reveal all surrounding safe tiles at once!",
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
					instruction_it: "🎯 Riprova: trova il numero che ha già tutte le bandiere necessarie attorno a sé e toccalo per fare chording!",
					instruction_en: "🎯 Challenge: find the number whose required flags are already set and tap it to chord!",
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
			desc_it: "Lungo un bordo, se due 1 consecutivi condividono due caselle, la mina è per forza tra quelle due. La terza casella toccata solo dal secondo 1 è GARANTITA SICURA!",
			desc_en: "Along an edge, two consecutive 1s share their single mine. The third tile touched only by the second 1 is GUARANTEED SAFE!",
			puzzles: [
				{
					instruction_it: "I due 1 evidenziati condividono la mina tra le prime due caselle: la terza casella oltre l'1 è garantita libera! Scava ⛏️ la casella verde.",
					instruction_en: "The highlighted 1s share their single mine between the first two tiles: the third tile is guaranteed safe! Dig ⛏️ the green tile.",
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
					instruction_it: "🎯 Riprova: osserva la coppia 1-1 lungo la parete, individua la casella sicura che sporge oltre il secondo 1 e scavala ⛏️!",
					instruction_en: "🎯 Challenge: spot the 1-1 pair along the wall, locate the safe tile sticking out past the second 1, and dig ⛏️ it!",
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
			title_it: "4. Pattern Fondamentale 1-2 (Mina Esterna)",
			title_en: "4. Core 1-2 Pattern (Outer Mine)",
			badge_it: "La Mina Esterna",
			badge_en: "The Outer Mine",
			desc_it: "In una coppia 1-2 lungo un bordo, l'1 può toccare al massimo 1 mina nelle celle condivise: la seconda mina del 2 deve trovarsi per forza nella casella esterna!",
			desc_en: "In a 1-2 pair along an edge, the 1 confines 1 mine to the shared tiles: the 2's second mine must be on the outer tile!",
			puzzles: [
				{
					instruction_it: "Guarda la coppia 1-2 evidenziata: l'1 prende solo 1 mina nelle prime due caselle, quindi la seconda mina del 2 è quella che sporge all'esterno! Metti la bandiera 🚩 sulla casella rossa.",
					instruction_en: "Look at the highlighted 1-2 pair: the 1 takes 1 mine in the shared tiles, so the 2's second mine is forced onto the outer tile! Flag 🚩 the red tile.",
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
					instruction_it: "Ora che la mina esterna è contrassegnata, il 2 ha bisogno di una sola altra mina nelle celle condivise: metti la bandiera 🚩 sulle due mine del 2!",
					instruction_en: "Now that the outer mine is spotted, complete the 2's requirements: place flags 🚩 on both mines of the 2!",
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
					instruction_it: "🎯 Riprova: individua la coppia 1-2 lungo il bordo, trova la mina che sporge oltre il 2 e piazzale una bandiera 🚩!",
					instruction_en: "🎯 Challenge: spot the 1-2 pair along the edge, find the mine sticking out past the 2, and flag 🚩 it!",
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
			desc_it: "La regola d'oro del pattern 1-2-1 su parete: le due estremità sono sempre MINE (🚩), mentre il centro è sempre SICURO (⛏️)!",
			desc_en: "The golden rule for 1-2-1 along a wall: outer ends are always MINES (🚩), while the center is always SAFE (⛏️)!",
			puzzles: [
				{
					instruction_it: "Regola del pattern 1-2-1: la casella centrale davanti al 2 è sempre garantita sicura! Scava ⛏️ la casella verde al centro.",
					instruction_en: "1-2-1 rule: the middle tile facing the 2 is always guaranteed safe! Dig ⛏️ the green central tile.",
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
					instruction_it: "Regola del pattern 1-2-1: le caselle davanti ai due 1 sono sempre mine! Metti la bandiera 🚩 sulle due caselle rosse ai lati.",
					instruction_en: "1-2-1 rule: the tiles facing the two 1s are always mines! Flag 🚩 both red outer tiles.",
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
					instruction_it: "🎯 Riprova: individua la sequenza 1-2-1! Ricorda: scava ⛏️ al centro e metti la bandiera 🚩 sui due lati.",
					instruction_en: "🎯 Challenge: spot the 1-2-1 sequence! Remember: dig ⛏️ the middle and flag 🚩 both outer ends.",
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
			desc_en: "In a 1-2-2-1 sequence along a wall, mines are directly in front of the two 2s. The tiles facing the two 1s are ALWAYS 100% SAFE!",
			puzzles: [
				{
					instruction_it: "Regola del pattern 1-2-2-1: le caselle davanti agli 1 sono sempre libere! Scava ⛏️ le due caselle verdi alle estremità esterne.",
					instruction_en: "1-2-2-1 rule: the tiles facing both 1s are always safe! Dig ⛏️ both green outer tiles.",
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
					instruction_it: "Regola del pattern 1-2-2-1: le mine sono esattamente davanti ai due numeri 2! Metti la bandiera 🚩 sulle due caselle rosse centrali.",
					instruction_en: "1-2-2-1 rule: the mines are directly in front of both 2s! Flag 🚩 both central red tiles.",
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
					instruction_it: "🎯 Riprova: individua la sequenza 1-2-2-1! Scava ⛏️ davanti agli 1 e metti le bandiere 🚩 davanti ai due numeri 2.",
					instruction_en: "🎯 Challenge: spot the 1-2-2-1 sequence! Dig ⛏️ facing the 1s and flag 🚩 facing both 2s.",
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
			title_it: "7. Riduzioni con Bandiere (1-2-2 ➔ 1-2-1)",
			title_en: "7. Flag Reductions (1-2-2 ➔ 1-2-1)",
			badge_it: "Sottrazione Visiva",
			badge_en: "Visual Reduction",
			desc_it: "Sottraendo le bandiere già piazzate, un 2 diventa 1 (2 - 1 = 1)! Così una sequenza complessa come 1-2-2 si risolve esattamente come un semplice 1-2-1.",
			desc_en: "By subtracting already placed flags, a 2 becomes a 1! Complex layouts like 1-2-2 simplify instantly into a standard 1-2-1.",
			puzzles: [
				{
					instruction_it: "La bandiera già presente sottrae 1 dal 2 vicino (2 - 1 = 1): la sequenza diventa un classico 1-2-1! Scava ⛏️ al centro (verde) e metti le bandiere 🚩 sui lati (rosso).",
					instruction_en: "The existing flag reduces the adjacent 2 to 1 (2 - 1 = 1): the sequence becomes a classic 1-2-1! Dig ⛏️ the middle (green) and flag 🚩 the sides (red).",
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
					instruction_it: "🎯 Riprova: sottrai mentalmente la bandiera già piazzata per trasformare la sequenza in un 1-2-1. Risolvi le caselle evidenziate!",
					instruction_en: "🎯 Challenge: subtract the existing flag to turn the row into a 1-2-1. Clear the safe cell and flag both mines!",
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
			title_it: "8. Angoli e Nicchie Chiuse",
			title_en: "8. Corners & Enclosed Niches",
			badge_it: "Geometria di Bordo",
			badge_en: "Border Geometry",
			desc_it: "Un numero 1 dentro una rientranza tocca una sola casella coperta nell'angolo: la mina è intrappolata lì! I numeri adiacenti sanno subito che le altre celle coperte sono sicure.",
			desc_en: "A 1 tucked inside a pocket touches only one hidden corner tile: the mine is trapped there! Adjacent clues can safely clear their remaining tiles.",
			puzzles: [
				{
					instruction_it: "La nicchia d'angolo intrappola la mina del numero 1: c'è una sola casella coperta possibile! Metti la bandiera 🚩 sulla casella rossa nell'angolo.",
					instruction_en: "The corner pocket traps the 1's mine: there is only one available covered tile! Flag 🚩 the red corner tile.",
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
					instruction_it: "🎯 Riprova: individua le due nicchie d'angolo opposte, scopri le mine intrappolate e piazza entrambe le bandiere 🚩!",
					instruction_en: "🎯 Challenge: spot both opposite corner pockets, locate the trapped mines, and place both flags 🚩!",
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
					instruction_it: "🎯 Esame Finale: analizza l'intera frontiera! A sinistra usa la regola del pattern 1-2-1, a destra usa la saturazione e l'1-1. Risolvi tutte le caselle bersaglio!",
					instruction_en: "🎯 Final Exam: scan the whole frontier! Apply the 1-2-1 rule on the left, and saturation / 1-1 on the right. Clear all targets!",
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
