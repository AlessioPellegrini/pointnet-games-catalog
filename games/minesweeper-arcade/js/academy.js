/**
 * Minesweeper Arcade — Interactive Academy ("Impara dalle Basi")
 * Progressive step-by-step logic course with mastery validation.
 */
var MinesweeperAcademy = (function () {
	'use strict';

	var STORAGE_KEY = 'minesweeper_academy_progress';

	var LESSONS = [
		{
			id: 'saturation',
			level: 1,
			title_it: '1. Regola della Saturazione',
			title_en: '1. Saturation Rule',
			badge_it: 'Le Basi Fondamentali',
			badge_en: 'Fundamentals',
			desc_it: 'Se un numero tocca tante caselle coperte quante sono le sue mine residue, sono tutte mine. Se le sue mine sono già tutte trovate, le altre caselle sono sicure al 100%.',
			desc_en: 'If a number touches as many hidden tiles as its remaining mines, they are all mines. If all its mines are flagged, all other adjacent tiles are 100% safe.',
			puzzles: [
				{
					instruction_it: 'Il numero 1 tocca solo 1 casella coperta. Metti una bandiera 🚩 sulla mina!',
					instruction_en: 'The clue 1 touches only 1 hidden tile. Place a flag 🚩 on the mine!',
					requiredAction: 'flag',
					target: { r: 1, c: 2 },
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, val: 0, rev: true }, { r: 0, c: 1, val: 1, rev: true }, { r: 0, c: 2, mine: true, rev: false }, { r: 0, c: 3, val: 0, rev: true } ],
						[ { r: 1, c: 0, val: 0, rev: true }, { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, mine: true, rev: false }, { r: 1, c: 3, val: 0, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true }, { r: 2, c: 3, val: 0, rev: true } ]
					]
				},
				{
					instruction_it: 'Il numero 1 ha già la sua mina contrassegnata con una bandiera. Scava ⛏️ la casella libera!',
					instruction_en: 'The clue 1 already has its mine flagged. Dig ⛏️ the safe tile!',
					requiredAction: 'reveal',
					target: { r: 0, c: 2 },
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, val: 0, rev: true }, { r: 0, c: 1, val: 1, rev: true }, { r: 0, c: 2, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 0, rev: true }, { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, mine: true, rev: false, flag: true } ],
						[ { r: 2, c: 0, val: 0, rev: true }, { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: 'chording',
			level: 2,
			title_it: '2. L\'Arte del Chording',
			title_en: '2. The Art of Chording',
			badge_it: 'Tecnica di Gioco Rapido',
			badge_en: 'Speed Technique',
			desc_it: 'Quando le bandiere attorno a un numero scoperto equivalgono al suo valore, toccare o cliccare il numero apre simultaneamente tutte le sue caselle adiacenti sicure!',
			desc_en: 'When flagged mines around a revealed number equal its count, tapping or clicking that number instantly clears all its safe neighbors at once!',
			puzzles: [
				{
					instruction_it: 'Tocca il numero 2 cerchiato al centro per eseguire il chording ed aprire tutte le caselle libere vicine!',
					instruction_en: 'Tap the circled number 2 in the center to chord and reveal all its adjacent safe tiles!',
					requiredAction: 'chord',
					target: { r: 1, c: 1 },
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, rev: false, flag: true }, { r: 0, c: 2, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: false }, { r: 1, c: 1, val: 2, rev: true },                 { r: 1, c: 2, val: 1, rev: false } ],
						[ { r: 2, c: 0, mine: true, rev: false, flag: true }, { r: 2, c: 1, val: 1, rev: false }, { r: 2, c: 2, val: 0, rev: false } ]
					]
				}
			]
		},
		{
			id: 'pattern_11',
			level: 3,
			title_it: '3. Pattern 1-1 su Parete',
			title_en: '3. 1-1 Wall Pattern',
			badge_it: 'Deduzione a Bordo',
			badge_en: 'Border Deduction',
			desc_it: 'Lungo una parete o bordo, se due 1 consecutivi condividono due caselle, la mina è confinata tra quelle due. La terza casella toccata solo dal secondo 1 è GARANTITA SICURA!',
			desc_en: 'Along a wall or boundary, if two consecutive 1s share two tiles, the mine must be among those two. The third tile touched only by the second 1 is GUARANTEED SAFE!',
			puzzles: [
				{
					instruction_it: 'Applica la regola 1-1 su parete: scava ⛏️ la casella garantita libera all\'estremità!',
					instruction_en: 'Apply the 1-1 wall rule: dig ⛏️ the guaranteed safe tile at the end!',
					requiredAction: 'reveal',
					target: { r: 0, c: 2 },
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, mine: true, rev: false }, { r: 0, c: 1, val: 1, rev: false }, { r: 0, c: 2, val: 0, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true },     { r: 1, c: 1, val: 1, rev: true },   { r: 1, c: 2, val: 0, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true },     { r: 2, c: 1, val: 0, rev: true },   { r: 2, c: 2, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: 'pattern_12x',
			level: 4,
			title_it: '4. Pattern Fondamentale 1-2-X',
			title_en: '4. Core 1-2-X Pattern',
			badge_it: 'La Mina Esterna',
			badge_en: 'The Outer Mine',
			desc_it: 'Un 2 tocca 3 caselle con 2 mine, ma il vicino 1 limita 1 mina alle prime due caselle. La terza casella (X) toccata solo dal 2 è SICURAMENTE UNA MINA!',
			desc_en: 'A 2 touches 3 tiles with 2 mines, but an adjacent 1 confines 1 mine to the first two tiles. The third tile (X) touched only by the 2 is DEFINITELY A MINE!',
			puzzles: [
				{
					instruction_it: 'Il 2 condivide due caselle con l\'1. Metti la bandiera 🚩 sulla mina esterna X!',
					instruction_en: 'The 2 shares two tiles with the 1. Flag 🚩 the outer mine X!',
					requiredAction: 'flag',
					target: { r: 0, c: 2 },
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, rev: false }, { r: 0, c: 2, mine: true, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true },  { r: 1, c: 1, val: 2, rev: true },    { r: 1, c: 2, val: 0, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true },  { r: 2, c: 1, val: 0, rev: true },    { r: 2, c: 2, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: 'pattern_121',
			level: 5,
			title_it: '5. Pattern Classico 1-2-1',
			title_en: '5. Classic 1-2-1 Pattern',
			badge_it: 'Pattern Reale',
			badge_en: 'Royal Pattern',
			desc_it: 'La sequenza 1-2-1 lungo una parete diritta ha una soluzione universale immediata: le caselle davanti ai due 1 sono MINE (🚩), mentre la casella davanti al 2 centrale è LIBERA (⛏️)!',
			desc_en: 'The 1-2-1 sequence along a flat wall has a universal rule: tiles facing the two 1s are MINES (🚩), while the tile facing the central 2 is SAFE (⛏️)!',
			puzzles: [
				{
					instruction_it: 'Pattern 1-2-1: scava ⛏️ la casella centrale garantita libera!',
					instruction_en: '1-2-1 Pattern: dig ⛏️ the guaranteed safe central tile!',
					requiredAction: 'reveal',
					target: { r: 0, c: 1 },
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, mine: true, rev: false }, { r: 0, c: 1, val: 2, rev: false }, { r: 0, c: 2, mine: true, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true },     { r: 1, c: 1, val: 2, rev: true },    { r: 1, c: 2, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true },     { r: 2, c: 1, val: 0, rev: true },    { r: 2, c: 2, val: 0, rev: true } ]
					]
				},
				{
					instruction_it: 'Pattern 1-2-1: piazza la bandiera 🚩 su una delle due mine esterne!',
					instruction_en: '1-2-1 Pattern: place a flag 🚩 on one of the two outer mines!',
					requiredAction: 'flag',
					target: { r: 0, c: 0 },
					alternateTarget: { r: 0, c: 2 },
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, mine: true, rev: false }, { r: 0, c: 1, val: 2, rev: true }, { r: 0, c: 2, mine: true, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true },     { r: 1, c: 1, val: 2, rev: true },   { r: 1, c: 2, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true },     { r: 2, c: 1, val: 0, rev: true },   { r: 2, c: 2, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: 'pattern_1221',
			level: 6,
			title_it: '6. Pattern 1-2-2-1',
			title_en: '6. 1-2-2-1 Pattern',
			badge_it: 'Doppia Coppia',
			badge_en: 'Double Pair',
			desc_it: 'In una sequenza 1-2-2-1 lungo una parete, le mine sono esattamente davanti ai due numeri 2. Le caselle davanti ai due numeri 1 sono SEMPRE SICURE al 100%!',
			desc_en: 'In a 1-2-2-1 sequence along a wall, the mines are directly in front of the two 2s. The tiles facing the two 1s are ALWAYS 100% SAFE!',
			puzzles: [
				{
					instruction_it: 'Pattern 1-2-2-1: scava ⛏️ una delle due caselle esterne sicure davanti agli 1!',
					instruction_en: '1-2-2-1 Pattern: dig ⛏️ one of the outer safe tiles facing the 1s!',
					requiredAction: 'reveal',
					target: { r: 0, c: 0 },
					alternateTarget: { r: 0, c: 3 },
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, val: 1, rev: false }, { r: 0, c: 1, mine: true, rev: false }, { r: 0, c: 2, mine: true, rev: false }, { r: 0, c: 3, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true },  { r: 1, c: 1, val: 2, rev: true },    { r: 1, c: 2, val: 2, rev: true },    { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true },  { r: 2, c: 1, val: 0, rev: true },    { r: 2, c: 2, val: 0, rev: true },    { r: 2, c: 3, val: 0, rev: true } ]
					]
				},
				{
					instruction_it: 'Pattern 1-2-2-1: metti la bandiera 🚩 su una mina davanti a un 2!',
					instruction_en: '1-2-2-1 Pattern: flag 🚩 a mine in front of one of the 2s!',
					requiredAction: 'flag',
					target: { r: 0, c: 1 },
					alternateTarget: { r: 0, c: 2 },
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, val: 1, rev: true },  { r: 0, c: 1, mine: true, rev: false }, { r: 0, c: 2, mine: true, rev: false }, { r: 0, c: 3, val: 1, rev: false } ],
						[ { r: 1, c: 0, val: 1, rev: true },  { r: 1, c: 1, val: 2, rev: true },     { r: 1, c: 2, val: 2, rev: true },    { r: 1, c: 3, val: 1, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true },  { r: 2, c: 1, val: 0, rev: true },     { r: 2, c: 2, val: 0, rev: true },    { r: 2, c: 3, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: 'reductions',
			level: 7,
			title_it: '7. Riduzioni Algebriche (1-2-2 ➔ 1-2-1)',
			title_en: '7. Reductions (1-2-2 ➔ 1-2-1)',
			badge_it: 'Algebra delle Bandiere',
			badge_en: 'Flag Arithmetic',
			desc_it: 'La maggior parte dei pattern apparentemente complessi (es. 1-2-2 o 2-3-2) si trasforma in un semplice 1-2-1 sottraendo le mine già contrassegnate con bandiera (2 - 1 = 1)!',
			desc_en: 'Most complex layouts (e.g. 1-2-2 or 2-3-2) reduce into a clean 1-2-1 by subtracting already placed flags (2 - 1 = 1)!',
			puzzles: [
				{
					instruction_it: 'Sulla destra c\'è un 2 con già una bandiera: vale come 1 (2 - 1 = 1). La terna 1-2-2 si riduce a 1-2-1! Scava ⛏️ la casella centrale libera.',
					instruction_en: 'On the right, a 2 already has a flag: it acts as 1 (2 - 1 = 1). The 1-2-2 reduces to 1-2-1! Dig ⛏️ the middle safe cell.',
					requiredAction: 'reveal',
					target: { r: 0, c: 1 },
					rows: 3,
					cols: 4,
					board: [
						[ { r: 0, c: 0, mine: true, rev: false }, { r: 0, c: 1, val: 2, rev: false }, { r: 0, c: 2, mine: true, rev: false }, { r: 0, c: 3, mine: true, rev: false, flag: true } ],
						[ { r: 1, c: 0, val: 1, rev: true },     { r: 1, c: 1, val: 2, rev: true },    { r: 1, c: 2, val: 2, rev: true },     { r: 1, c: 3, val: 0, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true },     { r: 2, c: 1, val: 0, rev: true },    { r: 2, c: 2, val: 0, rev: true },     { r: 2, c: 3, val: 0, rev: true } ]
					]
				}
			]
		},
		{
			id: 'corners_niches',
			level: 8,
			title_it: '8. Angoli e Nicchie (Hole in the Wall)',
			title_en: '8. Corners & Wall Holes',
			badge_it: 'Geometria Avanzata',
			badge_en: 'Advanced Geometry',
			desc_it: 'Un numero 1 dentro una rientranza o nicchia tocca una sola casella coperta d\'angolo: la mina è lì. I numeri esterni possono subito dedurre che le altre celle coperte sono sicure!',
			desc_en: 'A clue 1 inside a pocket or indentation touches a single corner tile: the mine must be there. Adjacent numbers can safely clear other covered tiles!',
			puzzles: [
				{
					instruction_it: 'La nicchia confina la mina del numero 1. Metti la bandiera 🚩 sulla mina!',
					instruction_en: 'The pocket confines the clue 1\'s mine. Place a flag 🚩 on it!',
					requiredAction: 'flag',
					target: { r: 0, c: 0 },
					rows: 3,
					cols: 3,
					board: [
						[ { r: 0, c: 0, mine: true, rev: false }, { r: 0, c: 1, val: 1, rev: true }, { r: 0, c: 2, val: 0, rev: true } ],
						[ { r: 1, c: 0, val: 1, rev: true },     { r: 1, c: 1, val: 1, rev: true }, { r: 1, c: 2, val: 0, rev: true } ],
						[ { r: 2, c: 0, val: 0, rev: true },     { r: 2, c: 1, val: 0, rev: true }, { r: 2, c: 2, val: 0, rev: true } ]
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
