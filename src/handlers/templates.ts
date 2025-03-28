export const homePage = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>File Flash</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        .upload-form {
          border: 2px dashed #ccc;
          padding: 2rem;
          text-align: center;
          border-radius: 8px;
        }
        .button {
          background: #0066cc;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .button:hover {
          background: #0052a3;
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
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          text-align: center;
        }
        .button {
          background: #0066cc;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          margin-top: 1rem;
        }
        .button:hover {
          background: #0052a3;
        }
      </style>
    </head>
    <body>
      <h1>Your file is ready</h1>
      <p>This file will be deleted after download or after 24 hours.</p>
      <a href="/d/${id}" class="button">Download</a>
    </body>
  </html>
`;
