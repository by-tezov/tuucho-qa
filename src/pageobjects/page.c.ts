import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageC extends Page {

	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Page-C")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Page-C"]');
		}
	}

	public get btnNext() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(2)');
		} else {
			return $('//XCUIElementTypeButton[@name="Next"]');
		}
	}

	public get btnPageA() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(1)');
		} else {
			return $('//XCUIElementTypeButton[@name="Page-A"]');
		}
	}

	public get btnBack() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(0)');
		} else {
			return $('//XCUIElementTypeButton[@name="Back"]');
		}
	}
}

export default new PageC();
