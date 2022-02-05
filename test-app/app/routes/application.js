import Route from '@ember/routing/route';

import importCss from 'ember-material-modifier/import-css';

export default class ApplicationRoute extends Route {
  beforeModel() {
    // workaround until figure out how to add at build time
    return importCss('list');
  }
}
