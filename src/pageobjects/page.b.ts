import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageB extends Page {

	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Page TLL of single use")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Page TLL of single use"]');
		}
	}
}

export default new PageB();
