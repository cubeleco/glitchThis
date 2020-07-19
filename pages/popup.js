function saveNumber(event) {
	chrome.storage.local.set({ [event.target.id]: Number(event.target.value) });
}
function saveChecked(event) {
	chrome.storage.local.set({ [event.target.id]: event.target.checked });
}

function readPrefs(storage) {
	document.getElementById('enabled').checked = storage.enabled;
	document.getElementById('speed').value = storage.speed;
	document.getElementById('depth').value = storage.depth;
	document.getElementById('range').value = storage.range;
}
function getPrefs() {
	loadPrefs(readPrefs);
}

document.getElementById('enabled').addEventListener('input', saveChecked);
document.getElementById('speed').addEventListener('input', saveNumber);
document.getElementById('depth').addEventListener('input', saveNumber);
document.getElementById('range').addEventListener('input', saveNumber);

document.addEventListener('DOMContentLoaded', getPrefs);
