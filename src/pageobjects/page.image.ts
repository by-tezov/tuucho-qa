import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageImage extends Page {
	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Page-Image")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Page-Image"]');
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

export default new PageImage();
