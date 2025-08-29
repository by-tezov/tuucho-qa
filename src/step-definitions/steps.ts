import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

import PageHome from '../pageobjects/page.home.ts';
import PageA from '../pageobjects/page.a.ts';
import PageB from '../pageobjects/page.b.ts';

import compareScreenshot from '../screenshotHelper.ts';

const pages = {
	home: PageHome,
	pageA: PageA,
	pageB: PageB,
};

// ====== HOME ======
Given(/^I am on Home Page$/, async () => {
	await driver.pause(3000);
	// Handle possible Android warning dialog
	const dialog = await $$('android=new UiSelector().resourceId("android:id/message")');
	if (dialog.length > 0) {
		const allowBtn = await $('android=new UiSelector().resourceId("android:id/button1")');
		if (await allowBtn.isDisplayed()) {
			await allowBtn.click();
		}
	}

	//await expect(pages.home.root).toBeExisting(); // assumes PageHome has a root locator
});

// ====== PAGE A ======
When(/^I navigate to Page A$/, async () => {
	await pages.home.navigateToPageA();
	await driver.pause(1500);
});

Then(/^I see title 'Page A'$/, async () => {
	await expect(pages.pageA.titleText).toBeExisting();
	await expect(pages.pageA.titleText).toHaveText('Page-A');
	await compareScreenshot('pageA');
});

// ====== PAGE B ======
Given(/^I am on Page A$/, async () => {
	const isOnPageA = await pages.pageA.titleText.isExisting();

	if (!isOnPageA) {
		// not on Page A → go through Home first
		await pages.home.navigateToPageA();
		await driver.pause(1500);
		await expect(pages.pageA.titleText).toBeExisting();
	}

	await expect(pages.pageA.titleText).toHaveText('Page-A');
});

When(/^I navigate to Page B$/, async () => {
	await pages.pageA.navigateToPageB();
	await driver.pause(1500);
});

Then(/^I see title 'Page B'$/, async () => {
	await expect(pages.pageB.titleText).toBeExisting();
	await expect(pages.pageB.titleText).toHaveText('Page-B');
	await compareScreenshot('pageB');
});
