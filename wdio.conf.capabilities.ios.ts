export const config: WebdriverIO.Config = {
	hostname: 'localhost',
	capabilities: [
		{
			platformName: 'iOS',
			'appium:automationName': 'XCUITest',
//             'appium:permissions': JSON.stringify({
//               your.bundle.id: {
//                 notifications: 'YES',
//                 location: 'ALWAYS',
//                 userTracking: 'YES',
//               },
//             }),
		},
	],
};
