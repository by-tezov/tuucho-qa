import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import compareScreenshot from '../screenshotHelper.ts';

import PageLogin from '../pageobjects/page.login.ts';
import PageHome from '../pageobjects/page.home.ts';
import PageLanguage from '../pageobjects/page.language.ts';
import PageImage from '../pageobjects/page.image.ts';
import PageA from '../pageobjects/page.a.ts';
import PageB from '../pageobjects/page.b.ts';
import PageC from '../pageobjects/page.c.ts';
import PageD from '../pageobjects/page.d.ts';
import PageE from '../pageobjects/page.e.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

const pages: Record<string, any> = {
	'Login Page': PageLogin,
	'Home Page': PageHome,
	'Language Page': PageLanguage,
	'Image Page': PageImage,
	'A Page': PageA,
	'B Page': PageB,
	'C Page': PageC,
	'D Page': PageD,
	'E Page': PageE,
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
	await driver.pause(500);
	await expect(page.title).toBeExisting();
	const expectedText = await page.title.getText();
	currentPageName = pageName;
	console.log(`✅ On page: ${expectedText}`);
});

// ====== WHEN ======
When(/^I navigate to '(.+)'$/, async (pageName: string) => {
	const page = await getPage(currentPageName!);
	await page.btnNext.click();
	await driver.pause(1000);
});

When(/^I navigate to B from E$/, async () => {
    if (currentPageName !== "E Page") {
        throw new Error(`Cannot navigate to B from '${currentPageName}', expected 'E Page'`);
    }
	const page = await getPage(currentPageName!);
	await page.btnPageB.click();
	await driver.pause(1000);
});

When(/^I navigate to A from C$/, async () => {
    if (currentPageName !== "C Page") {
        throw new Error(`Cannot navigate to A from '${currentPageName}', expected 'C Page'`);
    }
	const page = await getPage(currentPageName!);
	await page.btnPageA.click();
	await driver.pause(1000);
});

When(/^I navigate to Image from A$/, async () => {
    if (currentPageName !== "A Page") {
        throw new Error(`Cannot navigate to Image from '${currentPageName}', expected 'A Page'`);
    }
	const page = await getPage(currentPageName!);
	await page.btnImage.click();
	await driver.pause(1000);
});

When(/^I navigate to Language Page$/, async () => {
    if (currentPageName !== "Home Page") {
        throw new Error(`Cannot navigate to Language from '${currentPageName}', expected 'Home Page'`);
    }
	const page = await getPage(currentPageName!);
	await page.btnLanguage.click();
	await driver.pause(1000);
});

When(/^I select french language$/, async () => {
    if (currentPageName !== "Language Page") {
        throw new Error(`Cannot select language from '${currentPageName}', expected 'Language Page'`);
    }
	const page = await getPage(currentPageName!);
	await page.btnFrench.click();
	await driver.pause(1000);
});

When(/^I navigate back$/, async () => {
	const page = await getPage(currentPageName!);
	await page.btnBack.click();
	await driver.pause(1000);
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

Then(/^I should be on French Home Page$/, async () => {
	const page = await getPage('Home Page');
	await expect(page.titleFrench).toBeExisting();
	const text = await page.titleFrench.getText();
	currentPageName = 'Home Page';
	console.log(`✅ Confirmed on: ${text}`);
	await compareScreenshot('Home Page'.replace(/\s+/g, '').toLowerCase());
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
