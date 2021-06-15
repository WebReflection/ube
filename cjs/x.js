'use strict';
const {bind, createPragma, defaultAttribute} = require('jsx2tag');
const {html} = require('./index.js');

const createElement = createPragma(html);
self.React = {
  createElement,
  Fragment: createElement
};

exports.bind = bind;
exports.createPragma = createPragma;
exports.defaultAttribute = defaultAttribute;
(m => Object.keys(m).map(k => k !== 'default' && (exports[k] = m[k])))
(require('./index.js'));
