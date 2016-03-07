'use strict';

const fractal = require('@frctl/fractal');
const md = require('marked');

fractal.set('project.title', 'Pick');

fractal.set('components.default.preview', '@preview');
fractal.set('components.default.status', 'prototype');
fractal.set('components.engine', 'nunjucks');
fractal.set('components.ext', '.html');
fractal.set('components.path', './src/components');
fractal.set('components.title', 'Examples');

fractal.set('docs.engine', 'nunjucks');
fractal.set('docs.path', './src/docs');
fractal.set('docs.title', 'Articles');

fractal.set('plugins.web.static.path', 'dist');

fractal.engine('nunjucks', '@frctl/nunjucks-adapter', {
    filters: {
        markdown: function(str){
            return md(str);
        },
        is_string: function(obj) {
            return typeof obj === 'string';
        }
    }
});

module.exports = fractal;
