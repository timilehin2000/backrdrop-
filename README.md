# Backdrop challenge

This project is a backend challenge for Backdrop

## Prerequisites

1. You need to have [Node.js](https://nodejs.org/en/download)
2. You need to have PostgresSQL installed

# Running this app

```shell
$ git clone https://github.com/timilehin2000/backrop-challenge.git
$ cd backdrop-challenge
$  Create a `.env` file in the root directory and add your databae details. It should have the following properties:
-   DATABASE_HOST=
-   DATABASE_USERNAME=
-   DATABASE_PASSWORD=
-   DATABASE_NAME=
-   DATABASE_PORT=
-   TEST_SECRET=
-   TEST_PUBLC=
-   JWT_SECRET=
$ npm install
$ npm run dev
```

## What's a good reason why the pure Levenshtein Distance algorithm might be a more effective solution than the broader Damerau–Levenshtein Distance algorithm in this specific scenario.

The pure Levenshtein Distance algorithm is a more effective solution than the broader Damerau-Levenshtein Distance Algorithm. One major reason is because the PLDA only has three possible edit operations which are insertion, substitution and deletion which make it's operation simpler and less ambigious computationally compared to the BDLA which makes use of transposition (the operation of swapping two adjacent characters in a string to make it match the target string). Considering that bank accounts name are not necessarily long characters of strings, tansposition errors are less likely to occur compared to deletion, insertion, or substitution errors. Thus the PLDA, which is simpler and more efficient, may be a more effective solution for verifying bank account names in this specific scenario.

## Major assumptions made

-   I assume that a user has to first register i.e create an account and afterwards login
-   I asumme that the users will need to be authorized before they can access the "addBankAccount" Mutation.
-   I assume that the Query can be accessed both by registerd and non registered users
-   I assume that to accurately get the the Levenshtein Distance betweeen the inputed bank account name by the user and the resolved bank account from paystack, both names must be compared in lower case
