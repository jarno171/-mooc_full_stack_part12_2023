FROM node:16

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm ci

# npm start is the command to start the application in development mode
RUN npm run build

# build the static serving site
RUN cd serve_static && npm ci & cd ..

# now run simple static build server as prod frontend
CMD ["npm", "run", "start-prod"]