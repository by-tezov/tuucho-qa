export const config: WebdriverIO.Config = {
	hostname: 'android-appium',
	//hostname: 'localhost',
	capabilities: [
		{
			platformName: 'Android',
			'appium:automationName': 'UiAutomator2',
			'appium:autoGrantPermissions': true,
		},
	],
};
