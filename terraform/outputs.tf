output "droplet_ip" {
  description = "The public IP address of the droplet"
  value       = digitalocean_droplet.file_flash.ipv4_address
}

output "droplet_name" {
  description = "The name of the droplet"
  value       = digitalocean_droplet.file_flash.name
} 