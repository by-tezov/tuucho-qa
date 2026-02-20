import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageE extends Page {

	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Page-E")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Page-E"]');
		}
	}

	public get btnNext() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(2)');
		} else {
			return $('//XCUIElementTypeButton[@name="next"]');
		}
	}

	public get btnPageB() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(1)');
		} else {
			return $('//XCUIElementTypeButton[@name="Page-B"]');
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

export default new PageE();
