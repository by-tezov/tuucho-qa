import { Given } from '@wdio/cucumber-framework';

import { expect } from '@wdio/globals'

import PageHome from '../pageobjects/page.home';
import PageA from '../pageobjects/page.a';

const pages = {
    home: PageHome,
    a: PageA,
}

Given(/I navigate to page a/, async () => {
    await driver.pause(3000);
    await pages.home.navigateToPageA()
    await driver.pause(3000);
    await expect(pages.a.titleText).toBeExisting();
    await expect(pages.a.titleText).toHaveText('Page-A');
    await driver.pause(3000);
});

