import Controller from '@ember/controller';

import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @action
  listActionHandler(evt) {
    console.log('event', evt);
  }

  @action
  handleListItemClick(evt) {
    console.log('event', evt);
  }
}
