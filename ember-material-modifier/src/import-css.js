export default function importCss(name) {
  return import(`@material/${name}/dist/mdc.${name}.css`);
}
