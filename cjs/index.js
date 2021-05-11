'use strict';
const {HTML, SVG, upgrade, downgrade, observer} = require('builtin-elements');
const {asParams, asStatic} = require('static-params');
const {render: urender, html: uhtml, svg: usvg} = require('uhtml');

const UBE = 'data-ube';

const ube = [];

const indexOf = Class => {
  const i = ube.indexOf(Class);
  return i < 0 ? (ube.push(Class) - 1) : i;
};

const augment = tag => {
  function ube() { return reshaped.apply(tag, arguments); }
  ube.for = (ref, id) => function () {
    return reshaped.apply(tag.for(ref, id), arguments);
  };
  return ube;
};

function render(where) {
  const result = urender.apply(this, arguments);
  const be = where.querySelectorAll(`[${UBE}]`);
  for (let i = 0, {length} = be; i < length; i++) {
    const Class = ube[be[i].getAttribute(UBE)];
    be[i].removeAttribute(UBE);
    upgrade(be[i], Class);
  }
  return result;
}
exports.render = render

const html = augment(uhtml);
exports.html = html;
const svg = augment(usvg);
exports.svg = svg;
exports.HTML = HTML;
exports.SVG = SVG;
exports.upgrade = upgrade;
exports.downgrade = downgrade;
exports.observer = observer;

function reshaped(template) {
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
  return this.apply(null, asParams.apply(null, args));
}
