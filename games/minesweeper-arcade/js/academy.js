/**
 * Minesweeper Arcade — Interactive Academy ("Impara dalle Basi")
 * Progressive step-by-step logic course with mastery validation.
 */
var MinesweeperAcademy = (function () {
	'use strict';

	var STORAGE_KEY = 'minesweeper_academy_progress';

	var LESSONS = [
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
					target: {"r": 2, "c": 4},
					rows: 9,
					cols: 9,
										board: [
						[ { r: 0, c: 0, val: 0, rev: false }, { r: 0, c: 1, val: 0, rev: false }, { r: 0, c: 2, val: 0, rev: false }, { r: 0, c: 3, val: 0, rev: false }, { r: 0, c: 4, val: 0, rev: false }, { r: 0, c: 5, val: 0, rev: false }, { r: 0, c: 6, val: 0, rev: false }, { r: 0, c: 7, val: 0, rev: false }, { r: 0, c: 8, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 0, rev: false }, { r: 1, c: 1, val: 0, rev: false }, { r: 1, c: 2, val: 0, rev: false }, { r: 1, c: 3, val: 1, rev: false }, { r: 1, c: 4, val: 1, rev: false }, { r: 1, c: 5, val: 1, rev: false }, { r: 1, c: 6, val: 0, rev: false }, { r: 1, c: 7, val: 0, rev: false }, { r: 1, c: 8, val: 0, rev: false } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 1, rev: true }, { r: 2, c: 4, mine: true, val: 0, rev: false }, { r: 2, c: 5, val: 1, rev: true }, { r: 2, c: 6, val: 0, rev: true }, { r: 2, c: 7, val: 0, rev: true }, { r: 2, c: 8, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 0, rev: true }, { r: 3, c: 1, val: 0, rev: true }, { r: 3, c: 2, val: 0, rev: true }, { r: 3, c: 3, val: 1, rev: true }, { r: 3, c: 4, val: 1, rev: true }, { r: 3, c: 5, val: 1, rev: true }, { r: 3, c: 6, val: 0, rev: true }, { r: 3, c: 7, val: 0, rev: true }, { r: 3, c: 8, val: 0, rev: true } ],
						[ { r: 4, c: 0, val: 0, rev: true }, { r: 4, c: 1, val: 0, rev: true }, { r: 4, c: 2, val: 0, rev: true }, { r: 4, c: 3, val: 0, rev: true }, { r: 4, c: 4, val: 0, rev: true }, { r: 4, c: 5, val: 0, rev: true }, { r: 4, c: 6, val: 0, rev: true }, { r: 4, c: 7, val: 0, rev: true }, { r: 4, c: 8, val: 0, rev: true } ],
						[ { r: 5, c: 0, val: 0, rev: true }, { r: 5, c: 1, val: 1, rev: true }, { r: 5, c: 2, val: 2, rev: true }, { r: 5, c: 3, val: 2, rev: true }, { r: 5, c: 4, val: 1, rev: true }, { r: 5, c: 5, val: 0, rev: true }, { r: 5, c: 6, val: 0, rev: true }, { r: 5, c: 7, val: 0, rev: true }, { r: 5, c: 8, val: 0, rev: true } ],
						[ { r: 6, c: 0, val: 0, rev: true }, { r: 6, c: 1, val: 1, rev: true }, { r: 6, c: 2, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 3, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 4, val: 1, rev: true }, { r: 6, c: 5, val: 0, rev: true }, { r: 6, c: 6, val: 1, rev: true }, { r: 6, c: 7, val: 1, rev: true }, { r: 6, c: 8, val: 1, rev: true } ],
						[ { r: 7, c: 0, val: 0, rev: true }, { r: 7, c: 1, val: 1, rev: true }, { r: 7, c: 2, val: 2, rev: true }, { r: 7, c: 3, val: 2, rev: true }, { r: 7, c: 4, val: 1, rev: true }, { r: 7, c: 5, val: 0, rev: true }, { r: 7, c: 6, val: 1, rev: true }, { r: 7, c: 7, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 8, val: 1, rev: true } ],
						[ { r: 8, c: 0, val: 0, rev: true }, { r: 8, c: 1, val: 0, rev: true }, { r: 8, c: 2, val: 0, rev: true }, { r: 8, c: 3, val: 0, rev: true }, { r: 8, c: 4, val: 0, rev: true }, { r: 8, c: 5, val: 0, rev: true }, { r: 8, c: 6, val: 1, rev: true }, { r: 8, c: 7, val: 1, rev: true }, { r: 8, c: 8, val: 1, rev: true } ]
					]
				},
				{
					instruction_it: "Il numero 1 ha già la sua mina contrassegnata con una bandiera. Tutte le altre sue caselle sono libere: scava ⛏️ una casella sicura adiacente!",
					instruction_en: "The clue 1 already has its mine flagged. All other neighbors are safe: dig ⛏️ an adjacent safe tile!",
					requiredAction: "reveal",
					patternCells: [{"r": 2, "c": 3}, {"r": 2, "c": 5}],
					target: {"r": 1, "c": 3},
					alternateTarget: {"r": 1, "c": 5},
					rows: 9,
					cols: 9,
										board: [
						[ { r: 0, c: 0, val: 0, rev: false }, { r: 0, c: 1, val: 0, rev: false }, { r: 0, c: 2, val: 0, rev: false }, { r: 0, c: 3, val: 0, rev: false }, { r: 0, c: 4, val: 0, rev: false }, { r: 0, c: 5, val: 0, rev: false }, { r: 0, c: 6, val: 0, rev: false }, { r: 0, c: 7, val: 0, rev: false }, { r: 0, c: 8, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 0, rev: false }, { r: 1, c: 1, val: 0, rev: false }, { r: 1, c: 2, val: 0, rev: false }, { r: 1, c: 3, val: 1, rev: false }, { r: 1, c: 4, val: 1, rev: false }, { r: 1, c: 5, val: 1, rev: false }, { r: 1, c: 6, val: 0, rev: false }, { r: 1, c: 7, val: 0, rev: false }, { r: 1, c: 8, val: 0, rev: false } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 1, rev: true }, { r: 2, c: 4, mine: true, val: 0, rev: false, flag: true }, { r: 2, c: 5, val: 1, rev: true }, { r: 2, c: 6, val: 0, rev: true }, { r: 2, c: 7, val: 0, rev: true }, { r: 2, c: 8, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 0, rev: true }, { r: 3, c: 1, val: 0, rev: true }, { r: 3, c: 2, val: 0, rev: true }, { r: 3, c: 3, val: 1, rev: true }, { r: 3, c: 4, val: 1, rev: true }, { r: 3, c: 5, val: 1, rev: true }, { r: 3, c: 6, val: 0, rev: true }, { r: 3, c: 7, val: 0, rev: true }, { r: 3, c: 8, val: 0, rev: true } ],
						[ { r: 4, c: 0, val: 0, rev: true }, { r: 4, c: 1, val: 0, rev: true }, { r: 4, c: 2, val: 0, rev: true }, { r: 4, c: 3, val: 0, rev: true }, { r: 4, c: 4, val: 0, rev: true }, { r: 4, c: 5, val: 0, rev: true }, { r: 4, c: 6, val: 0, rev: true }, { r: 4, c: 7, val: 0, rev: true }, { r: 4, c: 8, val: 0, rev: true } ],
						[ { r: 5, c: 0, val: 0, rev: true }, { r: 5, c: 1, val: 1, rev: true }, { r: 5, c: 2, val: 2, rev: true }, { r: 5, c: 3, val: 2, rev: true }, { r: 5, c: 4, val: 1, rev: true }, { r: 5, c: 5, val: 0, rev: true }, { r: 5, c: 6, val: 0, rev: true }, { r: 5, c: 7, val: 0, rev: true }, { r: 5, c: 8, val: 0, rev: true } ],
						[ { r: 6, c: 0, val: 0, rev: true }, { r: 6, c: 1, val: 1, rev: true }, { r: 6, c: 2, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 3, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 4, val: 1, rev: true }, { r: 6, c: 5, val: 0, rev: true }, { r: 6, c: 6, val: 1, rev: true }, { r: 6, c: 7, val: 1, rev: true }, { r: 6, c: 8, val: 1, rev: true } ],
						[ { r: 7, c: 0, val: 0, rev: true }, { r: 7, c: 1, val: 1, rev: true }, { r: 7, c: 2, val: 2, rev: true }, { r: 7, c: 3, val: 2, rev: true }, { r: 7, c: 4, val: 1, rev: true }, { r: 7, c: 5, val: 0, rev: true }, { r: 7, c: 6, val: 1, rev: true }, { r: 7, c: 7, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 8, val: 1, rev: true } ],
						[ { r: 8, c: 0, val: 0, rev: true }, { r: 8, c: 1, val: 0, rev: true }, { r: 8, c: 2, val: 0, rev: true }, { r: 8, c: 3, val: 0, rev: true }, { r: 8, c: 4, val: 0, rev: true }, { r: 8, c: 5, val: 0, rev: true }, { r: 8, c: 6, val: 1, rev: true }, { r: 8, c: 7, val: 1, rev: true }, { r: 8, c: 8, val: 1, rev: true } ]
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
					instruction_it: "Tocca il numero 2 cerchiato (2,4) con le sue due bandiere già posizionate per eseguire il chording ed aprire le caselle libere vicine!",
					instruction_en: "Tap the circled number 2 at (2,4) with both flags placed to chord and reveal all adjacent safe tiles!",
					requiredAction: "chord",
					target: {"r": 2, "c": 4},
					rows: 9,
					cols: 9,
										board: [
						[ { r: 0, c: 0, val: 0, rev: false }, { r: 0, c: 1, val: 0, rev: false }, { r: 0, c: 2, val: 0, rev: false }, { r: 0, c: 3, val: 0, rev: false }, { r: 0, c: 4, val: 0, rev: false }, { r: 0, c: 5, val: 0, rev: false }, { r: 0, c: 6, val: 0, rev: false }, { r: 0, c: 7, val: 0, rev: false }, { r: 0, c: 8, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 0, rev: false }, { r: 1, c: 1, val: 0, rev: false }, { r: 1, c: 2, val: 1, rev: false }, { r: 1, c: 3, val: 1, rev: false }, { r: 1, c: 4, val: 2, rev: false }, { r: 1, c: 5, val: 1, rev: false }, { r: 1, c: 6, val: 1, rev: false }, { r: 1, c: 7, val: 0, rev: false }, { r: 1, c: 8, val: 0, rev: false } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 1, rev: true }, { r: 2, c: 3, mine: true, val: 0, rev: false, flag: true }, { r: 2, c: 4, val: 2, rev: true }, { r: 2, c: 5, mine: true, val: 0, rev: false, flag: true }, { r: 2, c: 6, val: 1, rev: true }, { r: 2, c: 7, val: 0, rev: true }, { r: 2, c: 8, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 0, rev: true }, { r: 3, c: 1, val: 0, rev: true }, { r: 3, c: 2, val: 1, rev: true }, { r: 3, c: 3, val: 1, rev: true }, { r: 3, c: 4, val: 2, rev: true }, { r: 3, c: 5, val: 1, rev: true }, { r: 3, c: 6, val: 1, rev: true }, { r: 3, c: 7, val: 0, rev: true }, { r: 3, c: 8, val: 0, rev: true } ],
						[ { r: 4, c: 0, val: 0, rev: true }, { r: 4, c: 1, val: 0, rev: true }, { r: 4, c: 2, val: 0, rev: true }, { r: 4, c: 3, val: 0, rev: true }, { r: 4, c: 4, val: 0, rev: true }, { r: 4, c: 5, val: 0, rev: true }, { r: 4, c: 6, val: 0, rev: true }, { r: 4, c: 7, val: 0, rev: true }, { r: 4, c: 8, val: 0, rev: true } ],
						[ { r: 5, c: 0, val: 1, rev: true }, { r: 5, c: 1, val: 2, rev: true }, { r: 5, c: 2, val: 2, rev: true }, { r: 5, c: 3, val: 1, rev: true }, { r: 5, c: 4, val: 0, rev: true }, { r: 5, c: 5, val: 0, rev: true }, { r: 5, c: 6, val: 0, rev: true }, { r: 5, c: 7, val: 0, rev: true }, { r: 5, c: 8, val: 0, rev: true } ],
						[ { r: 6, c: 0, val: 1, rev: true }, { r: 6, c: 1, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 2, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 3, val: 1, rev: true }, { r: 6, c: 4, val: 0, rev: true }, { r: 6, c: 5, val: 0, rev: true }, { r: 6, c: 6, val: 1, rev: true }, { r: 6, c: 7, val: 1, rev: true }, { r: 6, c: 8, val: 1, rev: true } ],
						[ { r: 7, c: 0, val: 1, rev: true }, { r: 7, c: 1, val: 2, rev: true }, { r: 7, c: 2, val: 2, rev: true }, { r: 7, c: 3, val: 1, rev: true }, { r: 7, c: 4, val: 0, rev: true }, { r: 7, c: 5, val: 0, rev: true }, { r: 7, c: 6, val: 1, rev: true }, { r: 7, c: 7, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 8, val: 1, rev: true } ],
						[ { r: 8, c: 0, val: 0, rev: true }, { r: 8, c: 1, val: 0, rev: true }, { r: 8, c: 2, val: 0, rev: true }, { r: 8, c: 3, val: 0, rev: true }, { r: 8, c: 4, val: 0, rev: true }, { r: 8, c: 5, val: 0, rev: true }, { r: 8, c: 6, val: 1, rev: true }, { r: 8, c: 7, val: 1, rev: true }, { r: 8, c: 8, val: 1, rev: true } ]
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
					instruction_it: "Lungo la parete sinistra, il primo 1 a (3,0) confina la mina in (2,0) o (2,1). Il secondo 1 a (3,1) garantisce che la terza casella (2,2) è LIBERA! Scava ⛏️ la casella sicura (2,2)!",
					instruction_en: "Along the left wall, the first 1 at (3,0) confines the mine to (2,0) or (2,1). The second 1 at (3,1) guarantees the third tile (2,2) is SAFE! Dig ⛏️ tile (2,2)!",
					requiredAction: "reveal",
					target: {"r": 2, "c": 2},
					rows: 9,
					cols: 9,
										board: [
						[ { r: 0, c: 0, val: 0, rev: false }, { r: 0, c: 1, val: 0, rev: false }, { r: 0, c: 2, val: 0, rev: false }, { r: 0, c: 3, val: 0, rev: false }, { r: 0, c: 4, val: 0, rev: false }, { r: 0, c: 5, val: 0, rev: false }, { r: 0, c: 6, val: 0, rev: false }, { r: 0, c: 7, val: 0, rev: false }, { r: 0, c: 8, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: false }, { r: 1, c: 1, val: 1, rev: false }, { r: 1, c: 2, val: 0, rev: false }, { r: 1, c: 3, val: 0, rev: false }, { r: 1, c: 4, val: 0, rev: false }, { r: 1, c: 5, val: 0, rev: false }, { r: 1, c: 6, val: 0, rev: false }, { r: 1, c: 7, val: 0, rev: false }, { r: 1, c: 8, val: 0, rev: false } ],
						[ { r: 2, c: 0, mine: true, val: 0, rev: false }, { r: 2, c: 1, val: 1, rev: false }, { r: 2, c: 2, val: 0, rev: false }, { r: 2, c: 3, val: 0, rev: true }, { r: 2, c: 4, val: 0, rev: true }, { r: 2, c: 5, val: 0, rev: true }, { r: 2, c: 6, val: 0, rev: true }, { r: 2, c: 7, val: 0, rev: true }, { r: 2, c: 8, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 1, rev: true }, { r: 3, c: 1, val: 1, rev: true }, { r: 3, c: 2, val: 0, rev: true }, { r: 3, c: 3, val: 0, rev: true }, { r: 3, c: 4, val: 0, rev: true }, { r: 3, c: 5, val: 0, rev: true }, { r: 3, c: 6, val: 0, rev: true }, { r: 3, c: 7, val: 0, rev: true }, { r: 3, c: 8, val: 0, rev: true } ],
						[ { r: 4, c: 0, val: 0, rev: true }, { r: 4, c: 1, val: 0, rev: true }, { r: 4, c: 2, val: 0, rev: true }, { r: 4, c: 3, val: 0, rev: true }, { r: 4, c: 4, val: 1, rev: true }, { r: 4, c: 5, val: 1, rev: true }, { r: 4, c: 6, val: 1, rev: true }, { r: 4, c: 7, val: 0, rev: true }, { r: 4, c: 8, val: 0, rev: true } ],
						[ { r: 5, c: 0, val: 0, rev: true }, { r: 5, c: 1, val: 0, rev: true }, { r: 5, c: 2, val: 0, rev: true }, { r: 5, c: 3, val: 0, rev: true }, { r: 5, c: 4, val: 2, rev: true }, { r: 5, c: 5, mine: true, val: 0, rev: true, flag: true }, { r: 5, c: 6, val: 2, rev: true }, { r: 5, c: 7, val: 0, rev: true }, { r: 5, c: 8, val: 0, rev: true } ],
						[ { r: 6, c: 0, val: 1, rev: true }, { r: 6, c: 1, val: 1, rev: true }, { r: 6, c: 2, val: 1, rev: true }, { r: 6, c: 3, val: 0, rev: true }, { r: 6, c: 4, val: 2, rev: true }, { r: 6, c: 5, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 6, val: 2, rev: true }, { r: 6, c: 7, val: 0, rev: true }, { r: 6, c: 8, val: 0, rev: true } ],
						[ { r: 7, c: 0, val: 1, rev: true }, { r: 7, c: 1, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 2, val: 1, rev: true }, { r: 7, c: 3, val: 0, rev: true }, { r: 7, c: 4, val: 1, rev: true }, { r: 7, c: 5, val: 1, rev: true }, { r: 7, c: 6, val: 1, rev: true }, { r: 7, c: 7, val: 0, rev: true }, { r: 7, c: 8, val: 0, rev: true } ],
						[ { r: 8, c: 0, val: 1, rev: true }, { r: 8, c: 1, val: 1, rev: true }, { r: 8, c: 2, val: 1, rev: true }, { r: 8, c: 3, val: 0, rev: true }, { r: 8, c: 4, val: 0, rev: true }, { r: 8, c: 5, val: 0, rev: true }, { r: 8, c: 6, val: 0, rev: true }, { r: 8, c: 7, val: 0, rev: true }, { r: 8, c: 8, val: 0, rev: true } ]
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
					instruction_it: "L'1 a (3,0) limita 1 mina a (2,0) e (2,1). Il 2 a (3,1) tocca anche la casella (2,2): la mina esterna è a (2,2)! Metti la bandiera 🚩 su (2,2)!",
					instruction_en: "The 1 at (3,0) confines 1 mine to (2,0) and (2,1). The 2 at (3,1) also touches (2,2): the outer mine is at (2,2)! Flag 🚩 (2,2)!",
					requiredAction: "flag",
					target: {"r": 2, "c": 2},
					rows: 9,
					cols: 9,
										board: [
						[ { r: 0, c: 0, val: 0, rev: false }, { r: 0, c: 1, val: 0, rev: false }, { r: 0, c: 2, val: 0, rev: false }, { r: 0, c: 3, val: 0, rev: false }, { r: 0, c: 4, val: 0, rev: false }, { r: 0, c: 5, val: 0, rev: false }, { r: 0, c: 6, val: 0, rev: false }, { r: 0, c: 7, val: 0, rev: false }, { r: 0, c: 8, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: false }, { r: 1, c: 1, val: 2, rev: false }, { r: 1, c: 2, val: 2, rev: false }, { r: 1, c: 3, val: 1, rev: false }, { r: 1, c: 4, val: 0, rev: false }, { r: 1, c: 5, val: 0, rev: false }, { r: 1, c: 6, val: 0, rev: false }, { r: 1, c: 7, val: 0, rev: false }, { r: 1, c: 8, val: 0, rev: false } ],
						[ { r: 2, c: 0, val: 1, rev: false }, { r: 2, c: 1, mine: true, val: 0, rev: false }, { r: 2, c: 2, mine: true, val: 0, rev: false }, { r: 2, c: 3, val: 1, rev: false }, { r: 2, c: 4, val: 0, rev: true }, { r: 2, c: 5, val: 0, rev: true }, { r: 2, c: 6, val: 0, rev: true }, { r: 2, c: 7, val: 0, rev: true }, { r: 2, c: 8, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 1, rev: true }, { r: 3, c: 1, val: 2, rev: true }, { r: 3, c: 2, val: 2, rev: true }, { r: 3, c: 3, val: 1, rev: true }, { r: 3, c: 4, val: 0, rev: true }, { r: 3, c: 5, val: 0, rev: true }, { r: 3, c: 6, val: 0, rev: true }, { r: 3, c: 7, val: 0, rev: true }, { r: 3, c: 8, val: 0, rev: true } ],
						[ { r: 4, c: 0, val: 0, rev: true }, { r: 4, c: 1, val: 0, rev: true }, { r: 4, c: 2, val: 0, rev: true }, { r: 4, c: 3, val: 0, rev: true }, { r: 4, c: 4, val: 0, rev: true }, { r: 4, c: 5, val: 1, rev: true }, { r: 4, c: 6, val: 1, rev: true }, { r: 4, c: 7, val: 1, rev: true }, { r: 4, c: 8, val: 0, rev: true } ],
						[ { r: 5, c: 0, val: 0, rev: true }, { r: 5, c: 1, val: 0, rev: true }, { r: 5, c: 2, val: 0, rev: true }, { r: 5, c: 3, val: 0, rev: true }, { r: 5, c: 4, val: 0, rev: true }, { r: 5, c: 5, val: 2, rev: true }, { r: 5, c: 6, mine: true, val: 0, rev: true, flag: true }, { r: 5, c: 7, val: 2, rev: true }, { r: 5, c: 8, val: 0, rev: true } ],
						[ { r: 6, c: 0, val: 0, rev: true }, { r: 6, c: 1, val: 1, rev: true }, { r: 6, c: 2, val: 1, rev: true }, { r: 6, c: 3, val: 1, rev: true }, { r: 6, c: 4, val: 0, rev: true }, { r: 6, c: 5, val: 2, rev: true }, { r: 6, c: 6, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 7, val: 2, rev: true }, { r: 6, c: 8, val: 0, rev: true } ],
						[ { r: 7, c: 0, val: 0, rev: true }, { r: 7, c: 1, val: 1, rev: true }, { r: 7, c: 2, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 3, val: 1, rev: true }, { r: 7, c: 4, val: 0, rev: true }, { r: 7, c: 5, val: 1, rev: true }, { r: 7, c: 6, val: 1, rev: true }, { r: 7, c: 7, val: 1, rev: true }, { r: 7, c: 8, val: 0, rev: true } ],
						[ { r: 8, c: 0, val: 0, rev: true }, { r: 8, c: 1, val: 1, rev: true }, { r: 8, c: 2, val: 1, rev: true }, { r: 8, c: 3, val: 1, rev: true }, { r: 8, c: 4, val: 0, rev: true }, { r: 8, c: 5, val: 0, rev: true }, { r: 8, c: 6, val: 0, rev: true }, { r: 8, c: 7, val: 0, rev: true }, { r: 8, c: 8, val: 0, rev: true } ]
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
					instruction_it: "Pattern 1-2-1 su parete: la casella centrale (2,2) davanti al 2 è sempre garantita libera! Scava ⛏️ la casella centrale (2,2).",
					instruction_en: "1-2-1 wall pattern: the central tile (2,2) facing the 2 is always guaranteed safe! Dig ⛏️ the middle safe tile (2,2).",
					requiredAction: "reveal",
					target: {"r": 2, "c": 2},
					rows: 9,
					cols: 9,
										board: [
						[ { r: 0, c: 0, val: 0, rev: false }, { r: 0, c: 1, val: 0, rev: false }, { r: 0, c: 2, val: 0, rev: false }, { r: 0, c: 3, val: 0, rev: false }, { r: 0, c: 4, val: 0, rev: false }, { r: 0, c: 5, val: 0, rev: false }, { r: 0, c: 6, val: 0, rev: false }, { r: 0, c: 7, val: 0, rev: false }, { r: 0, c: 8, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: false }, { r: 1, c: 1, val: 1, rev: false }, { r: 1, c: 2, val: 2, rev: false }, { r: 1, c: 3, val: 1, rev: false }, { r: 1, c: 4, val: 1, rev: false }, { r: 1, c: 5, val: 0, rev: false }, { r: 1, c: 6, val: 0, rev: false }, { r: 1, c: 7, val: 0, rev: false }, { r: 1, c: 8, val: 0, rev: false } ],
						[ { r: 2, c: 0, val: 1, rev: false }, { r: 2, c: 1, mine: true, val: 0, rev: false }, { r: 2, c: 2, val: 2, rev: false }, { r: 2, c: 3, mine: true, val: 0, rev: false }, { r: 2, c: 4, val: 1, rev: false }, { r: 2, c: 5, val: 0, rev: true }, { r: 2, c: 6, val: 0, rev: true }, { r: 2, c: 7, val: 0, rev: true }, { r: 2, c: 8, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 1, rev: true }, { r: 3, c: 1, val: 1, rev: true }, { r: 3, c: 2, val: 2, rev: true }, { r: 3, c: 3, val: 1, rev: true }, { r: 3, c: 4, val: 1, rev: true }, { r: 3, c: 5, val: 0, rev: true }, { r: 3, c: 6, val: 0, rev: true }, { r: 3, c: 7, val: 0, rev: true }, { r: 3, c: 8, val: 0, rev: true } ],
						[ { r: 4, c: 0, val: 0, rev: true }, { r: 4, c: 1, val: 0, rev: true }, { r: 4, c: 2, val: 0, rev: true }, { r: 4, c: 3, val: 0, rev: true }, { r: 4, c: 4, val: 0, rev: true }, { r: 4, c: 5, val: 1, rev: true }, { r: 4, c: 6, val: 1, rev: true }, { r: 4, c: 7, val: 1, rev: true }, { r: 4, c: 8, val: 0, rev: true } ],
						[ { r: 5, c: 0, val: 0, rev: true }, { r: 5, c: 1, val: 0, rev: true }, { r: 5, c: 2, val: 0, rev: true }, { r: 5, c: 3, val: 0, rev: true }, { r: 5, c: 4, val: 0, rev: true }, { r: 5, c: 5, val: 2, rev: true }, { r: 5, c: 6, mine: true, val: 0, rev: true, flag: true }, { r: 5, c: 7, val: 2, rev: true }, { r: 5, c: 8, val: 0, rev: true } ],
						[ { r: 6, c: 0, val: 1, rev: true }, { r: 6, c: 1, val: 1, rev: true }, { r: 6, c: 2, val: 1, rev: true }, { r: 6, c: 3, val: 0, rev: true }, { r: 6, c: 4, val: 0, rev: true }, { r: 6, c: 5, val: 2, rev: true }, { r: 6, c: 6, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 7, val: 2, rev: true }, { r: 6, c: 8, val: 0, rev: true } ],
						[ { r: 7, c: 0, val: 1, rev: true }, { r: 7, c: 1, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 2, val: 1, rev: true }, { r: 7, c: 3, val: 0, rev: true }, { r: 7, c: 4, val: 0, rev: true }, { r: 7, c: 5, val: 1, rev: true }, { r: 7, c: 6, val: 1, rev: true }, { r: 7, c: 7, val: 1, rev: true }, { r: 7, c: 8, val: 0, rev: true } ],
						[ { r: 8, c: 0, val: 1, rev: true }, { r: 8, c: 1, val: 1, rev: true }, { r: 8, c: 2, val: 1, rev: true }, { r: 8, c: 3, val: 0, rev: true }, { r: 8, c: 4, val: 0, rev: true }, { r: 8, c: 5, val: 0, rev: true }, { r: 8, c: 6, val: 0, rev: true }, { r: 8, c: 7, val: 0, rev: true }, { r: 8, c: 8, val: 0, rev: true } ]
					]
				},
				{
					instruction_it: "Pattern 1-2-1 su parete: le caselle davanti ai due 1 sono sempre mine! Metti la bandiera 🚩 su una delle due mine esterne.",
					instruction_en: "1-2-1 wall pattern: the tiles facing the two 1s are always mines! Flag 🚩 one of the two outer mines.",
					requiredAction: "flag",
					target: {"r": 2, "c": 1},
					alternateTarget: {"r": 2, "c": 3},
					rows: 9,
					cols: 9,
										board: [
						[ { r: 0, c: 0, val: 0, rev: false }, { r: 0, c: 1, val: 0, rev: false }, { r: 0, c: 2, val: 0, rev: false }, { r: 0, c: 3, val: 0, rev: false }, { r: 0, c: 4, val: 0, rev: false }, { r: 0, c: 5, val: 0, rev: false }, { r: 0, c: 6, val: 0, rev: false }, { r: 0, c: 7, val: 0, rev: false }, { r: 0, c: 8, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: false }, { r: 1, c: 1, val: 1, rev: false }, { r: 1, c: 2, val: 2, rev: false }, { r: 1, c: 3, val: 1, rev: false }, { r: 1, c: 4, val: 1, rev: false }, { r: 1, c: 5, val: 0, rev: false }, { r: 1, c: 6, val: 0, rev: false }, { r: 1, c: 7, val: 0, rev: false }, { r: 1, c: 8, val: 0, rev: false } ],
						[ { r: 2, c: 0, val: 1, rev: false }, { r: 2, c: 1, mine: true, val: 0, rev: false }, { r: 2, c: 2, val: 2, rev: true }, { r: 2, c: 3, mine: true, val: 0, rev: false }, { r: 2, c: 4, val: 1, rev: false }, { r: 2, c: 5, val: 0, rev: true }, { r: 2, c: 6, val: 0, rev: true }, { r: 2, c: 7, val: 0, rev: true }, { r: 2, c: 8, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 1, rev: true }, { r: 3, c: 1, val: 1, rev: true }, { r: 3, c: 2, val: 2, rev: true }, { r: 3, c: 3, val: 1, rev: true }, { r: 3, c: 4, val: 1, rev: true }, { r: 3, c: 5, val: 0, rev: true }, { r: 3, c: 6, val: 0, rev: true }, { r: 3, c: 7, val: 0, rev: true }, { r: 3, c: 8, val: 0, rev: true } ],
						[ { r: 4, c: 0, val: 0, rev: true }, { r: 4, c: 1, val: 0, rev: true }, { r: 4, c: 2, val: 0, rev: true }, { r: 4, c: 3, val: 0, rev: true }, { r: 4, c: 4, val: 0, rev: true }, { r: 4, c: 5, val: 1, rev: true }, { r: 4, c: 6, val: 1, rev: true }, { r: 4, c: 7, val: 1, rev: true }, { r: 4, c: 8, val: 0, rev: true } ],
						[ { r: 5, c: 0, val: 0, rev: true }, { r: 5, c: 1, val: 0, rev: true }, { r: 5, c: 2, val: 0, rev: true }, { r: 5, c: 3, val: 0, rev: true }, { r: 5, c: 4, val: 0, rev: true }, { r: 5, c: 5, val: 2, rev: true }, { r: 5, c: 6, mine: true, val: 0, rev: true, flag: true }, { r: 5, c: 7, val: 2, rev: true }, { r: 5, c: 8, val: 0, rev: true } ],
						[ { r: 6, c: 0, val: 1, rev: true }, { r: 6, c: 1, val: 1, rev: true }, { r: 6, c: 2, val: 1, rev: true }, { r: 6, c: 3, val: 0, rev: true }, { r: 6, c: 4, val: 0, rev: true }, { r: 6, c: 5, val: 2, rev: true }, { r: 6, c: 6, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 7, val: 2, rev: true }, { r: 6, c: 8, val: 0, rev: true } ],
						[ { r: 7, c: 0, val: 1, rev: true }, { r: 7, c: 1, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 2, val: 1, rev: true }, { r: 7, c: 3, val: 0, rev: true }, { r: 7, c: 4, val: 0, rev: true }, { r: 7, c: 5, val: 1, rev: true }, { r: 7, c: 6, val: 1, rev: true }, { r: 7, c: 7, val: 1, rev: true }, { r: 7, c: 8, val: 0, rev: true } ],
						[ { r: 8, c: 0, val: 1, rev: true }, { r: 8, c: 1, val: 1, rev: true }, { r: 8, c: 2, val: 1, rev: true }, { r: 8, c: 3, val: 0, rev: true }, { r: 8, c: 4, val: 0, rev: true }, { r: 8, c: 5, val: 0, rev: true }, { r: 8, c: 6, val: 0, rev: true }, { r: 8, c: 7, val: 0, rev: true }, { r: 8, c: 8, val: 0, rev: true } ]
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
					instruction_it: "Pattern 1-2-2-1: scava ⛏️ una delle due caselle esterne sicure davanti agli 1 (in colonna 0 o 5)!",
					instruction_en: "1-2-2-1 Pattern: dig ⛏️ one of the outer safe tiles facing the 1s!",
					requiredAction: "reveal",
					target: {"r": 2, "c": 0},
					alternateTarget: {"r": 2, "c": 5},
					rows: 9,
					cols: 9,
										board: [
						[ { r: 0, c: 0, val: 0, rev: false }, { r: 0, c: 1, val: 0, rev: false }, { r: 0, c: 2, val: 0, rev: false }, { r: 0, c: 3, val: 0, rev: false }, { r: 0, c: 4, val: 0, rev: false }, { r: 0, c: 5, val: 0, rev: false }, { r: 0, c: 6, val: 0, rev: false }, { r: 0, c: 7, val: 0, rev: false }, { r: 0, c: 8, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 0, rev: false }, { r: 1, c: 1, val: 1, rev: false }, { r: 1, c: 2, val: 2, rev: false }, { r: 1, c: 3, val: 2, rev: false }, { r: 1, c: 4, val: 1, rev: false }, { r: 1, c: 5, val: 0, rev: false }, { r: 1, c: 6, val: 0, rev: false }, { r: 1, c: 7, val: 0, rev: false }, { r: 1, c: 8, val: 0, rev: false } ],
						[ { r: 2, c: 0, val: 0, rev: false }, { r: 2, c: 1, val: 1, rev: false }, { r: 2, c: 2, mine: true, val: 0, rev: false }, { r: 2, c: 3, mine: true, val: 0, rev: false }, { r: 2, c: 4, val: 1, rev: false }, { r: 2, c: 5, val: 0, rev: false }, { r: 2, c: 6, val: 0, rev: true }, { r: 2, c: 7, val: 0, rev: true }, { r: 2, c: 8, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 0, rev: true }, { r: 3, c: 1, val: 1, rev: true }, { r: 3, c: 2, val: 2, rev: true }, { r: 3, c: 3, val: 2, rev: true }, { r: 3, c: 4, val: 1, rev: true }, { r: 3, c: 5, val: 0, rev: true }, { r: 3, c: 6, val: 0, rev: true }, { r: 3, c: 7, val: 0, rev: true }, { r: 3, c: 8, val: 0, rev: true } ],
						[ { r: 4, c: 0, val: 0, rev: true }, { r: 4, c: 1, val: 0, rev: true }, { r: 4, c: 2, val: 0, rev: true }, { r: 4, c: 3, val: 0, rev: true }, { r: 4, c: 4, val: 0, rev: true }, { r: 4, c: 5, val: 0, rev: true }, { r: 4, c: 6, val: 1, rev: true }, { r: 4, c: 7, val: 1, rev: true }, { r: 4, c: 8, val: 1, rev: true } ],
						[ { r: 5, c: 0, val: 0, rev: true }, { r: 5, c: 1, val: 0, rev: true }, { r: 5, c: 2, val: 0, rev: true }, { r: 5, c: 3, val: 0, rev: true }, { r: 5, c: 4, val: 0, rev: true }, { r: 5, c: 5, val: 0, rev: true }, { r: 5, c: 6, val: 2, rev: true }, { r: 5, c: 7, mine: true, val: 0, rev: true, flag: true }, { r: 5, c: 8, val: 2, rev: true } ],
						[ { r: 6, c: 0, val: 1, rev: true }, { r: 6, c: 1, val: 1, rev: true }, { r: 6, c: 2, val: 1, rev: true }, { r: 6, c: 3, val: 0, rev: true }, { r: 6, c: 4, val: 0, rev: true }, { r: 6, c: 5, val: 0, rev: true }, { r: 6, c: 6, val: 2, rev: true }, { r: 6, c: 7, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 8, val: 2, rev: true } ],
						[ { r: 7, c: 0, val: 1, rev: true }, { r: 7, c: 1, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 2, val: 1, rev: true }, { r: 7, c: 3, val: 0, rev: true }, { r: 7, c: 4, val: 0, rev: true }, { r: 7, c: 5, val: 0, rev: true }, { r: 7, c: 6, val: 1, rev: true }, { r: 7, c: 7, val: 1, rev: true }, { r: 7, c: 8, val: 1, rev: true } ],
						[ { r: 8, c: 0, val: 1, rev: true }, { r: 8, c: 1, val: 1, rev: true }, { r: 8, c: 2, val: 1, rev: true }, { r: 8, c: 3, val: 0, rev: true }, { r: 8, c: 4, val: 0, rev: true }, { r: 8, c: 5, val: 0, rev: true }, { r: 8, c: 6, val: 0, rev: true }, { r: 8, c: 7, val: 0, rev: true }, { r: 8, c: 8, val: 0, rev: true } ]
					]
				},
				{
					instruction_it: "Pattern 1-2-2-1: metti la bandiera 🚩 su una mina davanti a un 2 (colonna 2 o 3)!",
					instruction_en: "1-2-2-1 Pattern: flag 🚩 a mine in front of one of the 2s!",
					requiredAction: "flag",
					target: {"r": 2, "c": 2},
					alternateTarget: {"r": 2, "c": 3},
					rows: 9,
					cols: 9,
										board: [
						[ { r: 0, c: 0, val: 0, rev: false }, { r: 0, c: 1, val: 0, rev: false }, { r: 0, c: 2, val: 0, rev: false }, { r: 0, c: 3, val: 0, rev: false }, { r: 0, c: 4, val: 0, rev: false }, { r: 0, c: 5, val: 0, rev: false }, { r: 0, c: 6, val: 0, rev: false }, { r: 0, c: 7, val: 0, rev: false }, { r: 0, c: 8, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 0, rev: false }, { r: 1, c: 1, val: 1, rev: false }, { r: 1, c: 2, val: 2, rev: false }, { r: 1, c: 3, val: 2, rev: false }, { r: 1, c: 4, val: 1, rev: false }, { r: 1, c: 5, val: 0, rev: false }, { r: 1, c: 6, val: 0, rev: false }, { r: 1, c: 7, val: 0, rev: false }, { r: 1, c: 8, val: 0, rev: false } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 1, rev: false }, { r: 2, c: 2, mine: true, val: 0, rev: false }, { r: 2, c: 3, mine: true, val: 0, rev: false }, { r: 2, c: 4, val: 1, rev: false }, { r: 2, c: 5, val: 0, rev: true }, { r: 2, c: 6, val: 0, rev: true }, { r: 2, c: 7, val: 0, rev: true }, { r: 2, c: 8, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 0, rev: true }, { r: 3, c: 1, val: 1, rev: true }, { r: 3, c: 2, val: 2, rev: true }, { r: 3, c: 3, val: 2, rev: true }, { r: 3, c: 4, val: 1, rev: true }, { r: 3, c: 5, val: 0, rev: true }, { r: 3, c: 6, val: 0, rev: true }, { r: 3, c: 7, val: 0, rev: true }, { r: 3, c: 8, val: 0, rev: true } ],
						[ { r: 4, c: 0, val: 0, rev: true }, { r: 4, c: 1, val: 0, rev: true }, { r: 4, c: 2, val: 0, rev: true }, { r: 4, c: 3, val: 0, rev: true }, { r: 4, c: 4, val: 0, rev: true }, { r: 4, c: 5, val: 0, rev: true }, { r: 4, c: 6, val: 1, rev: true }, { r: 4, c: 7, val: 1, rev: true }, { r: 4, c: 8, val: 1, rev: true } ],
						[ { r: 5, c: 0, val: 0, rev: true }, { r: 5, c: 1, val: 0, rev: true }, { r: 5, c: 2, val: 0, rev: true }, { r: 5, c: 3, val: 0, rev: true }, { r: 5, c: 4, val: 0, rev: true }, { r: 5, c: 5, val: 0, rev: true }, { r: 5, c: 6, val: 2, rev: true }, { r: 5, c: 7, mine: true, val: 0, rev: true, flag: true }, { r: 5, c: 8, val: 2, rev: true } ],
						[ { r: 6, c: 0, val: 1, rev: true }, { r: 6, c: 1, val: 1, rev: true }, { r: 6, c: 2, val: 1, rev: true }, { r: 6, c: 3, val: 0, rev: true }, { r: 6, c: 4, val: 0, rev: true }, { r: 6, c: 5, val: 0, rev: true }, { r: 6, c: 6, val: 2, rev: true }, { r: 6, c: 7, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 8, val: 2, rev: true } ],
						[ { r: 7, c: 0, val: 1, rev: true }, { r: 7, c: 1, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 2, val: 1, rev: true }, { r: 7, c: 3, val: 0, rev: true }, { r: 7, c: 4, val: 0, rev: true }, { r: 7, c: 5, val: 0, rev: true }, { r: 7, c: 6, val: 1, rev: true }, { r: 7, c: 7, val: 1, rev: true }, { r: 7, c: 8, val: 1, rev: true } ],
						[ { r: 8, c: 0, val: 1, rev: true }, { r: 8, c: 1, val: 1, rev: true }, { r: 8, c: 2, val: 1, rev: true }, { r: 8, c: 3, val: 0, rev: true }, { r: 8, c: 4, val: 0, rev: true }, { r: 8, c: 5, val: 0, rev: true }, { r: 8, c: 6, val: 0, rev: true }, { r: 8, c: 7, val: 0, rev: true }, { r: 8, c: 8, val: 0, rev: true } ]
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
					instruction_it: "La bandiera piazzata a (2,4) riduce il 2 adiacente a valore residuo 1: la terna si comporta come un classico 1-2-1! Scava ⛏️ la casella centrale libera (2,2).",
					instruction_en: "The flag placed at (2,4) reduces the adjacent 2 to 1: the trio reduces to 1-2-1! Dig ⛏️ the middle safe cell (2,2).",
					requiredAction: "reveal",
					target: {"r": 2, "c": 2},
					rows: 9,
					cols: 9,
										board: [
						[ { r: 0, c: 0, val: 0, rev: false }, { r: 0, c: 1, val: 0, rev: false }, { r: 0, c: 2, val: 0, rev: false }, { r: 0, c: 3, val: 0, rev: false }, { r: 0, c: 4, val: 0, rev: false }, { r: 0, c: 5, val: 0, rev: false }, { r: 0, c: 6, val: 0, rev: false }, { r: 0, c: 7, val: 0, rev: false }, { r: 0, c: 8, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: false }, { r: 1, c: 1, val: 1, rev: false }, { r: 1, c: 2, val: 2, rev: false }, { r: 1, c: 3, val: 2, rev: false }, { r: 1, c: 4, val: 2, rev: false }, { r: 1, c: 5, val: 1, rev: false }, { r: 1, c: 6, val: 0, rev: false }, { r: 1, c: 7, val: 0, rev: false }, { r: 1, c: 8, val: 0, rev: false } ],
						[ { r: 2, c: 0, val: 1, rev: false }, { r: 2, c: 1, mine: true, val: 0, rev: false }, { r: 2, c: 2, val: 2, rev: false }, { r: 2, c: 3, mine: true, val: 0, rev: false }, { r: 2, c: 4, mine: true, val: 0, rev: false, flag: true }, { r: 2, c: 5, val: 1, rev: false }, { r: 2, c: 6, val: 0, rev: true }, { r: 2, c: 7, val: 0, rev: true }, { r: 2, c: 8, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 1, rev: true }, { r: 3, c: 1, val: 1, rev: true }, { r: 3, c: 2, val: 2, rev: true }, { r: 3, c: 3, val: 2, rev: true }, { r: 3, c: 4, val: 2, rev: true }, { r: 3, c: 5, val: 1, rev: true }, { r: 3, c: 6, val: 0, rev: true }, { r: 3, c: 7, val: 0, rev: true }, { r: 3, c: 8, val: 0, rev: true } ],
						[ { r: 4, c: 0, val: 0, rev: true }, { r: 4, c: 1, val: 0, rev: true }, { r: 4, c: 2, val: 0, rev: true }, { r: 4, c: 3, val: 0, rev: true }, { r: 4, c: 4, val: 0, rev: true }, { r: 4, c: 5, val: 0, rev: true }, { r: 4, c: 6, val: 0, rev: true }, { r: 4, c: 7, val: 0, rev: true }, { r: 4, c: 8, val: 0, rev: true } ],
						[ { r: 5, c: 0, val: 0, rev: true }, { r: 5, c: 1, val: 0, rev: true }, { r: 5, c: 2, val: 0, rev: true }, { r: 5, c: 3, val: 0, rev: true }, { r: 5, c: 4, val: 0, rev: true }, { r: 5, c: 5, val: 1, rev: true }, { r: 5, c: 6, val: 1, rev: true }, { r: 5, c: 7, val: 1, rev: true }, { r: 5, c: 8, val: 0, rev: true } ],
						[ { r: 6, c: 0, val: 1, rev: true }, { r: 6, c: 1, val: 1, rev: true }, { r: 6, c: 2, val: 1, rev: true }, { r: 6, c: 3, val: 0, rev: true }, { r: 6, c: 4, val: 0, rev: true }, { r: 6, c: 5, val: 2, rev: true }, { r: 6, c: 6, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 7, val: 2, rev: true }, { r: 6, c: 8, val: 0, rev: true } ],
						[ { r: 7, c: 0, val: 1, rev: true }, { r: 7, c: 1, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 2, val: 1, rev: true }, { r: 7, c: 3, val: 0, rev: true }, { r: 7, c: 4, val: 0, rev: true }, { r: 7, c: 5, val: 2, rev: true }, { r: 7, c: 6, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 7, val: 2, rev: true }, { r: 7, c: 8, val: 0, rev: true } ],
						[ { r: 8, c: 0, val: 1, rev: true }, { r: 8, c: 1, val: 1, rev: true }, { r: 8, c: 2, val: 1, rev: true }, { r: 8, c: 3, val: 0, rev: true }, { r: 8, c: 4, val: 0, rev: true }, { r: 8, c: 5, val: 1, rev: true }, { r: 8, c: 6, val: 1, rev: true }, { r: 8, c: 7, val: 1, rev: true }, { r: 8, c: 8, val: 0, rev: true } ]
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
					target: {"r": 0, "c": 0},
					rows: 9,
					cols: 9,
										board: [
						[ { r: 0, c: 0, mine: true, val: 0, rev: false }, { r: 0, c: 1, val: 1, rev: true }, { r: 0, c: 2, val: 0, rev: true }, { r: 0, c: 3, val: 0, rev: true }, { r: 0, c: 4, val: 0, rev: true }, { r: 0, c: 5, val: 0, rev: true }, { r: 0, c: 6, val: 0, rev: true }, { r: 0, c: 7, val: 0, rev: true }, { r: 0, c: 8, val: 0, rev: true } ],
						[ { r: 1, c: 0, val: 1, rev: true }, { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, val: 0, rev: true }, { r: 1, c: 3, val: 0, rev: true }, { r: 1, c: 4, val: 0, rev: true }, { r: 1, c: 5, val: 0, rev: true }, { r: 1, c: 6, val: 0, rev: true }, { r: 1, c: 7, val: 0, rev: true }, { r: 1, c: 8, val: 0, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true }, { r: 2, c: 4, val: 0, rev: true }, { r: 2, c: 5, val: 0, rev: true }, { r: 2, c: 6, val: 0, rev: true }, { r: 2, c: 7, val: 0, rev: true }, { r: 2, c: 8, val: 0, rev: true } ],
						[ { r: 3, c: 0, val: 0, rev: true }, { r: 3, c: 1, val: 0, rev: true }, { r: 3, c: 2, val: 0, rev: true }, { r: 3, c: 3, val: 0, rev: true }, { r: 3, c: 4, val: 0, rev: true }, { r: 3, c: 5, val: 0, rev: true }, { r: 3, c: 6, val: 0, rev: true }, { r: 3, c: 7, val: 0, rev: true }, { r: 3, c: 8, val: 0, rev: true } ],
						[ { r: 4, c: 0, val: 0, rev: true }, { r: 4, c: 1, val: 0, rev: true }, { r: 4, c: 2, val: 0, rev: true }, { r: 4, c: 3, val: 1, rev: true }, { r: 4, c: 4, val: 1, rev: true }, { r: 4, c: 5, val: 1, rev: true }, { r: 4, c: 6, val: 0, rev: true }, { r: 4, c: 7, val: 0, rev: true }, { r: 4, c: 8, val: 0, rev: true } ],
						[ { r: 5, c: 0, val: 0, rev: true }, { r: 5, c: 1, val: 0, rev: true }, { r: 5, c: 2, val: 0, rev: true }, { r: 5, c: 3, val: 2, rev: true }, { r: 5, c: 4, mine: true, val: 0, rev: true, flag: true }, { r: 5, c: 5, val: 2, rev: true }, { r: 5, c: 6, val: 0, rev: true }, { r: 5, c: 7, val: 0, rev: true }, { r: 5, c: 8, val: 0, rev: true } ],
						[ { r: 6, c: 0, val: 1, rev: true }, { r: 6, c: 1, val: 1, rev: true }, { r: 6, c: 2, val: 1, rev: true }, { r: 6, c: 3, val: 2, rev: true }, { r: 6, c: 4, mine: true, val: 0, rev: true, flag: true }, { r: 6, c: 5, val: 2, rev: true }, { r: 6, c: 6, val: 0, rev: true }, { r: 6, c: 7, val: 0, rev: true }, { r: 6, c: 8, val: 0, rev: true } ],
						[ { r: 7, c: 0, val: 1, rev: true }, { r: 7, c: 1, mine: true, val: 0, rev: true, flag: true }, { r: 7, c: 2, val: 1, rev: true }, { r: 7, c: 3, val: 1, rev: true }, { r: 7, c: 4, val: 1, rev: true }, { r: 7, c: 5, val: 1, rev: true }, { r: 7, c: 6, val: 0, rev: true }, { r: 7, c: 7, val: 0, rev: true }, { r: 7, c: 8, val: 0, rev: true } ],
						[ { r: 8, c: 0, val: 1, rev: true }, { r: 8, c: 1, val: 1, rev: true }, { r: 8, c: 2, val: 1, rev: true }, { r: 8, c: 3, val: 0, rev: true }, { r: 8, c: 4, val: 0, rev: true }, { r: 8, c: 5, val: 0, rev: true }, { r: 8, c: 6, val: 0, rev: true }, { r: 8, c: 7, val: 0, rev: true }, { r: 8, c: 8, val: 0, rev: true } ]
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
