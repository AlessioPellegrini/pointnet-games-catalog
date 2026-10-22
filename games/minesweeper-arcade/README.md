# 💣 Minesweeper
 
> **Versione: 1.5.1** — *The Clean One* aesthetics, doppia modalità (Classica 4 preset + Scalata 18 livelli), Pan & Pinch-to-Zoom, Didattica interattiva con Heatmap & Riconoscitore Pattern Tattici (1-2-1, 1-2-2-1, 1-2-X, 1-1-X) e supporto Multi-lingua (IT/EN) coordinato con WordPress.

Ispirato al design e all'esperienza tattile di *Minesweeper: The Clean One*, con **doppia modalità di gioco**: la classica partita singola a selezione libera o l'emozionante modalità Scalata a 18 livelli progressivi fino al livello Estremo!

---

## 📝 Changelog

### 1.5.1 (current)
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