## Description

* [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
* [PostgreSQL]() database.
* [Docker]() container to deploy.


## Steps to setup the project.
1. Clone this project.
2. Install the dependencies
```bash
$ yarn install
```
3. Set up a PostgreSQL Database (or use docker-compose up and it will set up a database with the .env values).

4. Create the .env file. For this you can use 

```bash
$ cp .env.example .env
```

With this you will have the latest values that you must fill.
Note: if you setup a new feature that requires a new value dont forget to update the file `.env.example`

5. [Visual Studio Code]: 
* Create a folder `.vscode`
* Add a `settings.json`` file:
  - Add this into your proper OS env, e.g: MacOS:
  ```json
    {
    "terminal.integrated.env.osx": {
        // env values
      }
    }
  ```
  - With this configuration you will be able to run scripts like migrations by grabbing the ENV values on your VSCode Terminal.
* Add a `launch.json` file to run the desired script e.g: `yarn start:dev` and setup the key `envFile` to `"${workspaceFolder}/.env"`, with this you will be able to debug the project in VSCode.
* Similar instructions should be followed in your desired IDE.

6. Run TypeORM migration.

7. At this point with the database running and the proper environmental values you can run the project.



## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
