/**
 * Mahjong Arcade - Lightweight i18n Micro-Engine
 *
 * Priority cascade:
 * 1. URL parameter (?lang=xx or ?locale=xx) - supplied by WordPress iframe loader
 * 2. postMessage from WordPress parent ({ type: 'pointnet-games:set-language', lang: 'xx' })
 * 3. localStorage ('pointnet_games_lang')
 * 4. document.documentElement.lang
 * 5. navigator.language (browser language)
 * 6. Default fallback ('it')
 */
(function(window) {
	'use strict';

	var DEFAULT_LANG = 'it';
	var SUPPORTED_LANGS = ['it', 'en'];
	var currentLang = DEFAULT_LANG;
	var listeners = [];

	function normalizeLang(lang) {
		if (!lang || typeof lang !== 'string') return DEFAULT_LANG;
		var shortCode = lang.trim().toLowerCase().substring(0, 2);
		return SUPPORTED_LANGS.indexOf(shortCode) !== -1 ? shortCode : DEFAULT_LANG;
	}

	function detectInitialLang() {
		// 1. URL search params
		try {
			var params = new URLSearchParams(window.location.search);
			var urlLang = params.get('lang') || params.get('locale');
			if (urlLang) {
				return normalizeLang(urlLang);
			}
		} catch (e) {}

		// 2. localStorage
		try {
			var stored = localStorage.getItem('pointnet_games_lang');
			if (stored) {
				return normalizeLang(stored);
			}
		} catch (e) {}

		// 3. document HTML lang
		try {
			var htmlLang = document.documentElement.lang;
			if (htmlLang) {
				return normalizeLang(htmlLang);
			}
		} catch (e) {}

		// 4. Browser language
		try {
			var navLang = navigator.language || navigator.userLanguage;
			if (navLang) {
				return normalizeLang(navLang);
			}
		} catch (e) {}

		return DEFAULT_LANG;
	}

	var I18n = {
		init: function() {
			currentLang = detectInitialLang();
			this.setupPostMessageListener();
			this.applyDOM();
		},

		getLanguage: function() {
			return currentLang;
		},

		setLanguage: function(lang) {
			var norm = normalizeLang(lang);
			if (norm === currentLang) return;
			currentLang = norm;
			try {
				localStorage.setItem('pointnet_games_lang', currentLang);
			} catch (e) {}
			if (typeof document !== 'undefined' && document.documentElement) {
				document.documentElement.lang = currentLang;
			}
			this.applyDOM();
			this.notify();
		},

		t: function(keyPath, params) {
			var dict = (window.POINTNET_I18N && window.POINTNET_I18N[currentLang]) ||
			           (window.POINTNET_I18N && window.POINTNET_I18N[DEFAULT_LANG]) || {};
			var parts = keyPath.split('.');
			var cur = dict;
			for (var i = 0; i < parts.length; i++) {
				if (cur && typeof cur === 'object' && parts[i] in cur) {
					cur = cur[parts[i]];
				} else {
					// Fallback to default lang if missing in current
					var fbDict = (window.POINTNET_I18N && window.POINTNET_I18N[DEFAULT_LANG]) || {};
					var fbCur = fbDict;
					for (var j = 0; j < parts.length; j++) {
						if (fbCur && typeof fbCur === 'object' && parts[j] in fbCur) {
							fbCur = fbCur[parts[j]];
						} else {
							return keyPath; // Not found
						}
					}
					cur = fbCur;
					break;
				}
			}

			if (typeof cur !== 'string') {
				return keyPath;
			}

			if (params && typeof params === 'object') {
				return cur.replace(/\{(\w+)\}/g, function(match, paramName) {
					return params[paramName] !== undefined ? params[paramName] : match;
				});
			}

			return cur;
		},

		applyDOM: function(root) {
			if (typeof document === 'undefined') return;
			root = root || document;
			var elements = root.querySelectorAll('[data-i18n]');
			for (var i = 0; i < elements.length; i++) {
				var el = elements[i];
				var key = el.getAttribute('data-i18n');
				if (key) {
					el.textContent = this.t(key);
				}
			}

			var titleElements = root.querySelectorAll('[data-i18n-title]');
			for (var j = 0; j < titleElements.length; j++) {
				var tel = titleElements[j];
				var tkey = tel.getAttribute('data-i18n-title');
				if (tkey) {
					tel.setAttribute('title', this.t(tkey));
				}
			}

			var ariaElements = root.querySelectorAll('[data-i18n-aria]');
			for (var k = 0; k < ariaElements.length; k++) {
				var ael = ariaElements[k];
				var akey = ael.getAttribute('data-i18n-aria');
				if (akey) {
					ael.setAttribute('aria-label', this.t(akey));
				}
			}
		},

		onLanguageChange: function(callback) {
			if (typeof callback === 'function') {
				listeners.push(callback);
			}
		},

		notify: function() {
			for (var i = 0; i < listeners.length; i++) {
				try {
					listeners[i](currentLang);
				} catch (e) {
					console.error('[i18n] listener error:', e);
				}
			}
		},

		setupPostMessageListener: function() {
			if (typeof window.addEventListener === 'function') {
				window.addEventListener('message', function(event) {
					if (!event.data || typeof event.data !== 'object') return;
					if (event.data.type === 'pointnet-games:set-language') {
						if (event.data.lang) {
							I18n.setLanguage(event.data.lang);
						}
					}
				});
			}
		}
	};

	window.I18n = I18n;
})(window);
