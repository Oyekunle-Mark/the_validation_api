FROM node:15.6.0-alpine3.10

# Define working directory
WORKDIR /home/node/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# copy files
COPY . .

# document the port exposed by server
EXPOSE 7201

# execute start script
CMD [ "npm", "start" ]
