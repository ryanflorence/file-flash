# File Flash

A simple file sharing service that allows users to upload files and share them via a unique URL. Files are automatically deleted after download or after 24 hours.

## Features

- Simple file upload interface
- Unique URLs for file sharing
- Automatic file deletion after download
- Automatic cleanup of files older than 24 hours
- Clean, modern UI

## Prerequisites

- [Bun](https://bun.sh/) installed on your system
- DigitalOcean account with API access
- SSH key added to your DigitalOcean account

## Local Development

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd file-flash
   ```

2. Install dependencies:

   ```bash
   cd src
   bun install
   ```

3. Run the development server:

   ```bash
   bun run index.ts
   ```

4. Open http://localhost:3000 in your browser

## Deployment

1. Copy the terraform.tfvars.example to terraform.tfvars and fill in your values:

   ```bash
   cd terraform
   cp terraform.tfvars.example terraform.tfvars
   ```

2. Edit terraform.tfvars with your DigitalOcean API token and SSH key name

3. Initialize and apply the Terraform configuration:

   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

4. The server will be deployed and the IP address will be displayed in the outputs

## Usage

1. Visit the homepage
2. Click "Choose File" to select a file
3. Click "Upload" to upload the file
4. Share the generated URL with others
5. The file will be automatically deleted after download or after 24 hours

## Security

- Files are stored with random UUIDs as names
- Files are automatically deleted after download or after 24 hours
- Basic firewall rules are in place to allow only necessary ports
- HTTPS is recommended for production use (not included in this basic setup)

## License

MIT
