FROM php:8.3-cli

# System dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    curl \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        zip \
        bcmath \
        intl

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# App directory
WORKDIR /var/www

# Copy files
COPY . .

# Install dependencies (verbose, no cache issues)
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --no-progress \
    -vvv

# Permissions
RUN chmod -R 775 storage bootstrap/cache

# Render port
EXPOSE 10000

# Start app (ONLY ONE CMD)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
