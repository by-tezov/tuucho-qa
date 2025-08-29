import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageB extends Page {
	public get titleText() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Page-B")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Page-B"]');
		}
	}
}

export default new PageB();
