import { $ } from '@wdio/globals'
import Page from './page';

class HomePage extends Page {


    private get btnProfile () {
        return $('android=new UiSelector().description("PROFILE")');
    }

    public async navigateToProfile () {
        await this.btnProfile.click();
    }
}

export default new HomePage();
