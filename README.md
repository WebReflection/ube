# µbe

A [builtin-elements](https://github.com/WebReflection/builtin-elements#readme) based [µce](https://github.com/WebReflection/uce#readme) alternative:

  * based on [µhtml](https://github.com/WebReflection/uhtml#readme) engine
  * requires zero polyfills and it doesn't need a registry
  * works *SSR* too (coming soon)

```js
// Some Builtin definition example
import {HTML, render, html} from 'ube';

export default class Div extends HTML.Div {
  upgradedCallback() {
    const {hello} = this.dataset;
    render(this, html`Hello <strong>${hello}</strong> 👋`);
    // this.textContent and this.innerHTML work too
  }
}


// Some rendering
import {render, html} from 'ube';
import Div from './div-component.js';

render(document.body, html`<${Div} data-hello="µbe" />`);
```

## Companions

  * [µhtml-intents](https://github.com/WebReflection/uhtml-intents#readme)
  * [µhooks-intents](https://github.com/WebReflection/uhooks#readme)

**[Live Demo](https://codepen.io/WebReflection/pen/gOmaXrZ?editors=0010)**

```js
import {HTML, render, html} from 'ube';
import {hooked, useState} from 'uhooks';

class Div extends HTML.Div {
  upgradedCallback() {
    this.render = hooked(this.render);
    this.render();
  }
  render() {
    const [count, update] = useState(0);
    render(this, html`
      <button @click=${() => update(count + 1)}>
        Clicked ${count} times
      </button>
    `);
  }
}

render(document.body, html`Click test <${Div} />`);
```

## Previous Work / Similar Libraries

  * [kaboobie](https://github.com/WebReflection/kaboobie/#readme) is the most similar project, but the elements lifecycle is different, as these are replaced once discovered, while *builtin-elements* are real builtin elements with Custom Elements super power, hence more portable, and *SSR* compatible
  * [µland](https://github.com/WebReflection/uland#readme), at the core of *kaboobie*, is the one that inspired me the most
  * [wicked-elements](https://github.com/WebReflection/wicked-elements#readme) and [hooked-elements](https://github.com/WebReflection/hooked-elements#readme) also work in a similar way, and each element can have multiple definitions, but it requires a registry

