# Dockerfile for Node Express Backend

FROM node:16

# Working directory be app
WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 5000

CMD ["npm","start"]