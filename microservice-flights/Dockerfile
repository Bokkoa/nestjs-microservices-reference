
FROM node:14

# IN DOCKER
WORKDIR /app

# FROM ROOT TO DOCKER
COPY package.json .

# INSTALLING DEPENDENCIES IN DOCKER
RUN npm install

COPY ./dist ./src    

CMD ["node", "src/main.js"]