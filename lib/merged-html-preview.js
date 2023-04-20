import fs from 'fs';
import path from 'path';

/**
 * Merge Files
 *
 * @param {*} files
 * @param {*} appendFile
 */
const htmlPreview = (src, dest,
  cfg = {
    styles: '',
    header: 'Pages Preview',
    toc: true,
    newtab: true,
    toggle: true,
    animation: true,
    pane: true,
    title: true,
    filename: true
  }
) => {

  /**
   * Get title from HTML page
   * @param {*} body
   * @returns
   */
  const getTitle = (body) => {
    // regular expression to parse contents of the <title> tag
    let match = body.match(/<title>([^<]*)<\/title>/);
    if (!match || typeof match[1] !== 'string') return false;
    return match[1];
  };

  /**
   * Config
   */

  // Styles
  let styles = '';
  if (cfg.styles) {
    styles = cfg.styles;
  }

  // Header
  let header = 'Pages Preview';
  if (cfg.header) {
    header = cfg.header;
  }

  try {
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
  } catch (err) {
    console.error(err);
  }

  /**
   * Header
   */
  fs.appendFileSync(dest, `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${header}</title>
    <meta name="description" content="Pages preview">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">

    <style>
      iframe {
        width: 100%;
        border: 0;
      }

      .hide {
        display: none;
      }

      .hpp-header {
        background: #eee;
      }

      ${styles}
    </style>


    <script>
      window.addEventListener('DOMContentLoaded', (event) => {

        function toc() {
          const titles = document.querySelectorAll('h2')
          const toc = document.querySelector('#pages_toc')

          if (titles && toc) {

            titles.forEach(element => {
              const titleId = element.id
              const li = document.createElement('li')
              const a = document.createElement('a')

              a.href = '#' + titleId
              a.innerText = titleId

              li.appendChild(a);
              toc.appendChild(li)
            })
          }
        }

        function autoresize() {
          let iframeDocHeight = 0;

          const iframes = document.querySelectorAll('iframe')

          if (iframes) {
            iframes.forEach(element => {

              element.addEventListener('load', (event) => {
                iframeDocHeight = element.contentWindow.document.body.scrollHeight

                if (iframeDocHeight) {
                  element.height = iframeDocHeight + 60
                }

              })
            });
          }
        }

        function toggle() {
          const btnToggle = document.querySelectorAll('[data-target="toggle"]')

          if (btnToggle) {

            btnToggle.forEach(element => {

              element.addEventListener('click', (e) => {
                e.preventDefault
                const target = e.currentTarget
                const parent = target.closest('.hpp')

                if (parent) {
                const content = parent.querySelector('.hpp-content')

                  if (content) {
                    content.classList.toggle('hide')
                  }
                }
              })

            });
          }
        }

        autoresize()
        toc()
        toggle()


      });
    </script>

  </head>
  <body>

  <div class="container-fluid">
    <h1>${header}</h1>

    <div class="pt-2 pb-2"${cfg.toc ? `` : ` style="display: none"`}>
      <ul id="pages_toc"></ul>
    </div>
  </div>
  `);

  /**
   * Body
   */
  for (let i = 0; i < src.length; i++) {
    const file = src[i];

    let baseFileName = path.basename(file);

    let title = '';
    const data = fs.readFileSync(file, 'utf8');
    if (data) {
      title = getTitle(data)
    }

    fs.appendFileSync(dest, `
    <div class="hpp">
      <div class="hpp-header"${cfg.pane ? `` : ` style="display: none;"`}>
        <div class="container-fluid">
          <div class="pt-4 pb-2">
            <h2 id="${baseFileName}">${cfg.filename ? `${baseFileName}` : ''}${cfg.title ? `${title ? ` - ${title}` : ''}`:``}</h2>

            <ul>
              ${cfg.toggle ? `<li class="hpp-link-toggle"><a href="#" data-target="toggle">Show/hide</a></li>` : ''}
              ${cfg.newtab ? `<li class="hpp-link-newtab"><a href="./${baseFileName}" target="_blank">Open in new tab</a></li>` : ''}
            </ul>

          </div>
        </div>
      </div>

      <div class="hpp-content">
        <iframe class="hpp-iframe" src="./${baseFileName}"></iframe>
      </div>
    </div>
    `);
  }


  /**
   * Footer
   */
  fs.appendFileSync(dest, `
    </body>
    </html>
  `);
};

export default htmlPreview;

