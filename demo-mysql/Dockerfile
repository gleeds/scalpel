FROM mariadb:10.7

ADD demo-mysql/sample_data /docker-entrypoint-initdb.d/

EXPOSE 3306
CMD ["mariadbd"]