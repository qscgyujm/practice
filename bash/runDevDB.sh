docker run --name mysql-side \
-p 3306:3306 \
-v ~/Desktop/Project/Boilerplate/react-typesciprt/back/db/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=side \
-e MYSQL_USER=user \
-e MYSQL_PASSWORD=password \
-d mysql:5.7
