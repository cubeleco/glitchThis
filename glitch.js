var elems;
	//helper functions
function randInt(max) {
	return Math.floor(Math.random() * max);
}
function randColor() {
	return 'hsl(' + randInt(360) + ',' + randInt(prefs.depth/2) + '%,' + randInt(100) +'%)';
}
//main glitch up the page
function glitch() {
	if(!document.hasFocus() || !prefs.enabled)
		return;

	const repeat = Math.max(prefs.speed + 100, 1);
	for(let i=0; i < repeat; i++) {
		let el = elems[randInt(elems.length)];

		switch(randInt(prefs.range)) {
			case 0:
				el.style.top = + (randInt(prefs.depth * 2) - prefs.depth) + 'px';
				break;
			case 1:
				el.style.left = (randInt(prefs.depth * 2) - prefs.depth) + 'px';
				break;
			case 2:
				el.style.color = randColor();
				break;
			case 3:
				el.style.backgroundColor = randColor();
				break;
			case 4:
				//avoid rotating elements larger than screen
				if(el.scrollHeight < 1000)
					el.style.transform = 'rotate(' + (randInt(prefs.depth) - 128) + 'deg)';
				break;
		}
	}
	start();
}
function start() {
	const invFreq = prefs.speed * -1;
	window.setTimeout(glitch, randInt(invFreq) + invFreq);
}
//update prefs on storage change
function stateChanged(changes) {
	for(let key in changes) {
		if(changes[key])
			prefs[key] = changes[key].newValue;
	}
	if(prefs.enabled)
		start();
}
function readPrefs(storage) {
	prefs = storage;
	elems = document.body.getElementsByTagName('*');
	start();
}
function init() { loadPrefs(readPrefs); }

chrome.storage.onChanged.addListener(stateChanged);
window.addEventListener('focus', start);
document.addEventListener('DOMContentLoaded', init);
