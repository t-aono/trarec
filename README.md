# trarec

## Overview

A web application that allows you to manage training content and record history.

## Description

Manage data with Cloud Firestore using SDK (Software Development Kit).

## Demo

![0iPUKI4ep0H2PO1iPQOJ1640918932-1640919070](https://user-images.githubusercontent.com/46856574/147800272-dc911bc1-0f43-4a7c-b747-9bf41212f52c.gif)

<!-- ## VS. -->

## Requirement

- "react": "^17.0.2"
- "firebase": "^9.0.2"
- "@chakra-ui/react": "^1.6.7"

## Usage

### Local login page url

```
http://localhost:3000/
```

### When adding a menu for the first time

Data can be added by creating a composite index in Firestore.  
Please follow the link output to the console.

## Install

You need to create a project in Firebase before installing.  
Set up email password authentication with Authentication,
Create a database in CloudFirestore.

1. Get source code

   ```
   git clone git@github.com:t-aono/trarec.git
   ```

2. Copy .env-example to create .env and set environment variables for your Firebase project.

   ```
   cp .env-example .env
   ```

3. Add package.

   ```
   yarn
   ```

4. Start local development environment.

   ```
   yarn start
   ```

<!-- ## Contribution -->

<!-- ## Licence -->

## Author

[t-aono](https://github.com/t-aono)

<!-- README.md Sample -->
<!-- https://deeeet.com/writing/2014/07/31/readme/ -->
