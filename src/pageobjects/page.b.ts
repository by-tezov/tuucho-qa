import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageB extends Page {

	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Page-B")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Page-B"]');
		}
	}

	public get btnNext() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(1)');
		} else {
			return $('//XCUIElementTypeButton[@name="next"]');
		}
	}

	public get btnBack() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(0)');
		} else {
			return $('//XCUIElementTypeButton[@name="back"]');
		}
	}

}

export default new PageB();
