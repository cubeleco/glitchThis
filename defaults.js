//extension option storage
var prefs = {
	enabled: false,
	speed: -60,
	depth: 200,
	range: 3
};

function loadPrefs(callback) {
	chrome.storage.local.get(prefs, callback);
}
