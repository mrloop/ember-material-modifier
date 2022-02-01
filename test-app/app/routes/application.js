import Route from '@ember/routing/route';

import cssLoad from 'ember-material-design-components/css-load';

export default class ApplicationRoute extends Route {
  beforeModel() {
    // workaround until figure out how to add at build time
    return cssLoad('list');
  }
}
