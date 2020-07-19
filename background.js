var state = false;

function updateIcon() {
	chrome.browserAction.setIcon({ path: state? 'icons/icon-256.png' : 'icons/iconOff-256.png' });
	chrome.browserAction.setTitle({	title: state? 'glitch on' : 'glitch off' });
}
function commands(name) {
	if(name === 'toggle') {
		state = !state;
		chrome.storage.local.set({ enabled: state });
	}
}
function stateChanged(changes) {
	//only update on enabled change
	if(changes.enabled) {
		//reset to disabled state on factory reset otherwise use newValue
		state = changes.enabled.newValue === undefined ? false : changes.enabled.newValue;
		updateIcon();
	}
}
function readStorage(storage) {
	state = storage.enabled;
	updateIcon();
}
//toggle on command shortcut
chrome.commands.onCommand.addListener(commands);
//update on enabled state change
chrome.storage.onChanged.addListener(stateChanged);
//on browser startup get prior state
chrome.storage.local.get({enabled: state}, readStorage);
