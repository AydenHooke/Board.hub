[![CI](https://github.com/AydenHooke/Board.hub/actions/workflows/ci.yml/badge.svg)](https://github.com/AydenHooke/Board.hub/actions/workflows/ci.yml)
# Board.ub
This is a web application that allows users to rate, talk about, and schedule meet-ups for their favorite board games

## Setup

### Frontend

To run the frontend, first cd to the frontend folder and install NPM dependencies:

```
cd frontend
npm install
```

You can then run the frontend in dev mode using the following npm command:

```
npm run dev
```

You will need to go through the source files to replace the IP of the backend the frontend will be reaching out to, as we have hardcoded our backend ip address in the frontend.

### Backend

To run the backend, open the backend project in your desired dev environment and install all Maven dependencies using the included pom.xml file.

You then need to define the following environment variables for the backend:

```
SPRING_DATASOURCE_URL -> This is the connection string of a postgresql database that the backend will connect to
SPRING_DATASOURCE_USERNAME -> This is the postgresql username
SPRING_DATASOURCE_PASSWORD -> This is the postgresql password

KAFKA_URL -> Set this to kafka:9092
```

Running the backend with proper Postgresql connection information in the environment variables will have the backend automatically generate and create the database schema.

You can then use Java JDK to run the backend in development mode. To run the application in production, package the project and the outputted jar may be used.

Optionally, a dockerfile is included in the project files that you may use to build a docker image from.

### Forums

Forum topics for the forums page are hard-coded in the database. This means you need to manually create the various forums yourself. This is done by inserting a record into the forum table in the database. This can be done using a database administration tool connected to the database.
