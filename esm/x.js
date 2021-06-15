import {bind, createPragma, defaultAttribute} from 'jsx2tag';
import {html} from './index.js';

const createElement = createPragma(html);
self.React = {
  createElement,
  Fragment: createElement
};

export {bind, createPragma, defaultAttribute};
export * from './index.js';
