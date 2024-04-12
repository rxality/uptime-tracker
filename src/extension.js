const vscode = require('vscode');

const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
const startedAt = new Date().toLocaleTimeString();
let seconds = 1;
let isPaused = false;

function activate({ subscriptions }) {

	statusBar.name = 'Uptime Tracker';
	statusBar.tooltip = `Started at ${startedAt}`;
	statusBar.accessibilityInformation = {
		label: 'Uptime Tracker (Extension)'
	};

	const pauseTimerId = 'rxality.uptime.pauseTimer';
	subscriptions.push(vscode.commands.registerCommand(pauseTimerId, () => {
		pauseTimer();
	}));

	statusBar.command = pauseTimerId
	subscriptions.push(statusBar);

	setInterval(function () {
		if (!isPaused) {
			const hours = (Math.floor(seconds / 3600)).toString().padStart(2, '0');
			const minutes = (Math.floor((seconds % 3600) / 60)).toString().padStart(2, '0');
			const remainingSeconds = (seconds % 60).toString().padStart(2, '0');

			seconds++;
			statusBar.text = `\$(watch) Uptime: ${hours}:${minutes}:${remainingSeconds}`;
			statusBar.show();
			return;
		}

		statusBar.text = `\$(watch) Paused!`
		statusBar.show()
	}, 1000);

}

function pauseTimer() {
	if (!isPaused) {
		isPaused = true;
	} else {
		isPaused = false;
	}
}

function deactivate() {
	statusBar.dispose();
}

module.exports = {
	activate,
	deactivate
}
