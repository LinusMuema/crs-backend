# 🚧 Work in progress 🚧

This is the backend service for the crs application. All the data is stored in a MongoDB database. The application is built on top of the [Express](https://expressjs.com/) framework. 

The system architecture follows a simple MVC pattern. The application is divided into three main parts:
* **Model:** this is used to hold all the data models and mongoose schemas. We use the models to interact with all the data in the database.
* **View:** this is used to render the views. In this case, our views are the API endpoints consumed by the user. The endpoints are configured using the express router and are found under the `routes` directory.
* **Controller:** this is used to handle the business logic. They perform the CRUD operations in the database as well as manipulate the data. The controllers are found under the `controllers` directory.

**Middlewares** are small functions that are executed before the request is handled by the controller. They are found in the `middlewares` file under the `utils` directory. The utils directory contains various re-usable functions in the application. The functions are:
* **bcrypt**: used to hash the password before storing it in the database.
* **jwt**: used to generate the JWT token for the user.
* **responses**: used to generate the error responses for the API endpoints.

Once cloned, install the dependencies using the following command:

    $ yarn install

And yes, we are using [yarn](https://yarnpkg.com/) as our package manager. _Reason: It uses emojis ..._ 😆

> To run the project, you will need to have the .env variables which are ignored by default. They are secrets and passwords used to access third party services used in the app. 

Ask @LinusMuema for the file.

Once done, the application will be deployed on heroku.
