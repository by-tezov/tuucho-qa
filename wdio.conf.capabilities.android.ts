export const config: WebdriverIO.Config = {
	hostname: 'android-appium',
	capabilities: [
		{
			platformName: 'Android',
			'appium:automationName': 'UiAutomator2',
		},
	],
};
