import { $ } from '@wdio/globals';
import Page from './page.ts';

const platform = process.env.PLATFORM;
if (!platform) {
	throw new Error('Missing required PLATFORM environment variable');
}

class PageHome extends Page {
	private get btnPageA() {
		if (platform == 'android') {
			return $('android=new UiSelector().className("android.widget.Button").instance(2)');
		} else {
			return $('//XCUIElementTypeButton[@name="Page-A"]');
		}
	}

	public async navigateToPageA() {
		await this.btnPageA.click();
	}
}

export default new PageHome();
