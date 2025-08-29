export const config: WebdriverIO.Config = {
	hostname: 'localhost',
	capabilities: [
		{
			platformName: 'iOS',
			'appium:automationName': 'XCUITest',
		},
	],
};

//locale: 'en:EN'
//useNewWDA: false,
//startIWDP: true,
//platformVersion
//            permissions: JSON.stringify({
//            			[`${BuildConfig.iosPermissions}`]: {
//            				notifications: 'YES',
//            				location: 'YES',
//            				userTracking: 'YES',
//            			},
//            		}),
