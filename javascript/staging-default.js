(function() {
	if (!document.querySelectorAll) {
		return;
	}

	var stagingClass = 'has-staging-bar';

	function CloseStagingBar() {
		document.body.className = document.body.className.replace(new RegExp('(?:^|\\s)'+ stagingClass + '(?:\\s|$)'), ' ');
	}

	function EnableCodeSniffer() {
		// Bookmarklet Code from: http://squizlabs.github.io/HTML_CodeSniffer/
		(function() {var _p='//squizlabs.github.io/HTML_CodeSniffer/build/';var _i=function(s,cb) {var sc=document.createElement('script');sc.onload = function() {sc.onload = null;sc.onreadystatechange = null;cb.call(this);};sc.onreadystatechange = function(){if(/^(complete|loaded)$/.test(this.readyState) === true){sc.onreadystatechange = null;sc.onload();}};sc.src=s;if (document.head) {document.head.appendChild(sc);} else {document.getElementsByTagName('head')[0].appendChild(sc);}}; var options={path:_p};_i(_p+'HTMLCS.js',function(){HTMLCSAuditor.run('WCAG2AA',null,options);});})();
	}

	function main() {
		if (!document.querySelectorAll) {
			return;
		}
		document.body.className += " "+stagingClass;
		
		var elSet, i, el;
		elSet = document.querySelectorAll('.js-ss-staging-bar-close');
		for (i = 0; i < elSet.length; ++i) {
			el = elSet[i];
			el.addEventListener('click', CloseStagingBar);
		}
		elSet = document.querySelectorAll('.js-ss-staging-bar-codesniffer');
		for (i = 0; i < elSet.length; ++i) {
			el = elSet[i];
			el.addEventListener('click', EnableCodeSniffer);
		}
	}
	main();
}());