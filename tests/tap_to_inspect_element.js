// SCRIPT FOR PICKING ELEMENT ON PAGE AND SEEING HIERARCHY OF SELECTORS!!! 
(function(){
	// Remember to retain support for old js!!!
	var clickBlocker = document.createElement('div');
	// Aggressive styling so it doesn't get caught by CSS rules like *
	clickBlocker.style.cssText = 'top:0!important;bottom:0!important;left:0!important;right:0!important;z-index:2147483647!important;background-color:#00f3ff!important;'
		+'background-image:none!important;opacity:0.2!important;transform:unset!important;margin:0!important;position:fixed!important'; // largest possible zindex and use cssText because important doesn't work with zIndex
	clickBlocker.id = 'fishpoweredElInspector';
	clickBlocker.addEventListener('click', function(e){
		e = e || window.event;
		var parts = [];
		var selector = null;
		var elementsUnderTap = document.elementsFromPoint(e.clientX, e.clientY)
		for (var i = 0; i < elementsUnderTap.length; i++) {
			selector = fetchCssPath(elementsUnderTap[i]);
			if(isSuitableSelector(selector)){
			    parts.push(selector);
			}
		}
		if(parts.length){
			//console.log(parts);
			fpandroid.notifyTappedElements(JSON.stringify(parts));
		}else{
			fpandroid.notifyTappedElementsFailed();
		}
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		document.body.removeChild(clickBlocker);
	});
	document.body.appendChild(clickBlocker);
	
	var isSuitableSelector = function(selector){
		return (selector!="#fishpoweredElInspector");
		//selector = selector.toLowerCase();
		//return (!selector.startsWith("body") && !selector.startsWith("html") && (selector.includes(".") || selector.includes("#")));
	}

	var fetchCssPath = function (elSrc) {
	  if (!(elSrc instanceof Element)) return;
	  var sSel,
		aAttr = ['name', 'value', 'title', 'placeholder', 'data-*'], // Common attributes
		aSel = [],
		// Derive selector from element
		getSelector = function(el) {
		  // 1. Check ID first
		  // NOTE: ID must be unique amongst all IDs in an HTML5 document.
		  // https://www.w3.org/TR/html5/dom.html#the-id-attribute
		  if (el.id) {
			aSel.unshift('#' + el.id);
			return true;
		  }
		  aSel.unshift(sSel = el.nodeName.toLowerCase());
		  // 2. Try to select by classes
		  if ((el.className+'').trim()) {
			aSel[0] = sSel += '.' + (el.className+'').trim().replace(/ +/g, '.');
			if (uniqueQuery()) return true;
		  }
		  // 3. Try to select by classes + attributes
		  for (var i=0; i<aAttr.length; ++i) {
			if (aAttr[i]==='data-*') {
			  // Build array of data attributes
			  var aDataAttr = [].filter.call(el.attributes, function(attr) {
				return attr.name.indexOf('data-')===0;
			  });
			  for (var j=0; j<aDataAttr.length; ++j) {
				aSel[0] = sSel += '[' + aDataAttr[j].name + '="' + aDataAttr[j].value + '"]';
				if (uniqueQuery()) return true;
			  }
			} else if (el[aAttr[i]]) {
			  aSel[0] = sSel += '[' + aAttr[i] + '="' + el[aAttr[i]] + '"]';
			  if (uniqueQuery()) return true;
			}
		  }
		  // 4. Try to select by nth-of-type() as a fallback for generic elements
		  var elChild = el,
			sChild,
			n = 1;
		  while (elChild = elChild.previousElementSibling) {
			if (elChild.nodeName===el.nodeName) ++n;
		  }
		  aSel[0] = sSel += ':nth-of-type(' + n + ')';
		  if (uniqueQuery()) return true;
		  // 5. Try to select by nth-child() as a last resort
		  elChild = el;
		  n = 1;
		  while (elChild = elChild.previousElementSibling) ++n;
		  aSel[0] = sSel = sSel.replace(/:nth-of-type\(\d+\)/, n>1 ? ':nth-child(' + n + ')' : ':first-child');
		  if (uniqueQuery()) return true;
		  return false;
		},
		// Test query to see if it returns one element
		uniqueQuery = function() {
		  try{
		    return document.querySelectorAll(aSel.join('>')||null).length===1;
		  }catch(e){
			console.error("Fishpowered: Unable to query for selector: "+e);  
            // certain selectors might fail    
		  }	
		};
	  // Walk up the DOM tree to compile a unique selector
	  while (elSrc.parentNode) {
		if (getSelector(elSrc)) return aSel.join(' > ');
		elSrc = elSrc.parentNode;
	  }
	}
})(); // scope code 