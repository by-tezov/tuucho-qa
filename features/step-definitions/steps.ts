import { Given } from '@wdio/cucumber-framework';

import { expect } from '@wdio/globals';

import PageHome from '../pageobjects/page.home';
import PageA from '../pageobjects/page.a';
import PageB from '../pageobjects/page.b';

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
	await pages.pageA.navigateToPageB();
	await driver.pause(1500);
	await expect(pages.pageB.titleText).toBeExisting();
	await expect(pages.pageB.titleText).toHaveText('Page-B');
});
