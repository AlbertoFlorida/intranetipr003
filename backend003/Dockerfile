FROM php:8.3-apache

WORKDIR /var/www/html
COPY ./secrets/oracle/*.zip /opt/oracle/

RUN apt-get update && \
    apt-get -y install apt-utils nano zip unzip git curl libaio1 iputils-ping telnet && \
    \
    # --- Oracle Instant Client ---
    unzip /opt/oracle/instantclient-basic-linux.x64-21.6.0.0.0dbru.zip -d /opt/oracle && \
    unzip /opt/oracle/instantclient-sdk-linux.x64-21.6.0.0.0dbru.zip   -d /opt/oracle && \
    unzip /opt/oracle/instantclient-sqlplus-linux.x64-21.6.0.0.0dbru.zip -d /opt/oracle && \
    rm -rf /opt/oracle/*.zip && \
    ln -s /opt/oracle/instantclient_21_6 /opt/oracle/instantclient && \
    echo /opt/oracle/instantclient > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig && \
    \
    # --- OCI8 ---
    echo 'instantclient,/opt/oracle/instantclient' | pecl install oci8 && \
    docker-php-ext-enable oci8 && \
    \
    # --- Extensiones PHP ---
    docker-php-ext-install mysqli pdo pdo_mysql && \
    \
    # --- Composer ---
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');" && \
    mv composer.phar /usr/local/bin/composer && \
    \
    # --- Symfony CLI ---
    curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash && \
    apt-get -y install symfony-cli && \
    \
    # Limpieza
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# 2. Variables de entorno Oracle
ENV ORACLE_HOME=/opt/oracle/instantclient
ENV TNS_ADMIN=/opt/oracle/instantclient/network/admin
ENV LD_LIBRARY_PATH=/opt/oracle/instantclient:$LD_LIBRARY_PATH
ENV PATH=/opt/oracle/instantclient:$PATH

# 3. Copiamos el proyecto Symfony
COPY ./backend003/app/ .
# 4. Activamos mod_rewrite para Apache
RUN a2enmod rewrite
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
# 5. Exponemos puerto Apache
EXPOSE 80
