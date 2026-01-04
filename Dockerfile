FROM php:8.4-cli

# Install system dependencies
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

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application files
COPY . .

# Create Laravel required directories BEFORE composer install
RUN mkdir -p \
    storage/framework/sessions \
    storage/framework/views \
    storage/framework/cache \
    storage/logs \
    bootstrap/cache

# Set permissions
RUN chmod -R 775 storage bootstrap/cache

# Install PHP dependencies
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# Expose Render port
EXPOSE 10000

# Start Laravel (single command, Render-compatible)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
