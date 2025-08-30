import { Given } from '@wdio/cucumber-framework';

import { expect } from '@wdio/globals';

import PageHome from '../pageobjects/page.home';
import PageA from '../pageobjects/page.a';
import PageB from '../pageobjects/page.b';
import compareScreenshot from '../screenshotHelper.js';
import type { ImageCompareResult } from './types';
import { addAttachment } from '@wdio/allure-reporter';
import fs from 'fs-extra';

const pages = {
	home: PageHome,
	pageA: PageA,
	pageB: PageB,
};

Given(/I navigate to page a/, async () => {
	await driver.pause(1500);
	await pages.home.navigateToPageA();
	await driver.pause(1500);
	await expect(pages.pageA.titleText).toBeExisting();
	await expect(pages.pageA.titleText).toHaveText('Page-A');
	await driver.pause(1500);
	const result: ImageCompareResult = await driver.checkScreen('pageA');
	if (result.misMatchPercentage > 0) {
		addAttachment('pageA-diff', fs.readFileSync(result.folders.diff), 'image/png');
		addAttachment('pageA-baseline', fs.readFileSync(result.folders.baseline), 'image/png');
		throw new Error(
			`[Visual] Screenshot mismatch for pageA: ${result.misMatchPercentage}%`
		);
	}
	await pages.pageA.navigateToPageB();
	await driver.pause(1500);
	await expect(pages.pageB.titleText).toBeExisting();
	await expect(pages.pageB.titleText).toHaveText('Page-B');
	await driver.checkScreen('pageB');
});
