# Get SSH key
data "digitalocean_ssh_key" "key" {
  name = var.ssh_key_name
}

# Create droplet
resource "digitalocean_droplet" "file_flash" {
  name     = var.droplet_name
  size     = var.droplet_size
  image    = "ubuntu-22-04-x64"
  region   = var.region
  ssh_keys = [data.digitalocean_ssh_key.key.id]

  # Basic firewall rules
  tags = ["file-flash"]

  # User data script to install dependencies and setup the application
  user_data = <<-EOF
              #!/bin/bash
              # Update system
              apt-get update
              apt-get upgrade -y

              # Install curl and other dependencies
              apt-get install -y curl git nginx

              # Install Bun
              curl -fsSL https://bun.sh/install | bash

              # Create app directory
              mkdir -p /opt/file-flash
              cd /opt/file-flash

              # Clone the repository
              git clone https://github.com/ryanflorence/file-flash.git .

              # Install dependencies
              bun install

              # Create systemd service
              cat > /etc/systemd/system/file-flash.service << 'EOL'
              [Unit]
              Description=File Flash Service
              After=network.target

              [Service]
              Type=simple
              User=root
              WorkingDirectory=/opt/file-flash
              ExecStart=/root/.bun/bin/bun run index.ts
              Restart=always

              [Install]
              WantedBy=multi-user.target
              EOL

              # Configure Nginx
              cat > /etc/nginx/sites-available/file-flash << 'EOL'
              server {
                  listen 80;
                  server_name _;

                  location / {
                      proxy_pass http://localhost:3000;
                      proxy_http_version 1.1;
                      proxy_set_header Upgrade $http_upgrade;
                      proxy_set_header Connection 'upgrade';
                      proxy_set_header Host $host;
                      proxy_cache_bypass $http_upgrade;
                  }
              }
              EOL

              ln -s /etc/nginx/sites-available/file-flash /etc/nginx/sites-enabled/
              rm /etc/nginx/sites-enabled/default

              # Start the services
              systemctl enable file-flash
              systemctl start file-flash
              systemctl restart nginx

              # Setup cleanup cron job
              echo "0 * * * * /opt/file-flash/scripts/cleanup.sh" | crontab -
              EOF
}

# Create firewall
resource "digitalocean_firewall" "file_flash" {
  name = "file-flash-firewall"

  droplet_ids = [digitalocean_droplet.file_flash.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range           = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range           = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
} 