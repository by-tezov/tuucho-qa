import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageA extends Page {

	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Page-A")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Page-A"]');
		}
	}

	public get btnNext() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(2)');
		} else {
			return $('//XCUIElementTypeButton[@name="Next"]');
		}
	}

	public get btnBack() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(0)');
		} else {
			return $('//XCUIElementTypeButton[@name="Back"]');
		}
	}

	public get btnImage() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(1)');
		} else {
			return $('//XCUIElementTypeButton[@name="Page-Image"]');
		}
	}
}

export default new PageA();
