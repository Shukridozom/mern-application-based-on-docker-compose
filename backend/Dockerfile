FROM node:22-alpine3.20

# Creating a user with normal perivileges
RUN addgroup app && adduser -S -G app app

# Changing the working direcotry to the home directory of the user 'app'
WORKDIR /home/app/

# Creating a directory for the backend application
RUN mkdir backend

# Changing the owner of this directory to the user 'app'
RUN chown -R app:app backend

# Changing the working direcotry to the home directory of the user 'app'
WORKDIR /home/app/backend

# Copying packages dependencies files:
COPY package*.json . 

# Installing all the dependencies for our Node applicaiton
RUN npm install

# Copying all files from the current directory (that contains Dockerfile) into the current directory of the image (/app/)
COPY . . 

RUN chmod +x .wait-for-it.sh

RUN mv ./.wait-for-it.sh /home/app/.wait-for-it.sh

# Specifying the user
USER app

# Letting the container listens to the port 3000
EXPOSE 8080

# starting the node application
CMD ["../.wait-for-it.sh", "db", "27017", "--", "npm", "run", "dev"]
