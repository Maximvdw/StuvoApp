window.onload = function() {
	console.log("log1");
	(function(d) {
		console.log("log2");
		var
		ce = function(e, n) {
			console.log("log3");
			var a = document.createEvent("CustomEvent");
			a.initCustomEvent(n, true, true, e.target);
			e.target.dispatchEvent(a);
			a = null;
			return false
		},
			nm = true,
			sp = {
				x: 0,
				y: 0
			}, ep = {
				x: 0,
				y: 0
			},
			touch = {
				touchstart: function(e) {
					console.log("log4");
					sp = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					}
				},
				touchmove: function(e) {
					nm = false;
					ep = {
						x: e.touches[0].pageX,
						y: e.touches[0].pageY
					};
					if (Math.abs(ep.x - sp.x) > 10 && Math.abs(ep.y - sp.y) < 20)
						e.preventDefault();
				},
				touchend: function(e) {
					if (nm) {
						ce(e, 'fc')
					} else {
						var x = ep.x - sp.x,
							xr = Math.abs(x),
							y = ep.y - sp.y,
							yr = Math.abs(y);
						if (Math.max(xr, yr) > 20) {
							ce(e, (xr > yr ? (x < 0 ? 'swl' : 'swr') : (y < 0 ? 'swu' : 'swd')))
						}
					}
					nm = true
				},
				touchcancel: function(e) {
					console.log("log5");
					nm = false
				}
			};
		for (var a in touch) {
			d.addEventListener(a, touch[a], false);
		}
	})(document);
	//EXAMPLE OF USE
	var h = function(e) {
		console.log(e.type, e)
	};
	document.getElementByClass('ons-scroller').addEventListener('swl', h, false);
	document.getElementByClass('ons-scroller').addEventListener('swr', h, false);
}