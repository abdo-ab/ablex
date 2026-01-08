FROM php:8.4-cli

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
        intl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# App directory
WORKDIR /var/www

# Copy app
COPY . .

# Install deps
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install \
    && npm run build \
    && rm -rf node_modules

# Expose port
EXPOSE 10000

# Runtime fix (THIS IS THE KEY)
CMD mkdir -p /tmp/storage/framework/sessions \
    /tmp/storage/framework/views \
    /tmp/storage/framework/cache \
    /tmp/storage/logs \
 && chmod -R 777 /tmp/storage \
 && php artisan config:clear \
 && php artisan serve --host=0.0.0.0 --port=10000
