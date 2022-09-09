import { modifier } from 'ember-modifier';
import importCss from '../import-css.js';
import { camelize } from '@ember/string';
import { waitForPromise } from '@ember/test-waiters';

function findClass(Module, name) {
  let normalizedName = `MDC${camelize(name)}`.toLowerCase();
  let key = Object.keys(Module).find(
    (key) => key.toLowerCase() === normalizedName
  );
  return Module[key];
}

async function initClass({ element, name, register }) {
  //https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
  let promise = import(`@material/${name}/dist/mdc.${camelize(name)}.js`);

  let Module;
  try {
    Module = await waitForPromise(promise);
  } catch (e) {
    // ignore as some @material packages are CSS only
  }
  if (Module) {
    let Class = findClass(Module, name);
    let instance = new Class(element);
    register?.(instance);
    return instance;
  }
}

//https://material.io/components?platform=web
export default modifier(
  function material(element, [name, register]) {
    // cause flash of unstyled content
    // need to add build time step to add css to head / content-for
    // e.g. when build sees {{material 'list'}} in template add link to css in head
    importCss(name);

    let initPromise = initClass({ element, name, register });

    return () => {
      initPromise.then((component) => component?.destroy());
    };
  },
  { eager: false }
);
