/**
 * Calculate staging bar height and push down the 'body'
 */
(function() {
	if (!document.querySelectorAll) {
		return;
	}

	var defaultBodyStyle = '';
	var stagingClass = 'has-staging-bar';

	function CloseStagingBar() {
		ResetMarginTop();
	}
	
	function ResetMarginTop() {
		document.body.style = defaultBodyStyle;
	}

	function AddMarginTop() {
		ResetMarginTop();
		
		var css;

		var bodyEl = document.body;
		bodyEl.style = defaultBodyStyle;
		css = getComputedStyle(bodyEl, null);
		var position = css.position;
		var currentMarginTop = parseInt(css.marginTop, 10);

		// Get height
		var stagingBarEl = document.querySelectorAll('.js-ss-staging-bar')[0];
		if (!stagingBarEl) {
			return;
		}
		css = getComputedStyle(stagingBarEl, null);
		var nextMarginTop = (currentMarginTop + parseInt(css.height, 10));
		bodyEl.style.marginTop = nextMarginTop+'px';

		if (position === 'relative') {
			stagingBarEl.style.top = -nextMarginTop+'px';
		}
	}


	function main() {
		if (!document.querySelectorAll) {
			return;
		}
		defaultBodyStyle = document.body.style;

		AddMarginTop();

		var elSet, i, el;
		elSet = document.querySelectorAll('.js-ss-staging-bar-close');
		for (i = 0; i < elSet.length; ++i) {
			el = elSet[i];
			el.addEventListener('click', CloseStagingBar);
		}
	}
	main();
}());