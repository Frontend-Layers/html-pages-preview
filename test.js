var htmlPreview = require('./lib/merged-html-preview');

var src = [
  './dist/article.html',
  './dist/home.html',
  './dist/product.html'
];

var dest = './dist/preview.html';


htmlPreview(src, dest)
