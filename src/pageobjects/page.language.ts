import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageLanguage extends Page {
	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Choose language")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Choose language"]');
		}
	}

	public get btnFrench() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.view.View").instance(4)');
		} else {
			return $('//XCUIElementTypeImage[@name="French flag"]');
		}
	}
}

export default new PageLanguage();
