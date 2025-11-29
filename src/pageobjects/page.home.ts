import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageHome extends Page {
	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Inscription à la new letter")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Inscription à la new letter"]');
		}
	}

	public get btn() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(3)');
		} else {
			return $('//XCUIElementTypeButton[@name="Page-A"]');
		}
	}
}

export default new PageHome();
