# 💣 Minesweeper
 
> **Versione: 1.6.0** — *The Clean One* aesthetics, tripla modalità (Classica 4 preset, Scalata 18 livelli e 🎓 Scuola di Logica "Impara dalle Basi"), Pan & Pinch-to-Zoom, Didattica interattiva con Navigazione Storico Mosse (Undo/Redo ↩️/↪️), Scanner Pattern Tattici Interattivo con spiegazione cella per cella (1-2-1, 1-2-2-1, 1-2-X, 1-1-X e riduzioni con notazione esplicita), Heatmap e supporto Multi-lingua (IT/EN) coordinato con WordPress.

Ispirato al design e all'esperienza tattile di *Minesweeper: The Clean One*, con **tripla modalità di gioco**: la classica partita singola a selezione libera, l'emozionante modalità Scalata a 18 livelli progressivi fino al livello Estremo, e la nuova **Scuola di Logica (Academy)** a banchi di prova interattivi!

---

## 📝 Changelog

### 1.6.0 (current)
- **Scuola di Logica Interattiva ("Impara dalle Basi")**:
  - Nuovo tab e pannello didattico nello Splash screen con 8 lezioni progressive:
    1. *Regola della Saturazione (0-safe e 100%-mine)*
    2. *L'Arte del Chording*
    3. *Pattern 1-1 su parete*
    4. *Pattern Fondamentale 1-2-X (la mina esterna)*
    5. *Pattern Classico 1-2-1*
    6. *Pattern 1-2-2-1*
    7. *Riduzioni Algebriche (1-2-2 ➔ 1-2-1)*
    8. *Angoli e Nicchie (Hole in the Wall)*
  - Progressione a padronanza (*Mastery-based*): avanzamento al banco di prova successivo o alla lezione seguente solo al compimento dell'esatta deduzione logica (senza tentativi a caso).
  - Salvataggio locale dei progressi e delle lezioni superate (`localStorage`).
- **Risoluzione Riconoscimento Pattern 1-2-2 vs 1-2-1 (Riduzioni Algebriche)**:
  - Risolta la discrepanza rilevata in partita quando un `1-2-2` con bandiera veniva etichettato genericamente come `1-2-1`.
  - Ora il sistema visualizza il titolo specifico `Pattern 1-2-1 Ridotto (da 1-2-2)` e illustra esplicitamente l'aritmetica delle bandiere (`2 - 1 = 1`) sia nel toast sia nell'ispettore di cella.
- **Supporto Completo Azioni Pattern 1-2-2-1**:
  - Evidenziazione sia delle caselle sicure davanti ai due numeri 1, sia delle bandiere certe da posizionare davanti ai due 2.
- **Sincronizzazione Completa Dizionari IT/EN**: localizzazione accurata e bilingue di tutti i moduli dell'Academy e delle formule di riduzione.

### 1.5.9
- **Raffinamento Interazione Pattern Tattici vs Inspector**:
  - Toccando una casella evidenziata dal pattern in modalità `Scava` o `Bandiera`, il pattern rimane attivo e visibile sul tabellone e viene mostrata la spiegazione didattica specifica con il nome ufficiale del pattern (`1-2-1`, `1-2-X`, ecc.) e l'azione dedotta (`🚩 Mina` o `🟢 Libera`).
  - Se invece è attiva la modalità `🔍 Info (Inspect)`, il tocco sulla casella apre l'ispezione analitica della singola cella resettando i pattern.
  - Il toast iniziale del pulsante `🧩 Pattern` elenca direttamente i nomi di tutti i pattern identificati sul campo.

### 1.5.8
- **Disattivazione Zoom Nativo del Browser (`touch-action: none`)**: eliminato il fastidioso zoom accidentale della pagina eseguito da browser mobile (Chrome/Safari) al doppio tocco veloce, bloccando nativamente l'evento `dblclick`.
- **Doppio Tap Altamente Reattivo su Arena di Gioco**: cattura affidabile del doppio tocco (< 380ms con tolleranza di spostamento di 30px) su qualsiasi punto dell'arena di gioco e delle caselle scoperte per invertire `⛏️ Scava` e `🚩 Bandiera`.
- **Toggle Istantaneo al Tocco del Pill Selector**: toccando qualsiasi punto del pulsante o della modalità già attiva nel selettore in basso, si inverte all'istante lo stato senza dover mirare al tasto opposto.

### 1.5.7
- **Doppio Tap Globale Intelligente per Alternare Modalità**: effettuando un doppio tap rapido (< 320ms) su qualsiasi area scoperta o sullo sfondo del campo di gioco, si inverte all'istante la modalità attiva tra `⛏️ Scava` e `🚩 Bandiera`, preservando la reattività a 0ms dello scavo sulle celle coperte senza rischio di falsi positivi.
- **Rimozione Sicura Diretta della Bandiera**: toccando una casella con bandiera già posizionata, un tap singolo la toglie immediatamente.
- **Perfezionamento Scorciatoie**: allineate le istruzioni touch bilingue in splash screen.

### 1.5.6
- **Doppio Tap Rapido per Invertire Azione**: toccando rapidamente due volte una casella coperta (< 280ms) si inverte l'azione primaria (in modalità *Scava* un doppio tap piazza/rimuove la bandiera; in modalità *Bandiera* un doppio tap scava immediatamente).
- **Quick Long-Press Tattile (230ms)**: abbassata la latenza della pressione prolungata per piazzare la bandiera da 350ms a 230ms con feedback aptico istantaneo (`haptic(22)`).
- **Scorciatoia Tap a 2 Dita (Two-Finger Tap)**: toccare la tavola con due dita simultanee inverte all'istante la modalità globale tra `⛏️ Scava` e `🚩 Bandiera`.
- **Indicatore Visivo Globale Modalità Bandiera**: quando attiva la modalità Bandiera, il bordo della scacchiera riceve un bagliore ambrato pulsante e l'icona nell'HUD vibra dolcemente, rendendo inequivocabile lo stato attivo anche con la coda dell'occhio.

### 1.5.5
- **Risoluzione Sovrapposizioni e Duplicati Fullscreen**: integrato il pulsante di uscita da schermo intero `✕` (`#fs-close`) direttamente nella riga dei controlli (`.action-buttons-row`) anziché in posizione fissa sovrapposta al wrapper WordPress.
- **Distinzione Icona Adatta Tavola**: aggiornata l'icona del pulsante di zoom fit a `🔲` (Adatta tavola) per evitare confusione con l'icona fullscreen `⛶` del player WordPress.
- **Layout Mobile & Schermi Stretti Ottimizzato**:
  - Introdotto flex-wrap e riposizionamento a 2 livelli su schermi compatti (< 600px e < 440px) per `.bottom-bar` e `.mode-pill-selector`, eliminando ogni overflow orizzontale.
  - Compattati i controlli HUD e la barra di avanzamento livello su schermi inferiori a 440px.
  - Banner Didattica responsive: visualizzazione su 2 livelli con compattazione automatica delle etichette su mobile stretto.

### 1.5.4
- **Raffinamento Rigoroso Spiegazioni Pattern**: corretta la descrizione della regola di riduzione insiemistica (ex "Angolo 1") allineandola formalmente ai canoni matematici e alla guida strategica ufficiale di [minesweepergame.com](https://minesweepergame.com/strategy/patterns.php), descrivendo fedelmente l'inclusione di sottoinsiemi a prescindere dal numero di celle coperte.
- **Ottimizzazione Popup Fine Tavola Didattica**: eliminato il pulsante duplicato del menu nel modale di completamento, sostituendolo con "🔁 Rigioca Tavola" affiancato a "🏠 Menu".
- **Sincronizzazione Completa Dizionari IT/EN**: localizzazione accurata e bilingue di tutti i testi didattici e dei pulsanti modali.

### 1.5.3
- **Scanner Pattern Tattici Interattivo ("🧩 Pattern")**: introdotto pulsante dedicato nel banner didattico che scansiona l'intero tabellone ed evidenzia contemporaneamente tutti i pattern tattici attivi (1-2-1 orizzontali/verticali, 1-2-2-1, 1-2-X, 1-1-X di bordo/angolo e relative riduzioni algebriche).
- **Spiegazione al Tocco per Cella/Pattern**: toccando una qualsiasi cella o numero evidenziato in viola, si apre il toast didattico dedicato con la spiegazione logica e algebrica dettagliata specifica di quel pattern.
- **Evidenziazione Cromatica Distintiva**: numeri del pattern con contorno neon viola (`.cell-pattern-clue`), caselle sicure dedotte in verde smeraldo (`.cell-pattern-safe`) e mine dedotte in rosso cremisi (`.cell-pattern-mine`).
- **Supporto Multilingua Completo**: localizzazione completa in italiano e in inglese nei dizionari `it.js` ed `en.js` con feedback sul conteggio dei pattern rilevati.

### 1.5.2
- **Navigazione Storico Didattico (Undo / Redo)**: aggiunti i pulsanti "↩️ Indietro" e "↪️ Avanti" nel banner didattico. Permettono di annullare o ripristinare qualsiasi mossa (scavo, bandierina o chording) esplorando percorsi alternativi senza dover rigiocare l'intera partita dall'inizio.
- **Supporto Multilingua Completo**: localizzazione delle azioni di Undo e Redo in italiano e in inglese nei dizionari `it.js` ed `en.js`.

### 1.5.1
- **Riconoscitore Pattern Tattici Avanzati**: rilevamento esplicito conforme alla guida strategica di [minesweepergame.com/strategy/patterns.php](https://minesweepergame.com/strategy/patterns.php):
  - **Pattern Fondamentale 1-2-X**: individua la mina esterna garantita tramite riduzione di sottoinsieme tra numeri 2 e 1 adiacenti.
  - **Pattern Bordo e Angolo 1-1-X**: individua la casella sicura lungo pareti e angoli retti tramite sottoinsieme.
  - **Pattern Reduction**: calcolo algebrico esplicito (`3 - 1 = 2`) nei toast didattici per illustrare come pattern complessi si riducano alle forme elementari 1-2-1 e 1-2-2-1.
- **Sincronizzazione Dizionari**: aggiornati i dizionari `it.js` ed `en.js` con le spiegazioni dettagliate di ciascun pattern tattico.

### 1.5.0
- **Multi-language Architecture (i18n)**: micro-motore di traduzione reattivo client-side (`js/i18n.js`) e dizionari completi (`js/i18n/it.js`, `js/i18n/en.js`).
- **Sincronizzazione Iframe WordPress**: rilevamento istantaneo della lingua del sito/pagina via parametro `?lang=` generato da WordPress (`determine_locale()`).
- **Reattività Dinamica**: supporto per cambi di lingua real-time senza ricarica della pagina tramite `postMessage` (`pointnet-games:set-language`).
- **Riconoscitore Pattern Base**: implementazione del rilevamento geometrico per i pattern 1-2-1 e 1-2-2-1.

### 1.4.3
- **Rilevamento Bandierine Errate**: il solver e l'ispettore identificano bandierine piazzate erroneamente su caselle prive di mina, evidenziandole con un'icona ❌ e prevenendo deduzioni errate.

### 1.4.2
- **Smart Inspector (Tutor Didattico)**: modalità "Info" interattiva per toccare qualsiasi casella e ricevere una spiegazione deduttiva sul perché sia sicura, mina o incerta.
- **Visual Safety Heatmap**: overlay a colori attivabile a comando con gradiente di sicurezza verde/giallo/rosso/blu.

### 1.4.1
- **Modalità Didattica (Allenamento)**: possibilità di riavvolgere la tavola un istante prima dell'errore per imparare la mossa corretta con il tasto "Spiegami la mossa".

### 1.3.6
- **Standardizzazione Metadati Classifica**: invio esplicito delle chiavi `level`, `time` ed `outcome` per garantire la perfetta visualizzazione del livello e tempo nella colonna dettagli delle classifiche di PointNet Games.
- **Allineamento Versione**: aggiornamento versione a 1.3.6 nel manifest e nello splash screen.

### 1.3.5
- **Integrazione Statistiche & Record Personali**: formattazione metadati arricchita per il modulo PointNet Games 1.3.5+ e per lo shortcode `[pointnet_user_records]`; supporto dettagli speedrun (tempo formattato mm:ss, esito vittoria/boom) e avanzamento livello Scalata (es. 14 / 18).
- **Badge Modalità & Allineamento Manifest**: sincronizzazione versione `1.3.5` nel manifest e tracciamento univoco della modalità.

### 1.3.2
- **Ottimizzazione Contrasto OLED all'Aperto**: aggiunto micro-bordo perimetrale a 1px ad alta definizione (`border: 1px solid rgba(255, 255, 255, 0.08)`) con doppio highlight superiore interno (`inset 0 1px 0 rgba(255, 255, 255, 0.16)`) su tutte le caselle coperte.
- **Massima Leggibilità Esterna**: garantisce perfetta separazione visiva delle celle sotto la luce solare diretta su smartphone OLED senza alterare l'eleganza dark di *The Clean One*.

### 1.3.1
- **Salvataggio Istantaneo Scalata**: invio automatico e immediato del punteggio progressivo alla classifica al completamento di ogni singolo livello (a partire dal Livello 1), evitando la perdita di punteggio in caso di chiusura accidentale.
- **Anti-Cheat Adaptive Duration**: calibrazione della soglia di durata minima plausibile per evitare falsi positivi sui tap ultrarapidi su tavole a bassa densità.

### 1.3.0
- **Doppia Modalità (Classica & Scalata)**: introdotta la modalità Classica con i 4 preset di *The Clean One* (Facile 9×9, Medio 16×16, Difficile 30×16, Estremo 32×18) affiancata alla modalità Scalata progressiva ampliata a 18 livelli fino all'Estremo 32×18 con 150 mine.
- **Pan & Pinch-to-Zoom fluido**: motore viewport a trasformazione hardware con supporto per drag a 1 dito, pinch-to-zoom a 2 dita, rotellina del mouse su desktop, zoom buttons (`⛶`, `＋`, `−`) e soppressione automatica dei clic accidentali durante lo scorrimento.
- **Rimozione denominazione "Arcade"**: rinominato il gioco in **Minesweeper** per rispecchiare la nuova natura a doppia modalità, preservando al contempo lo slug `minesweeper-arcade` per la piena compatibilità con database, post e URL WordPress esistenti.
- **Classifiche dedicate per difficoltà**: aggiornato il manifest con tab di classifica per `arcade`, `easy`, `medium`, `hard`, ed `extreme`.
- **Sound Design Organico**: campionatura acustica pura (goccia/legno, kalimba pentatonica per i numeri, snap per le bandierine, sub-bass thud) senza loop musicali continui.
- **Smart Chording & Pill Toggle**: svelamento istantaneo attorno ai numeri completati e pill selector per il cambio rapido di modalità tocco.

### 1.2.0
- Riprogettazione iniziale ispirata a *The Clean One*, HUD landscape docking, fix conflitti touch Android e resume AudioContext.

### 1.1.0
- Splash screen iniziale e supporto CSS fullscreen.
- Version badge (`v1.1.0` in superscript) added to the splash screen title
- High-DPI board rendering: the board rasterizes at the current viewport resolution whenever the iframe grows to fullscreen (two-phase transform re-application), keeping cells and text crisp on WordPress embeds
- Splash screen now shows the game version in superscript after the title, consistent with mahjong

### 1.0.0
- Initial release with **15 progressive levels** and gradual difficulty
- Mobile friendly grids (max 14 columns)
- Progressive scoring with per-level multiplier
- Procedural audio (Web Audio API)
- Splash screen + immersive fullscreen
- Full PointNet Games integration (leaderboard, arcade difficulty, postMessage shim)

## 📄 License

**GPL-2.0+** — GNU General Public License v2 or later.