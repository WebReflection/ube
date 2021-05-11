import {HTML, SVG, upgrade, downgrade, observer} from 'builtin-elements';
import {asParams, asStatic} from 'static-params';
import {render as urender, html as uhtml, svg as usvg} from 'uhtml';

const UBE = 'data-ube';

const ube = [];

const indexOf = Class => {
  const i = ube.indexOf(Class);
  return i < 0 ? (ube.push(Class) - 1) : i;
};

const augment = tag => function (template) {
  const args = [template];
  for (let i = 1, {length} = arguments; i < length; i++) {
    let current = arguments[i];
    if (typeof current === 'function' && 'tagName' in current) {
      const {tagName} = current;
      const prev = template[i - 1];
      switch (prev[prev.length - 1]) {
        case '<':
          current = asStatic(`${tagName} ${UBE}=${indexOf(current)}`);
          break;
        case '/':
          current = asStatic(tagName);
          break;
      }
    }
    args.push(current);
  }
  return tag.apply(this, asParams.apply(null, args));
};

export function render(where) {
  const result = urender.apply(this, arguments);
  const be = where.querySelectorAll(`[${UBE}]`);
  for (let i = 0, {length} = be; i < length; i++) {
    const Class = ube[be[i].getAttribute(UBE)];
    be[i].removeAttribute(UBE);
    upgrade(be[i], Class);
  }
  return result;
}

export const html = augment(uhtml);
export const svg = augment(usvg);
export {HTML, SVG, upgrade, downgrade, observer};
