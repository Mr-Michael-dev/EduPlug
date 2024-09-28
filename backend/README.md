# Backend Logic
-----------------

## Install the necessary dependencies:
```sh
npm install express mongoose bcryptjs jsonwebtoken dotenv body-parser cors swagger-jsdoc swagger-ui-express redis
```
```sh
npm install jest supertest
```

To install all dependencies run 
```sh 
npm install
```

## Import the MongoDB public GPG key:
```sh
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

## Add the MongoDB 6.0 repository
```sh
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

## Reload the local package database:
```sh
sudo apt-get update
```

## Install MongoDB 6.0:
```sh
sudo apt-get install -y mongodb-org
```
## check if mongodb already runing
```sh
sudo systemctl status mongod
```

### if not runing, start it
```sh
sudo systemctl start mongod
```

## To run mongodb on a docker image
### Install Docker (if not already installed):
1. ```sh
    sudo apt-get update
    sudo apt-get install -y docker.io
    ```

### Pull and Run MongoDB Docker Image:
    ```sh
    sudo docker run --name mongodb -d -p 27017:27017 -v ~/data:/data/db mongo:6.0
    ```
This command pulls the MongoDB 6.0 image, runs it in a Docker container, and maps port 27017 (MongoDB's default port) to your local machine.

You must start the redis server in the background with
```sh
redis-server &
```

## Run the server with
```sh
npm run serve
```

If having types issues you can run the following
```sh
npm install typescript @types/node @types/express @types/mongoose
npx tsc --init
npm install --save-dev @types/bcryptjs @types/jsonwebtoken @types/swagger-jsdoc @types/swagger-ui-express
```


#### To Compile files
In /src run
```sh
tsc
```
### check the [routes](/backend/src/routes/) for all routes defined

## Dont edit this file except you know what yu are doing
### check the [index.ts](/backend/src/index.ts) for the server logic
