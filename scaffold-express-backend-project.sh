node -v > .nvmrc;
npm init -y;
npm i express typescript mongoose;
npm i --save-dev nodemon ts-node;
npm i --save-dev @types/express;
npx tsc --init;
touch tsconfig.json;
mkdir src;
touch ./src/index.ts;
touch nodemon.json



# -----------------------------------------------------------------------------------------------------------
# Note: go to tsconfig.json file and add these two properties to the json object
# "include": ["src/**/*"]
# "exclude": ["node_modules"]



# -----------------------------------------------------------------------------------------------------------
# Note: add these lines as the initial content of index.ts:

# import express from "express";
# import mongoose from "mongoose";

# const DATABASE_HOST = "localhost";
# const DATABASE_PORT = 27017;
# const DATABASE_NAME = "ecommerce";

# const app = express();
# const SERVER_HOST = "database-name";
# const SERVER_PORT = 3001;

# mongoose
#     .connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`)
#     .then(() => console.log("Connected to MongoDB"))
#     .catch((err) => console.log("Failed to connect to MongoDB"));

# app.listen(SERVER_PORT, () => {
#     console.log(`Server is running at: http://${SERVER_HOST}:${SERVER_PORT}`)
# });



# -----------------------------------------------------------------------------------------------------------
# Note: add this key-value to the script property in package.json:
# "dev": "nodemon"


# -----------------------------------------------------------------------------------------------------------
# Note: add these lines to the nodemon.json file:
# {
#     "watch": ["src"],
#     "ext": ".ts .js",
#     "ignore": [],
#     "exec": "ts-node ./src/index.ts"
# }