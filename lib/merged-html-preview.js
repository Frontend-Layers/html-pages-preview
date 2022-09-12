var fs = require("fs");
var path = require("path");

/**
 * Merge Files
 *
 * @param {*} files
 * @param {*} appendFile
 */
function htmlPreview(files, dest) {

  try {
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
    }
  } catch (err) {
    console.error(err)
  }

  /**
   * Header
   */
  fs.appendFileSync(dest, `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Pages Preview</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">

    <style>
    iframe {
      width: 100%;
      border: 0;
    }

    .hide {
      display: none;
    }
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
                const parent = target.closest('.page-preview')

                if (parent) {
                const content = parent.querySelector('.page-preview-content')

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

  <div class="container pt-5">
    <h1>Pages Preview</h1>

    <div class="pt-2 pb-2">
      <ul id="pages_toc"></ul>
    </div>
  </div>
  `);

  /**
   * Body
   */
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    let baseFileName = path.basename(file);
    fs.appendFileSync(dest, `
    <div class="page-preview">
      <div class="page-preview-header">
        <div class="container">
          <div class="pt-4 pb-2">
            <h2 id="${baseFileName}">${baseFileName}</h2>

            <ul>
              <li><a href="#" data-target="toggle">Show/hide</a></li>
              <li><a href="./${baseFileName}" target="_blank">Open in new tab</a></li>
            </ul>

          </div>
        </div>
      </div>

      <div class="page-preview-content">
        <iframe src="./${baseFileName}"></iframe>
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
  `)
}

module.exports = htmlPreview
