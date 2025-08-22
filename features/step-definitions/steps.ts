import { Given } from '@wdio/cucumber-framework';

import { expect } from '@wdio/globals'

import HomePage from '../pageobjects/home.page';
import ProfilePage from '../pageobjects/profile.page';

const pages = {
    home: HomePage,
    profile: ProfilePage,
}

Given(/I navigate to profile page/, async () => {
    await driver.pause(3000);
    await pages.home.navigateToProfile()
    await driver.pause(3000);
    await expect(ProfilePage.workInProgressText).toBeExisting();
    await expect(ProfilePage.workInProgressText).toHaveText('This is currently work in progress');
    await driver.pause(3000);
});

