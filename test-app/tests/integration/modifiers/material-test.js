import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | material', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<div {{material 'list'}}></div>`);

    assert.ok(true);
  });

  test('it registers MDC class instance', async function (assert) {
    assert.expect(2);
    this.register = (inst) => {
      assert.equal(inst.constructor.name, 'MDCList');
    };
    await render(hbs`<div {{material 'list' this.register}}></div>`);

    assert.ok(true);
  });

  module('module names', function () {
    test('it works with dasherize @material package names', async function (assert) {
      assert.expect(2);
      this.register = (inst) => {
        assert.equal(inst.constructor.name, 'MDCFormField');
      };
      await render(hbs`<div {{material 'form-field' this.register}}></div>`);

      assert.ok(true);
    });

    test('it work with all lowercase @material package names', async function (assert) {
      assert.expect(2);
      this.register = (inst) => {
        assert.equal(inst.constructor.name, 'MDCTextField');
      };
      await render(hbs`
        <label {{material 'textfield' this.register}} class="mdc-text-field">
          <input class="mdc-text-field__input" type="text">
        </label>
      `);
      assert.ok(true);
    });
  });

  test('it works with CSS only @material packages', async function (assert) {
    await render(
      hbs`<button {{material 'button'}} class='mdc-button'>Press me</button>`
    );
    assert.ok(true);
  });
});
