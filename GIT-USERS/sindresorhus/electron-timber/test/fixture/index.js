'use strict';
const {app, BrowserWindow, ipcMain: ipc} = require('electron');
const logger = require('../..');

let mainWindow;

(async () => {
	await app.whenReady();

	mainWindow = new BrowserWindow();
	await mainWindow.loadURL(`file://${__dirname}/index.html`);

	const {log} = logger;
	log('Main log');

	logger.warn('Main warn');
	logger.error('Main error');
	logger.time('Main timer');
	logger.timeEnd('Main timer');

	const customLogger = logger.create({name: 'custom', logLevel: 'info'});
	customLogger.log('Custom log');

	ipc.on('setDefaults', (event, newDefaults) => {
		logger.setDefaults(newDefaults);
	});

	ipc.on('logger', (event, method, ...arguments_) => {
		logger[method](...arguments_);
		customLogger[method](...arguments_);
	});
})();
