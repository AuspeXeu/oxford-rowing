#!/bin/bash
# Source: https://github.com/wmnnd/nginx-certbot

declare -a domains=("bumps.live")
rsa_key_size=4096
data_path="./certbot-data"
email=$(whiptail --inputbox "Please enter an email address" 20 60 "" 3>&1 1>&2 2>&3)

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

for domain in "${domains[@]}"
do
  echo "### Creating dummy certificate for $domain ..."
  path="/etc/letsencrypt/live/$domain"
  mkdir -p "$data_path/conf/live/$domain"
  docker-compose run --rm --entrypoint "\
    openssl req -x509 -nodes -newkey rsa:$rsa_key_size -days 1\
      -keyout '$path/privkey.pem' \
      -out '$path/fullchain.pem' \
      -subj '/CN=localhost'" certbot
  echo
done

echo "### Starting nginx ..."
docker-compose up --force-recreate -d nginx
echo

for domain in "${domains[@]}"
do
  echo "### Deleting dummy certificate for $domain ..."
  docker-compose run --rm --entrypoint "\
    rm -Rf /etc/letsencrypt/live/$domain && \
    rm -Rf /etc/letsencrypt/archive/$domain && \
    rm -Rf /etc/letsencrypt/renewal/$domain.conf" certbot
  echo

  echo "### Requesting Let's Encrypt certificate for $domain ..."

  docker-compose run --rm --entrypoint "\
    certbot certonly --webroot -w /var/www/certbot \
      --email $email \
      -d $domain \
      --rsa-key-size $rsa_key_size \
      --agree-tos \
      --no-eff-email \
      --force-renewal" certbot
  echo
done

echo "### Reloading nginx ..."
docker-compose exec nginx nginx -s reload
