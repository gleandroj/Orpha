#!/bin/bash

# Artisan commands
/app/.heroku/php/bin/php /app/artisan clear-compiled
/app/.heroku/php/bin/php /app/artisan optimize

# Boot up!
vendor/bin/heroku-php-nginx -C nginx_app.conf public/