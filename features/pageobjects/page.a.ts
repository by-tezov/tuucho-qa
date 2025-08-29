import { $ } from '@wdio/globals';
import Page from './page';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageA extends Page {
	public get titleText() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Page-A")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Page-A"]');
		}
	}

	private get btnPageB() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(2)');
		} else {
			return $('//XCUIElementTypeButton[@name="Page-B"]');
		}
	}

	public async navigateToPageB() {
		await this.btnPageB.click();
	}
}

export default new PageA();
