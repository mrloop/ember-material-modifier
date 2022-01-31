import { modifier } from 'ember-modifier';

function importName(name) {
  return `@material/${name}`;
}

function className(name) {
  return `MDC${name.replace(/^\w/, (c) => c.toUpperCase())}`;
}

export default modifier(function material(element, name) {
  import(`mdc.${name}.css`);
  let initPromise = import(importName(name)).then((Module) => {
    return new Module[className](element);
  });

  return () => {
    initPromise.then((component) => component.destroy());
  };
});
