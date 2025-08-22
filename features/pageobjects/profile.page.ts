import { $ } from '@wdio/globals'
import Page from './page';

class ProfilePage extends Page {

    public get workInProgressText () {
        return $('android=new UiSelector().text("This is currently work in progress")');
    }


}

export default new ProfilePage();
