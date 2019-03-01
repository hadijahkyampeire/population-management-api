# population-management-api
[![Build Status](https://travis-ci.org/hadijahkyampeire/population-management-api.svg?branch=master)](https://travis-ci.org/hadijahkyampeire/population-management-api)
[![Coverage Status](https://coveralls.io/repos/github/hadijahkyampeire/population-management-api/badge.svg?branch=master)](https://coveralls.io/github/hadijahkyampeire/population-management-api?branch=master)


## Documentation

- Find the live documentation [Here](https://documenter.getpostman.com/view/2646235/S11KRKKx#cb636acb-5e0a-46e2-b5f3-54f857c2a79c)

## About the API

Population Management System that contains a list of locations and the total number of residents in each location broken down by gender.

## Requirements
Ensure to have these on your machine.
- [Node (stable)](https://nodejs.org/en/)

- [MongoDB](https://www.mongodb.com/)

- [Postman](https://www.getpostman.com/)

- Some knowledge of terminal or use Mongodb Compass for database UI

## How to set it up

1. Clone the repository.

```

git clone https://github.com/hadijahkyampeire/population-management-api

```

2. Install the dependencies by running:

```

yarn install

```

3. Start you mongodb service

```

mongod, if it requires authentication use sudo mongod

```

4. Get started

```

yarn start:dev

```

5. you can now access the application using postman

```

http://localhost:5000

```

## Testing

The application's tests can be executed by running the script below within the terminal at the application root directory:

```

yarn test or npm test

```
if you want to know the coverage use:
```

yarn test -- --coverage

```

## Endpoints
- After creating a user one logs in to get authenticated first before they access other endpoints.

## USER

#### **_api/v1/signup_**

description: Creates a contact
method : POST
headers: content-Type →application/json
sample payload:

    `{
        email: 'hard@gmail.com',
        username: 'jarh',
        password: 'secret'
     }`

#### **_api/v1/login_**

description: Authenticates a user
method : POST
headers: content-Type →application/json
Authorization: put a token got from authorization
sample payload:

    `{
        email: 'hard@gmail.com',
        password: 'secret'
     }`

returns:

    ` {
      "message": "You successfully loggedin",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InBob25lX251bWJlciI6IjA3MDUyMjE0MjEiLCJjb250YWN0X2lkIjoiNWM3NTM1ZWM2OWJlYzUyZmQ1Y2MwN2VkIn0sImlhdCI6MTU1MTE4NTQzNSwiZXhwIjoxNTUxMjcxODM1fQ.p0l_mnTwTNcYME2jmXtpEyjRXNsyE4Ws3wt_PWilBRc"
    }`


## LOCATIONS

#### **_api/vi/locations_**

description: Creates a location
method : POST
headers: content-Type →application/json
Authorization: put a token got from authorization
sample payload:

    `{
        "location_name":"Kampala", "females":"30", "males":"40", "parent_locationId":"5c162261bcaf48e17ca22c76"
    }`

#### **_api/v1/locations_**

description: Retrieves all locations belonging to the authenticated user
method : GET
headers: content-Type →application/json
Authorization: put a token got from authorization
returns:

    `
    `{
    "locations": [
        {
            "_id": "5c782419c9863652f8ced7a3",
            "location_name": "Kanungu",
            "females": 1000,
            "males": 900,
            "created": "2019-02-28T18:10:33.470Z",
            "__v": 0
        },
        {
            "_id": "5c782623c89fca559413380c",
            "location_name": "Kabale",
            "females": 1000,
            "males": 900,
            "parent_locationId": "5c7822183a7527516a242c05",
            "created": "2019-02-28T18:19:15.857Z",
            "__v": 0
        },
        {
            "_id": "5c7827edc1013c58248cdb27",
            "location_name": "Jinja",
            "females": 1000,
            "males": 900,
            "created": "2019-02-28T18:26:53.908Z",
            "__v": 0
        },
        {
            "_id": "5c782b4de910c35ceabd9d7f",
            "location_name": "Busia",
            "females": 1000,
            "males": 900,
            "parent_locationId": "5c7822183a7527516a242c05",
            "created": "2019-02-28T18:41:17.646Z",
            "__v": 0
        }]
        "females": 4000,
        "males": 3600,
        "total_residents": 7600
    }`


#### **_api/v1/locations/id_**

description: Updates a location
method : PUT
headers: content-Type →application/json
Authorization: put a token got from authorization
payload:

    `{
        "location_name": "kabale"
    }`


#### **_api/v1/locations/:id_**

description: Returns one message by ID, if it has nested locations, they are also returned
method : GET
headers: content-Type →application/json
Authorization: put a token got from authorization
returns:

      `{
        "Name": "Rukungiri",
        "location": [
        {
            "_id": "5c782cd9cfa9bf5e67dfece2",
            "location_name": "Rukungiri",
            "females": 1000,
            "males": 900,
            "created": "2019-02-28T18:47:53.362Z",
            "__v": 0
        },
        {
            "_id": "5c782d318c1a555eac1bc313",
            "location_name": "Buyanja",
            "females": 1000,
            "males": 900,
            "parent_locationId": "5c782cd9cfa9bf5e67dfece2",
            "created": "2019-02-28T18:49:21.535Z",
            "__v": 0
        }
      ],
      "females": 2000,
       "males": 1800,
      "total_residents": 3800
      }`

#### **_api/v1/locations/:id_**

description: Deletes a message you created by ID
method : DELETE
headers: content-Type →application/json
Authorization: put a token got from authorization

returns:

    `{
      "message": "location was deleted successfully"
      }`


