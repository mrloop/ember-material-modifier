import { modifier } from 'ember-modifier';
import importCss from '../import-css.js';
import { camelize, capitalize } from '@ember/string';

function className(name) {
  return `MDC${capitalize(camelize(name))}`;
}

async function initClass({ element, name, register }) {
  //https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
  let initPromise = import(`@material/${name}/dist/mdc.${camelize(name)}.js`);

  let Module = await initPromise;
  let Class = Module[className(name)];
  let instance = new Class(element);
  register?.(instance);
}

//https://material.io/components?platform=web
export default modifier(function material(element, [name, register]) {
  // cause flash of unstyled content
  // need to add build time step to add css to head / content-for
  // e.g. when build sees {{material 'list'}} in template add link to css in head
  importCss(name);

  let initPromise = initClass({ element, name, register });

  return () => {
    initPromise.then((component) => component.destroy());
  };
});
