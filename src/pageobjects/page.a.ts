import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageA extends Page {

	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Page TLL of 10s")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Page TLL of 10s"]');
		}
	}

	public get btn() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(1)');
		} else {
			return $('//XCUIElementTypeButton[@name="Page-B"]');
		}
	}
}

export default new PageA();
