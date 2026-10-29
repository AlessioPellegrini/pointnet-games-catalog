/**
 * Minesweeper Arcade — Viewport Manager
 * Handles pan, pinch-to-zoom, mouse wheel zoom, double-tap zoom and screen fitting.
 */
var ViewportManager = (function () {
	'use strict';

	var viewportEl = null;
	var layerEl = null;
	var boardEl = null;

	var scale = 1;
	var panX = 0;
	var panY = 0;

	var minScale = 0.25;
	var maxScale = 3.0;

	var isTouching = false;
	var isDragging = false;
	var isPinching = false;
	var hasMoved = false;

	var touchStartX = 0;
	var touchStartY = 0;
	var startPanX = 0;
	var startPanY = 0;

	var initialPinchDist = 0;
	var initialScale = 1;
	var pinchMidX = 0;
	var pinchMidY = 0;

	var preventClickUntil = 0;

	function init(vp, layer, board) {
		viewportEl = vp;
		layerEl = layer;
		boardEl = board;
		bindEvents();
	}

	function applyTransform(smooth) {
		if (!layerEl) return;
		if (smooth) {
			layerEl.classList.add('smooth-animate');
		} else {
			layerEl.classList.remove('smooth-animate');
		}
		layerEl.style.transform = 'translate3d(' + Math.round(panX) + 'px, ' + Math.round(panY) + 'px, 0) scale(' + scale + ')';
	}

	function clampPan() {
		if (!viewportEl || !boardEl) return;
		var vpW = viewportEl.clientWidth;
		var vpH = viewportEl.clientHeight;
		var bW = boardEl.offsetWidth * scale;
		var bH = boardEl.offsetHeight * scale;

		if (bW <= vpW) {
			panX = (vpW - bW) / 2;
		} else {
			var minX = vpW - bW - 40;
			var maxX = 40;
			panX = Math.max(minX, Math.min(maxX, panX));
		}

		if (bH <= vpH) {
			panY = (vpH - bH) / 2;
		} else {
			var minY = vpH - bH - 40;
			var maxY = 40;
			panY = Math.max(minY, Math.min(maxY, panY));
		}
	}

	function fitToScreen(smooth) {
		if (!viewportEl || !boardEl) return;
		var vpW = viewportEl.clientWidth;
		var vpH = viewportEl.clientHeight;
		if (vpW < 50 || vpH < 50) return;

		var bW = boardEl.offsetWidth;
		var bH = boardEl.offsetHeight;
		if (bW === 0 || bH === 0) return;

		var pad = 14;
		var scaleX = (vpW - pad * 2) / bW;
		var scaleY = (vpH - pad * 2) / bH;
		var fitScale = Math.min(scaleX, scaleY);

		minScale = Math.max(0.2, fitScale * 0.7);
		maxScale = Math.max(2.8, fitScale * 3.5);

		scale = Math.min(1.15, fitScale);
		panX = (vpW - bW * scale) / 2;
		panY = (vpH - bH * scale) / 2;

		clampPan();
		applyTransform(smooth);
	}

	function zoomAt(focusX, focusY, factor, smooth) {
		var oldScale = scale;
		var newScale = Math.max(minScale, Math.min(maxScale, scale * factor));
		if (Math.abs(newScale - oldScale) < 0.001) return;

		var actualFactor = newScale / oldScale;
		panX = focusX - (focusX - panX) * actualFactor;
		panY = focusY - (focusY - panY) * actualFactor;
		scale = newScale;

		clampPan();
		applyTransform(smooth);
	}

	function zoomStep(inOrOut) {
		if (!viewportEl) return;
		var midX = viewportEl.clientWidth / 2;
		var midY = viewportEl.clientHeight / 2;
		var factor = inOrOut > 0 ? 1.25 : 0.8;
		zoomAt(midX, midY, factor, true);
	}

	function getTouchDist(t1, t2) {
		return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
	}

	function bindEvents() {
		if (!viewportEl) return;

		// Mouse Wheel Zoom
		viewportEl.addEventListener('wheel', function (e) {
			e.preventDefault();
			var rect = viewportEl.getBoundingClientRect();
			var focusX = e.clientX - rect.left;
			var focusY = e.clientY - rect.top;
			var factor = e.deltaY < 0 ? 1.15 : 0.87;
			zoomAt(focusX, focusY, factor, false);
		}, { passive: false });

		// Touch Drag & Pinch
		viewportEl.addEventListener('touchstart', function (e) {
			if (e.touches.length === 1) {
				isTouching = true;
				isDragging = true;
				isPinching = false;
				hasMoved = false;
				touchStartX = e.touches[0].clientX;
				touchStartY = e.touches[0].clientY;
				startPanX = panX;
				startPanY = panY;
			} else if (e.touches.length >= 2) {
				isTouching = true;
				isDragging = false;
				isPinching = true;
				hasMoved = true;
				initialPinchDist = getTouchDist(e.touches[0], e.touches[1]);
				initialScale = scale;
				var rect = viewportEl.getBoundingClientRect();
				pinchMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
				pinchMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
			}
		}, { passive: true });

		viewportEl.addEventListener('touchmove', function (e) {
			if (!isTouching) return;

			if (isPinching && e.touches.length >= 2) {
				var currentDist = getTouchDist(e.touches[0], e.touches[1]);
				if (initialPinchDist > 0) {
					var factor = currentDist / initialPinchDist;
					var newScale = Math.max(minScale, Math.min(maxScale, initialScale * factor));
					var actualFactor = newScale / scale;
					panX = pinchMidX - (pinchMidX - panX) * actualFactor;
					panY = pinchMidY - (pinchMidY - panY) * actualFactor;
					scale = newScale;
					clampPan();
					applyTransform(false);
				}
			} else if (isDragging && e.touches.length === 1) {
				var dx = e.touches[0].clientX - touchStartX;
				var dy = e.touches[0].clientY - touchStartY;
				if (!hasMoved && Math.hypot(dx, dy) > 8) {
					hasMoved = true;
				}
				if (hasMoved) {
					panX = startPanX + dx;
					panY = startPanY + dy;
					clampPan();
					applyTransform(false);
				}
			}
		}, { passive: true });

		function onTouchEnd() {
			if (hasMoved) {
				preventClickUntil = Date.now() + 250;
			}
			isTouching = false;
			isDragging = false;
			isPinching = false;
			clampPan();
			applyTransform(true);
		}

		viewportEl.addEventListener('touchend', onTouchEnd, { passive: true });
		viewportEl.addEventListener('touchcancel', onTouchEnd, { passive: true });

		// Mouse Drag Pan (Desktop)
		var isMouseDragging = false;
		var mouseStartX = 0, mouseStartY = 0;
		var mouseStartPanX = 0, mouseStartPanY = 0;
		var mouseHasMoved = false;

		viewportEl.addEventListener('mousedown', function (e) {
			var isCell = e.target.classList.contains('cell') || e.target.closest('.cell');
			if (e.button === 1 || (!isCell && e.button === 0)) {
				isMouseDragging = true;
				mouseHasMoved = false;
				mouseStartX = e.clientX;
				mouseStartY = e.clientY;
				mouseStartPanX = panX;
				mouseStartPanY = panY;
				e.preventDefault();
			}
		});

		window.addEventListener('mousemove', function (e) {
			if (!isMouseDragging) return;
			var dx = e.clientX - mouseStartX;
			var dy = e.clientY - mouseStartY;
			if (!mouseHasMoved && Math.hypot(dx, dy) > 5) {
				mouseHasMoved = true;
			}
			if (mouseHasMoved) {
				panX = mouseStartPanX + dx;
				panY = mouseStartPanY + dy;
				clampPan();
				applyTransform(false);
			}
		});

		window.addEventListener('mouseup', function () {
			if (isMouseDragging) {
				if (mouseHasMoved) preventClickUntil = Date.now() + 200;
				isMouseDragging = false;
				clampPan();
				applyTransform(true);
			}
		});

		// Nota: Lo zoom è controllato da pinch, rotellina mouse e pulsanti + / - / fit nella barra.
	}

	return {
		init: init,
		fitToScreen: fitToScreen,
		zoomStep: zoomStep,
		shouldPreventClick: function () {
			return Date.now() < preventClickUntil;
		},
		getScale: function () { return scale; }
	};
})();
