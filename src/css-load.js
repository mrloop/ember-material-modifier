export default function cssLoad(name) {
  return import(`@material/${name}/dist/mdc.${name}.css`);
}
