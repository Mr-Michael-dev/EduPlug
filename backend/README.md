# Backend Logic

Run ```npm install``` to install dependencies.

cd backend
npm init -y
# Install the necessary dependencies:
npm install express mongoose bcryptjs jsonwebtoken dotenv body-parser cors swagger-jsdoc swagger-ui-express redis
npm install jest supertest

# Import the MongoDB public GPG key:
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

# Add the MongoDB 5.0 repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Reload the local package database:
sudo apt-get update

# Install MongoDB 5.0:
sudo apt-get install -y mongodb-org

# Install Docker (if not already installed):
sudo apt-get update
sudo apt-get install -y docker.io




# Pull and Run MongoDB Docker Image:
sudo docker run --name mongodb -d -p 27017:27017 -v ~/data:/data/db mongo:5.0
This command pulls the MongoDB 5.0 image, runs it in a Docker container, and maps port 27017 (MongoDB's default port) to your local machine.

redis-server
npm run dev

npm install typescript @types/node @types/express @types/mongoose
npx tsc --init
npm install --save-dev @types/bcryptjs @types/jsonwebtoken @types/swagger-jsdoc @types/swagger-ui-express

