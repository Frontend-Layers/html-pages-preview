import htmlPreview from './lib/merged-html-preview.js';

const src = [
  './dist/article.html',
  './dist/home.html',
  './dist/product.html'
];

const dest = './dist/preview.html';


htmlPreview(src, dest);
