/**
 * Minesweeper Arcade — Audio & Haptics Module
 * WebAudio procedural sound synthesizer for clicks, reveals, kalimba numbers, flags and explosions.
 */
var AudioFX = (function () {
	'use strict';

	var ctx = null;
	var soundEnabled = true;

	try {
		soundEnabled = localStorage.getItem('wp_mines_arcade_sound') !== '0';
	} catch (e) {}

	function getCtx() {
		if (!ctx) {
			var AC = window.AudioContext || window.webkitAudioContext;
			if (AC) ctx = new AC();
		}
		if (ctx && ctx.state === 'suspended') {
			ctx.resume().catch(function () {});
		}
		return ctx;
	}

	function haptic(ms) {
		if (navigator.vibrate) {
			try { navigator.vibrate(ms || 15); } catch (e) {}
		}
	}

	// Clean, organic pop (wood/water drop feel)
	function playOrganicPop(freqStart, freqEnd, duration, volume) {
		if (!soundEnabled) return;
		var ac = getCtx();
		if (!ac) return;
		var t = ac.currentTime;
		var osc = ac.createOscillator();
		var gain = ac.createGain();
		var filter = ac.createBiquadFilter();

		filter.type = 'lowpass';
		filter.frequency.setValueAtTime(800, t);

		osc.type = 'sine';
		osc.frequency.setValueAtTime(freqStart || 380, t);
		osc.frequency.exponentialRampToValueAtTime(freqEnd || 140, t + (duration || 0.06));

		gain.gain.setValueAtTime(volume || 0.18, t);
		gain.gain.exponentialRampToValueAtTime(0.001, t + (duration || 0.06));

		osc.connect(filter);
		filter.connect(gain);
		gain.connect(ac.destination);

		osc.start(t);
		osc.stop(t + (duration || 0.06));
	}

	// Gentle kalimba / wooden marimba chime for numbers & chord
	function playKalimba(freq, volume, duration) {
		if (!soundEnabled) return;
		var ac = getCtx();
		if (!ac) return;
		var t = ac.currentTime;
		var dur = duration || 0.22;
		var vol = volume || 0.16;

		var osc1 = ac.createOscillator();
		var gain1 = ac.createGain();
		osc1.type = 'sine';
		osc1.frequency.setValueAtTime(freq, t);

		gain1.gain.setValueAtTime(vol, t);
		gain1.gain.exponentialRampToValueAtTime(0.001, t + dur);

		osc1.connect(gain1);
		gain1.connect(ac.destination);

		var osc2 = ac.createOscillator();
		var gain2 = ac.createGain();
		osc2.type = 'sine';
		osc2.frequency.setValueAtTime(freq * 2.756, t);

		gain2.gain.setValueAtTime(vol * 0.25, t);
		gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

		osc2.connect(gain2);
		gain2.connect(ac.destination);

		osc1.start(t);
		osc2.start(t);
		osc1.stop(t + dur);
		osc2.stop(t + 0.07);
	}

	// Tactile snap/click for flag toggle
	function playSnap(isFlag) {
		if (!soundEnabled) return;
		var ac = getCtx();
		if (!ac) return;
		var t = ac.currentTime;
		var bufferSize = Math.floor(ac.sampleRate * 0.03);
		var buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
		var data = buffer.getChannelData(0);
		for (var i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));

		var noise = ac.createBufferSource();
		noise.buffer = buffer;

		var filter = ac.createBiquadFilter();
		filter.type = 'bandpass';
		filter.frequency.setValueAtTime(isFlag ? 2200 : 1600, t);
		filter.Q.value = 3;

		var gain = ac.createGain();
		gain.gain.setValueAtTime(0.12, t);
		gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

		noise.connect(filter);
		filter.connect(gain);
		gain.connect(ac.destination);
		noise.start(t);

		playOrganicPop(isFlag ? 500 : 400, isFlag ? 250 : 200, 0.04, 0.08);
	}

	var KALIMBA_PENTATONIC = [440, 493.88, 554.37, 659.25, 739.99, 880, 987.77, 1108.73];

	return {
		initOnGesture: function () { getCtx(); },
		haptic: haptic,
		isEnabled: function () { return soundEnabled; },
		setEnabled: function (val) {
			soundEnabled = !!val;
			try {
				localStorage.setItem('wp_mines_arcade_sound', soundEnabled ? '1' : '0');
			} catch (e) {}
		},
		click: function () { playOrganicPop(420, 180, 0.05, 0.12); },
		reveal: function () { playOrganicPop(340, 140, 0.06, 0.14); },
		revealNumber: function (count) {
			var idx = Math.max(0, Math.min(count - 1, KALIMBA_PENTATONIC.length - 1));
			playKalimba(KALIMBA_PENTATONIC[idx], 0.15, 0.24);
		},
		flag: function () { playSnap(true); },
		unflag: function () { playSnap(false); },
		chord: function () {
			playKalimba(659.25, 0.14, 0.18);
			setTimeout(function () { playKalimba(880, 0.16, 0.22); }, 45);
		},
		explosion: function () {
			if (!soundEnabled) return;
			var ac = getCtx();
			if (!ac) return;
			var t = ac.currentTime;

			var osc = ac.createOscillator();
			var gain = ac.createGain();
			var filter = ac.createBiquadFilter();
			filter.type = 'lowpass';
			filter.frequency.setValueAtTime(160, t);

			osc.type = 'sine';
			osc.frequency.setValueAtTime(110, t);
			osc.frequency.exponentialRampToValueAtTime(28, t + 0.35);

			gain.gain.setValueAtTime(0.35, t);
			gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

			osc.connect(filter);
			filter.connect(gain);
			gain.connect(ac.destination);

			osc.start(t);
			osc.stop(t + 0.38);

			var dur = 0.25;
			var bSize = Math.floor(ac.sampleRate * dur);
			var buf = ac.createBuffer(1, bSize, ac.sampleRate);
			var d = buf.getChannelData(0);
			for (var i = 0; i < bSize; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bSize * 0.4));
			var nSrc = ac.createBufferSource();
			nSrc.buffer = buf;
			var nFilt = ac.createBiquadFilter();
			nFilt.type = 'lowpass';
			nFilt.frequency.setValueAtTime(220, t);
			var nGain = ac.createGain();
			nGain.gain.setValueAtTime(0.2, t);
			nGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

			nSrc.connect(nFilt);
			nFilt.connect(nGain);
			nGain.connect(ac.destination);
			nSrc.start(t);
		},
		levelUp: function () {
			var arpeggio = [440, 554.37, 659.25, 880, 1108.73];
			arpeggio.forEach(function (f, i) {
				setTimeout(function () { playKalimba(f, 0.16, 0.3); }, i * 90);
			});
		},
		lose: function () {
			var sadNotes = [659.25, 554.37, 493.88, 369.99];
			sadNotes.forEach(function (f, i) {
				setTimeout(function () { playKalimba(f, 0.12, 0.28); }, i * 130);
			});
		}
	};
})();
