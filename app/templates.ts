export const homePage = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>File Flash</title>
      <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&family=VT323&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'VT323', monospace;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: #000;
          color: #fff;
          font-size: 1.4rem;
        }
        h1 {
          font-family: 'Rock Salt', cursive;
          color: #ff00ff;
          text-shadow: 2px 2px #00ff00;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        .upload-form {
          border: 3px solid #ff00ff;
          padding: 2rem;
          text-align: center;
          background: #000;
          box-shadow: 0 0 20px #ff00ff;
        }
        .button {
          background: #ff00ff;
          color: #fff;
          padding: 1rem 2rem;
          border: 2px solid #00ff00;
          border-radius: 0;
          cursor: pointer;
          font-family: 'VT323', monospace;
          font-size: 1.6rem;
          text-transform: uppercase;
          transition: all 0.3s;
        }
        .button:hover {
          background: #00ff00;
          color: #000;
          transform: scale(1.05);
        }
        input[type="file"] {
          color: #fff;
          margin: 1rem 0;
          font-size: 1.4rem;
        }
      </style>
    </head>
    <body>
      <h1>File Flash</h1>
      <div class="upload-form">
        <form action="/upload" method="post" enctype="multipart/form-data">
          <input type="file" name="file" required>
          <br><br>
          <button type="submit" class="button">Upload</button>
        </form>
      </div>
    </body>
  </html>
`;

export const filePage = (id: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Download File</title>
      <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&family=VT323&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'VT323', monospace;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          text-align: center;
          background: #000;
          color: #fff;
          font-size: 1.4rem;
        }
        h1 {
          font-family: 'Rock Salt', cursive;
          color: #ff00ff;
          text-shadow: 2px 2px #00ff00;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        .button {
          background: #ff00ff;
          color: #fff;
          padding: 1rem 2rem;
          border: 2px solid #00ff00;
          border-radius: 0;
          cursor: pointer;
          font-family: 'VT323', monospace;
          font-size: 1.6rem;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-block;
          margin-top: 1rem;
          transition: all 0.3s;
        }
        .button:hover {
          background: #00ff00;
          color: #000;
          transform: scale(1.05);
        }
      </style>
    </head>
    <body>
      <h1>Your file is ready</h1>
      <a href="/d/${id}" class="button">Download</a>
    </body>
  </html>
`;

export const confirmationPage = (id: string, url: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Upload Successful</title>
      <link href="https://fonts.googleapis.com/css2?family=Rock+Salt&family=VT323&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'VT323', monospace;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          text-align: center;
          background: #000;
          color: #fff;
          font-size: 1.4rem;
        }
        h1 {
          font-family: 'Rock Salt', cursive;
          color: #ff00ff;
          text-shadow: 2px 2px #00ff00;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        .url-container {
          background: #111;
          padding: 1.5rem;
          border: 2px solid #ff00ff;
          margin: 1.5rem 0;
          word-break: break-all;
          box-shadow: 0 0 10px #ff00ff;
          font-size: 1.6rem;
        }
        .copy-button {
          background: #ff00ff;
          color: #fff;
          padding: 1rem 2rem;
          border: 2px solid #00ff00;
          border-radius: 0;
          cursor: pointer;
          font-family: 'VT323', monospace;
          font-size: 1.6rem;
          text-transform: uppercase;
          margin: 0.5rem;
          transition: all 0.3s;
        }
        .copy-button:hover {
          background: #00ff00;
          color: #000;
          transform: scale(1.05);
        }
        .copy-message {
          color: #00ff00;
          margin-top: 0.5rem;
          opacity: 0;
          transition: opacity 0.3s;
          font-size: 1.6rem;
        }
        .button {
          background: #ff00ff;
          color: #fff;
          padding: 1rem 2rem;
          border: 2px solid #00ff00;
          border-radius: 0;
          cursor: pointer;
          font-family: 'VT323', monospace;
          font-size: 1.6rem;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-block;
          margin-top: 1rem;
          transition: all 0.3s;
        }
        .button:hover {
          background: #00ff00;
          color: #000;
          transform: scale(1.05);
        }
        .info-text {
          color: #ff00ff;
          font-size: 1.6rem;
          margin: 1.5rem 0;
          text-shadow: 1px 1px #00ff00;
        }
      </style>
    </head>
    <body>
      <h1>Upload Successful!</h1>
      <p>Your file has been uploaded and is ready to share.</p>
      <p class="info-text">Note: This file will be deleted after download or after 24 hours.</p>
      <div class="url-container">
        <span id="share-url">${url}</span>
      </div>
      <div id="copy-message" class="copy-message">URL copied to clipboard!</div>
      <button class="copy-button" onclick="copyUrl()">Copy URL</button>

      <script>
        function copyUrl() {
          const url = document.getElementById('share-url').textContent;
          navigator.clipboard.writeText(url).then(() => {
            const message = document.getElementById('copy-message');
            message.style.opacity = '1';
            setTimeout(() => {
              message.style.opacity = '0';
            }, 2000);
          });
        }
      </script>
    </body>
  </html>
`;
