import { $ } from '@wdio/globals'
import Page from './page';

class PageA extends Page {

    public get titleText () {
        return $('android=new UiSelector().text("Page-A")');
    }

}

export default new PageA();
