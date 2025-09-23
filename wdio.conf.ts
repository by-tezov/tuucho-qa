import crypto from 'crypto';
import fs from 'fs-extra';
import path from 'path';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}
const { config: platformConfig } = await import(`./wdio.conf.capabilities.${platform}.ts`);

const buildType = process.env.BUILD_TYPE;
if (!buildType) throw new Error('Missing required BUILD_TYPE');

const language = process.env.LANGUAGE;
if (!language) throw new Error('Missing required LANGUAGE');

const deviceName = process.env.DEVICE_NAME;
if (!deviceName) throw new Error('Missing required DEVICE_NAME');

const appPath = process.env.APP_PATH;
if (!appPath) throw new Error('Missing required APP_PATH');

const visualTestingHash = process.env.VISUAL_TESTING_HASH;
if (!visualTestingHash) throw new Error('Missing required VISUAL_TESTING_HASH');

export const visualTestingPaths = {
	root: './visual-testing/baseline/',
	baselineDir: `./visual-testing/baseline/${visualTestingHash}`,
	screenshotDir: `./visual-testing/actual/${visualTestingHash}`,
};

await fs.ensureDir(visualTestingPaths.root);
const envEntries = {
	PLATFORM: platform,
	BUILD_TYPE: buildType,
	LANGUAGE: language,
	DEVICE_NAME: deviceName,
};

fs.removeSync(visualTestingPaths.screenshotDir);
fs.ensureDirSync(visualTestingPaths.screenshotDir);
//fs.writeFileSync(path.join(visualTestingPaths.screenshotDir, 'ref.txt'), envEntries);

const defaultConfig: WebdriverIO.Config = {
	runner: 'local',
	injectGlobals: true,
	hostname: 'android-appium',
	port: 4723,
	path: '/',
	tsConfigPath: './tsconfig.json',
	specs: ['./src/features/**/*.feature'],
	exclude: [],
	maxInstances: 10,
	capabilities: [
		{
			'appium:deviceName': deviceName,
			'appium:noReset': false,
			'appium:app': appPath,
		},
	],
	logLevel: 'warn',
	bail: 0,
	waitforTimeout: 10000,
	connectionRetryTimeout: 120000,
	connectionRetryCount: 3,
	framework: 'cucumber',
	reporters: [
		'spec',
		[
			'allure',
			{
				outputDir: 'allure-results',
				disableWebdriverStepsReporting: true,
				disableWebdriverScreenshotsReporting: true,
				disableMochaHooks: true,
				reportedEnvironmentVars: Object.fromEntries(
					Object.entries({
						PLATFORM: platform,
						BUILD_TYPE: buildType,
						LANGUAGE: language,
						DEVICE_NAME: deviceName,
						APP_PATH: appPath
					}).filter(([_, v]) => v != null && v !== ''),
				),
			},
		],
	],
	cucumberOpts: {
		require: ['./src/step-definitions/**/*.ts'],
		backtrace: false,
		requireModule: [],
		dryRun: false,
		failFast: true,
		name: [],
		snippets: true,
		source: true,
		strict: true,
		failAmbiguousDefinitions: true,
		tagExpression: '',
		timeout: 60000,
		ignoreUndefinedDefinitions: false,
	},

	//
	// =====
	// Hooks
	// =====
	// WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
	// it and to build services around it. You can either apply a single function or an array of
	// methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
	// resolved to continue.
	/**
	 * Gets executed once before all workers get launched.
	 * @param {object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 */
	// onPrepare: function (config, capabilities) {
	// },
	/**
	 * Gets executed before a worker process is spawned and can be used to initialize specific service
	 * for that worker as well as modify runtime environments in an async fashion.
	 * @param  {string} cid      capability id (e.g 0-0)
	 * @param  {object} caps     object containing capabilities for session that will be spawn in the worker
	 * @param  {object} specs    specs to be run in the worker process
	 * @param  {object} args     object that will be merged with the main configuration once worker is initialized
	 * @param  {object} execArgv list of string arguments passed to the worker process
	 */
	// onWorkerStart: function (cid, caps, specs, args, execArgv) {
	// },
	/**
	 * Gets executed just after a worker process has exited.
	 * @param  {string} cid      capability id (e.g 0-0)
	 * @param  {number} exitCode 0 - success, 1 - fail
	 * @param  {object} specs    specs to be run in the worker process
	 * @param  {number} retries  number of retries used
	 */
	// onWorkerEnd: function (cid, exitCode, specs, retries) {
	// },
	/**
	 * Gets executed just before initialising the webdriver session and test framework. It allows you
	 * to manipulate configurations depending on the capability or spec.
	 * @param {object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that are to be run
	 * @param {string} cid worker id (e.g. 0-0)
	 */
	// beforeSession: function (config, capabilities, specs, cid) {
	// },
	/**
	 * Gets executed before test execution begins. At this point you can access to all global
	 * variables like `browser`. It is the perfect place to define custom commands.
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs        List of spec file paths that are to be run
	 * @param {object}         browser      instance of created browser/device session
	 */
	// before: function (capabilities, specs) {
	// },
	/**
	 * Runs before a WebdriverIO command gets executed.
	 * @param {string} commandName hook command name
	 * @param {Array} args arguments that command would receive
	 */
	// beforeCommand: function (commandName, args) {
	// },
	/**
	 * Cucumber Hooks
	 *
	 * Runs before a Cucumber Feature.
	 * @param {string}                   uri      path to feature file
	 * @param {GherkinDocument.IFeature} feature  Cucumber feature object
	 */
	// beforeFeature: function (uri, feature) {
	// },
	/**
	 *
	 * Runs before a Cucumber Scenario.
	 * @param {ITestCaseHookParameter} world    world object containing information on pickle and test step
	 * @param {object}                 context  Cucumber World object
	 */
	// beforeScenario: function (world, context) {
	// },
	/**
	 *
	 * Runs before a Cucumber Step.
	 * @param {Pickle.IPickleStep} step     step data
	 * @param {IPickle}            scenario scenario pickle
	 * @param {object}             context  Cucumber World object
	 */
	// beforeStep: function (step, scenario, context) {
	// },
	/**
	 *
	 * Runs after a Cucumber Step.
	 * @param {Pickle.IPickleStep} step             step data
	 * @param {IPickle}            scenario         scenario pickle
	 * @param {object}             result           results object containing scenario results
	 * @param {boolean}            result.passed    true if scenario has passed
	 * @param {string}             result.error     error stack if scenario failed
	 * @param {number}             result.duration  duration of scenario in milliseconds
	 * @param {object}             context          Cucumber World object
	 */
	// afterStep: function (step, scenario, result, context) {
	// },
	/**
	 *
	 * Runs after a Cucumber Scenario.
	 * @param {ITestCaseHookParameter} world            world object containing information on pickle and test step
	 * @param {object}                 result           results object containing scenario results
	 * @param {boolean}                result.passed    true if scenario has passed
	 * @param {string}                 result.error     error stack if scenario failed
	 * @param {number}                 result.duration  duration of scenario in milliseconds
	 * @param {object}                 context          Cucumber World object
	 */
	// afterScenario: function (world, result, context) {
	// },
	/**
	 *
	 * Runs after a Cucumber Feature.
	 * @param {string}                   uri      path to feature file
	 * @param {GherkinDocument.IFeature} feature  Cucumber feature object
	 */
	// afterFeature: function (uri, feature) {
	// },

	/**
	 * Runs after a WebdriverIO command gets executed
	 * @param {string} commandName hook command name
	 * @param {Array} args arguments that command would receive
	 * @param {number} result 0 - command success, 1 - command error
	 * @param {object} error error object if any
	 */
	// afterCommand: function (commandName, args, result, error) {
	// },
	/**
	 * Gets executed after all tests are done. You still have access to all global variables from
	 * the test.
	 * @param {number} result 0 - test pass, 1 - test fail
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that ran
	 */
	// after: function (result, capabilities, specs) {
	// },
	/**
	 * Gets executed right after terminating the webdriver session.
	 * @param {object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that ran
	 */
	// afterSession: function (config, capabilities, specs) {
	// },
	/**
	 * Gets executed after all workers got shut down and the process is about to exit. An error
	 * thrown in the onComplete hook will result in the test run failing.
	 * @param {object} exitCode 0 - success, 1 - fail
	 * @param {object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {<Object>} results object containing test results
	 */
	// onComplete: function(exitCode, config, capabilities, results) {
	// },
	/**
	 * Gets executed when a refresh happens.
	 * @param {string} oldSessionId session ID of the old session
	 * @param {string} newSessionId session ID of the new session
	 */
	// onReload: function(oldSessionId, newSessionId) {
	// }
	/**
	 * Hook that gets executed before a WebdriverIO assertion happens.
	 * @param {object} params information about the assertion to be executed
	 */
	// beforeAssertion: function(params) {
	// }
	/**
	 * Hook that gets executed after a WebdriverIO assertion happened.
	 * @param {object} params information about the assertion that was executed, including its results
	 */
	// afterAssertion: function(params) {
	// }
};

export const config: WebdriverIO.Config = {
	...defaultConfig,
	...platformConfig,
	capabilities: [
		...defaultConfig.capabilities.map((capability, index) => ({
			...capability,
			...(platformConfig.capabilities[index] || {}),
		})),
		...(platformConfig.capabilities.slice(defaultConfig.capabilities.length) || []),
	],
};
