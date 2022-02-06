# ember-material-modifier

Lightweight Ember.js <a href="https://material.io/components?platform=web" target="_blank" rel="noopener noreferrer">material design</a> integration.


## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


## Installation

```
ember install ember-material-modifier
```


## Usage

ember-material-modifier is designed to be as minimal and unobtrusive as possible. It only downloads the JavaScript and CSS of google material design components that you use.

### Button Example

For instance if you want to use `@material/button` install the package

```sh
npm install @material/button
```

Have a look at the material design docs for the component https://material.io/components/buttons/web#using-buttons or https://github.com/material-components/material-components-web/tree/master/packages/mdc-button. Then copy the example <a href="https://material.io/components/buttons/web#text-button" target="_blank" rel="noopener noreferrer">html</a> to one of your templates.

```hbs
<button class="mdc-button">
  <span class="mdc-button__ripple"></span>
  <span class="mdc-button__label">Text Button</span>
</button>
```

Next you add the `ember-material-modifier` modifier `{{material}}`

```hbs
<button class="mdc-button" {{material 'button'}}>
  <span class="mdc-button__ripple"></span>
  <span class="mdc-button__label">Text Button</span>
</button>
```

Event listeners are added as usual

```hbs
<button class="mdc-button" {{material 'button'}} {{on 'click' this.handleButtonClicked}}>
  <span class="mdc-button__ripple"></span>
  <span class="mdc-button__label">Text Button</span>
</button>
```

If you find yourself duplicating this HTML you can extract it to a component that suits your application.

_app/components/mdc-button.hbs_
```hbs
<button {{...attributes}} class="mdc-button" {{material 'button'}} >
  <span class="mdc-button__ripple"></span>
  <span class="mdc-button__label">{{yield}}</span>
</button>
```

_app/templates/application.hbs_
```hbs
<MdcButton {{on 'click' this.handleButtonClicked}}/>Text Button</MdcButton>
```

### Register component

The `{{material}}` modifier takes two positional arguments. The first is the name of the material design component. For instance you want to use the package `@material/menu` then the modifier is `{{material 'menu'}}`. You can also pass a second arguement to register the instance of material design component class with your application code.


```hbs
<div
  class="mdc-menu mdc-menu-surface"
  {{material 'menu' this.registerMaterialMenu}}
>
```

```js
@action
registerMaterialMenu(mdcMenu) {
  this.mdcMenu = mdcMenu;
}
```

You now have access to the <a href="https://material.io/components/menus/web#span-class-inline-code-mdcmenu-span-properties-and-methods" target="_blank" rel="noopener noreferrer">MDCMenu properites and methods</a>.

### Custom Events

Many on the material design components emit custom events. You can add event listeners for these as you would any other event.

```hbs
<ul
  class="mdc-list"
  {{material 'list'}}
  {{on 'MDCList:action' this.handleMdcListItemSelected}}
>
  <li class="mdc-list-item" tabindex="0">
    <span class="mdc-list-item__ripple"></span>
    <span class="mdc-list-item__text">Item 1 - Division 1</span>
  </li>
</ul>
```

Though in the case of a list item being selected you probably want to use a standard 'click' event listener on the specific list item.

```hbs
<ul
  class="mdc-list"
  {{material 'list'}}
>
  <li
    class="mdc-list-item" tabindex="0"
    {{on 'click' this.handleMdcListItemSelected}}
  >
    <span class="mdc-list-item__ripple"></span>
    <span class="mdc-list-item__text">Item 1 - Division 1</span>
  </li>
</ul>
```

### Theming

Google material design components can be themed using CSS variables.

You can find a list of CSS variables in the google style sheets. For instance if you install any of the `@material/*` packages they have a dependencies on `@material/theme`. You can open `./node_modules/@material/theme/dist/mdc.theme.css` which gives a list of CSS variables.

For example to change the primary text color add the following to your `app.css`

_app.css_
```css
:root {
  --mdc-theme-text-primary-on-background: purple;
};
```

You can use the <a href="https://material.io/resources/color" target="_blank" rel="noopener noreferrer">color tool</a> to preview material design themes.


### CSS Loading

The CSS is lazy loaded when the material design components class is instantiated. It is loaded when the modifier is run after the HTML has been rendered. If it is the first time the material design component has been loaded there will be a noticeable delay until the CSS is applied, you will see the component unstyled.

To prevent this you can eager load the CSS for the material design components you use in the application router. For instance if you use `{{material 'button'}}` in one of your templates add `importCss('button')` to the beforeModel hook of your application route.

_app/controller/application.js_
```js
import Route from '@ember/routing/route';

import importCss from 'ember-material-modifier/import-css';

export default class ApplicationRoute extends Route {
  beforeModel() {
    return importCss('button');
  }
}
```

It should be possible to remove this `importCss` and eager load the needed material design CSS without it. The need to call `importCss` will hopefully be removed.


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
