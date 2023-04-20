import gulp from 'gulp';
const { parallel, watch } = gulp;

import htmlPreview from './index.js';

const htmlPagesPreview = (c) => {
  const src = [
    './dist/home.html',
    './dist/article.html',
    './dist/product.html'
  ];

  const dest = './dist/preview.html';

  htmlPreview(src, dest);
  return c();
};

const watcher = () => {
  watch('./dist/*.html', htmlPagesPreview);
};

export default
  parallel(
    htmlPagesPreview,
    watcher
  )


