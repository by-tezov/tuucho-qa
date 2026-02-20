import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageLogin extends Page {
	public get title() {
		if (platform == 'android') {
			return $('android=new UiSelector().text("Please enter your credentials")');
		} else {
			return $('//XCUIElementTypeStaticText[@name="Please enter your credentials"]');
		}
	}

	public get login() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.EditText").instance(0)');
		} else {
			return $('//XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTextView[1]');
		}
	}

	public get password() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.EditText").instance(1)');
		} else {
			return $('//XCUIElementTypeScrollView/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTextView[2]');
		}
	}

	public get btnNext() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button")');
		} else {
			return $('//XCUIElementTypeButton[@name="Enter"]');
		}
	}

	public get btnEnter() {
		if (platform == 'android') {
			return null; /* ignored on android since by default keyboard doesn't open */
		} else {
			return $('//XCUIElementTypeButton[@name="Return"]');
		}
	}

}

export default new PageLogin();
