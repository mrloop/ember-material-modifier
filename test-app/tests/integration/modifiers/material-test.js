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

  test('it works with dasherize @material package names', async function (assert) {
    assert.expect(2);
    this.register = (inst) => {
      assert.equal(inst.constructor.name, 'MDCFormField');
    };
    await render(hbs`<div {{material 'form-field' this.register}}></div>`);

    assert.ok(true);
  });
});
