#!/bin/bash

set -e

echo -n "Docker entrypoint script..."

# /home/u2f_server/app/node_modules/.bin/knex migrate:latest

# echo -n "Setting NODE_ENV & PATH in /etc/environment."
# env | grep NODE_ENV >> /etc/environment
# printf "\nPATH=$PATH:/usr/local/bin:/usr/bin\n" >> /etc/environment

echo -n "Running database migrations: "

function db_migrations
{
  "exit" | /home/u2f_server/app/node_modules/.bin/knex migrate:latest | grep "migration\|Already" > /dev/null;
}

while ! db_migrations
do
  echo -n .
  sleep 3
done
echo -n " database migration complete!"

npm run test:coverage


exec "$@"
