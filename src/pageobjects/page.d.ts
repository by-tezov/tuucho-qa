import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageD extends Page {

	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Page-D")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Page-D"]');
		}
	}

	public get btnNext() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(2)');
		} else {
			return $('//XCUIElementTypeButton[@name="next"]');
		}
	}

	public get btnBack() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(1)');
		} else {
			return $('//XCUIElementTypeButton[@name="back"]');
		}
	}
}

export default new PageD();
