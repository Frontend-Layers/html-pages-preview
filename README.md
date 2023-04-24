# HTML Pages Preview

_Merged one HTML page from defined list of the pages/templates for preview_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/andreymatin/html-pages-preview/LICENSE)
[![npm](https://img.shields.io/npm/v/html-pages-preview.svg)](https://www.npmjs.com/package/html-pages-preview)

## Why

Generated preview for all pages on the one for test or demonstration purposes

## How to install

### npm

```shell
npm i html-pages-preview --save-dev
```

### yarn

```shell
yarn html-pages-preview -D
```

## How to use

```javascript
const htmlPreview = require('./lib/merged-html-preview');

const src = [
  './dist/article.html',
  './dist/home.html',
  './dist/product.html'
];

const dest = './dist/preview.html';

htmlPreview(src, dest)
```

## Gulp integration

```javascript
import gulp from 'gulp';
const { parallel, watch } = gulp;

import htmlPreview from 'html-pages-preview';

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
```

## Config parameters

### Default values

```javascript
cfg = {
  styles: '',
  header: 'Pages Preview',
  toc: true,
  newtab: true,
  toggle: true,
  animation: true,
  pane: true,
  title: true,
  titleDivider: '-',
  filename: true,
  baseUrl: '',
  backToIndex: true,
  backToIndexUrl: ''
}

htmlPreview(src, dest, cfg);
```

| Value          | Default | Description |
|----------------|---------|-------------|
| styles         | ''      | custom CSS for header, panel etc. Initial styles based on bootstrap 5  |
| header         | 'Pages Preview' | page header |
| toc            | true | show/hide Table of the content |
| newtab         | true | show/hide new tab link |
| toggle         | true | show/hide toggle link |
| pane           | true | show/hide panel with links and iframe title |
| title          | true | show/hide panel title |
| titleDivider   | -    | Divide filename and page tytle by symbol
| filename       | true | show/hide filename at the panel title |
| baseUrl        | ./   | Base URL for pages (Default is destination folder) |
| backToIndex    | true | show/hide back link |
| backToIndexUrl | ''   | When empty default link is './index.html' |

## Related Projects

I created this and some additional services for [html-base](https://www.npmjs.com/package/html-base) to improve quality of frontend output. Here is the list:

- [scss-reset](https://www.npmjs.com/package/scss-reset)
- [scss-mixins-npm](https://www.npmjs.com/package/scss-mixins-npm)
- [mobile-friendly-test-npm](https://www.npmjs.com/package/mobile-friendly-test-npm)
- [html-speed](https://www.npmjs.com/package/html-speed)
- [css-test-npm](https://www.npmjs.com/package/css-test-npm)

## Contributing

For issues, bugs or imporvements please open an [issue](https://github.com/andreymatin/html-pages-preview/issues/new)


---
[MIT License](LICENSE)