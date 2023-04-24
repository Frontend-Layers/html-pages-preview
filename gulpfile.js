import gulp from 'gulp';
const { parallel, watch } = gulp;

import htmlPreview from './index.js';

const htmlPagesPreview = (c) => {
  const src = [
    './src/blog.html',
    './src/pricing.html',
    './src/no-page.html',
    './src/product.html',
  ];

  const dest = './dist/preview.html';

  htmlPreview(src, dest);
  return c();
};

const watcher = () => {
  watch('./src/*.html', htmlPagesPreview);
};

export default
  parallel(
    htmlPagesPreview,
    watcher
  )


