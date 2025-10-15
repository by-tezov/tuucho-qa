import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import compareScreenshot from '../screenshotHelper.ts';

import PageLogin from '../pageobjects/page.login.ts';
import PageHome from '../pageobjects/page.home.ts';
import PageA from '../pageobjects/page.a.ts';
import PageB from '../pageobjects/page.b.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

const pages: Record<string, any> = {
	'Login Page': PageLogin,
	'Home Page': PageHome,
	'A Page': PageA,
	'B Page': PageB,
};

// ====== STATE ======
let currentPageName: string | null = null;

// ====== HELPERS ======
async function getPage(name: string) {
	const page = pages[name];
	if (!page) throw new Error(`Unknown page: ${name}`);
	return page;
}

// ====== GIVEN ======
Given(/^I am on '(.+)'$/, async (pageName: string) => {
	const page = await getPage(pageName);

	await driver.pause(1500);
	await expect(page.title).toBeExisting();
	const expectedText = await page.title.getText();
	currentPageName = pageName;
	console.log(`✅ On page: ${expectedText}`);
});

// ====== WHEN ======
When(/^I navigate to '(.+)'$/, async (pageName: string) => {
	const page = await getPage(currentPageName!);
	await page.btn.click();
	await driver.pause(1500);
});

// ====== THEN ======
Then(/^I should be on '(.+)'$/, async (pageName: string) => {
	const page = await getPage(pageName);
	await expect(page.title).toBeExisting();
	const text = await page.title.getText();
	currentPageName = pageName;
	console.log(`✅ Confirmed on: ${text}`);
	await compareScreenshot(pageName.replace(/\s+/g, '').toLowerCase());
});

// ====== AND (LOGIN INPUTS) ======
Given(/^I enter login '(.+)'$/, async (login: string) => {
	await expect(PageLogin.login).toBeExisting();
	await PageLogin.login.setValue(login);
});

Given(/^I enter password '(.+)'$/, async (password: string) => {
	await expect(PageLogin.password).toBeExisting();
	await PageLogin.password.setValue(password);
});
