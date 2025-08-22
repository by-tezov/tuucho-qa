import { $ } from '@wdio/globals'
import Page from './page';

class PageHome extends Page {


    private get btnPageA () {
        return $('android=new UiSelector().className("android.widget.Button").instance(2)');
    }

    public async navigateToPageA () {
        await this.btnPageA.click();
    }
}

export default new PageHome();
