variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "ssh_key_name" {
  description = "Name of the SSH key to use for the droplet"
  type        = string
}

variable "region" {
  description = "DigitalOcean region"
  type        = string
  default     = "nyc1"
}

variable "droplet_size" {
  description = "Size of the droplet"
  type        = string
  default     = "s-1vcpu-1gb"
}

variable "droplet_name" {
  description = "Name of the droplet"
  type        = string
  default     = "file-flash"
} 