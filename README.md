# HTML Test

_Generates one HTML page from defined list of the pages for comfort preview_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/andreymatin/html-pages-preview/LICENSE)
[![npm](https://img.shields.io/npm/v/html-pages-preview.svg)](https://www.npmjs.com/package/html-pages-preview)

## How to install

### npm

```shell
npm i html-pages-preview
```

### yarn

```shell
yarn html-pages-preview
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

## Related Projects

I cretaed this and some additional services for [html-initial-bundle](https://www.npmjs.com/package/html-initial-bundle)
to improve quality of frontend output. Here is the list:

- [scss-reset](https://www.npmjs.com/package/scss-reset)
- [scss-mixins-npm](https://www.npmjs.com/package/scss-mixins-npm)
- [mobile-friendly-test-npm](https://www.npmjs.com/package/mobile-friendly-test-npm)
- [html-speed](https://www.npmjs.com/package/html-speed)
- [css-test-npm](https://www.npmjs.com/package/css-test-npm)


## Contributing

For issues, bugs or imporvements please open an [issue](https://github.com/andreymatin/html-pages-preview/issues/new)


---
[MIT License](LICENSE)