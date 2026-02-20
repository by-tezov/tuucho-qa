import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageHome extends Page {
	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Newsletter subscription")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Newsletter subscription"]');
		}
	}

	public get titleFrench() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Inscription à la newsletter")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Inscription à la newsletter"]');
		}
	}

	public get btnNext() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(3)');
		} else {
			return $('//XCUIElementTypeButton[@name="Next"]');
		}
	}

	public get btnLanguage() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.view.View").instance(3)');
		} else {
			return $(''); //TODO
		}
	}
}

export default new PageHome();
