# Project Barkada API - InRhythm MVP
This project is a fork of a current project I am working on. This fork is to demonstrate that knowledge of [RESTful API](https://scotch.io/tutorials/getting-started-with-hapi-js), [HapiJs API Framework](https://hapijs.com/), and [Swagger Docs](https://swagger.io/swagger-ui/).  

**The Purpose of this fork is demonstrate basic for the frameworks listed**. Currently this branch **does not** contain strong tests. Parts of this will be refactored over time but not for this branch (_If requested I can show more improvement given time, see Nice to haves below_). I try to leave as much comments and READMEs in directories to make thing clear on what I'm doing. As always feel free to ping me for questions or open a Issue for improvements.

## Instructions
1. Clone this repo
1. Install [nvm](https://github.com/creationix/nvm) installed
1. Install [yarn](https://yarnpkg.com/en/) installed
1. Run `nvm install 8.8.1`
1. Go into project root directory
1. Run `nvm use`
1. Run `yarn install`
1. Run `yarn start` for dev or `yarn dev` for live reload
1. Go to [http://localhost:8081/api/v1/docs](http://localhost:8081/api/v1/docs)

## Development Workflow
1. Run `yarn dev` for live reload
1. Use [http://localhost:8081/api/v1/docs](lhttp://localhost:8081/api/v1/docs) to test end points
1. When commiting changes, run `yarn test` for validation. (Hopefully this step will be removed in the near future with Husky)
1. Push Changes to Dev/Any Branch

## URLS
* Local - [http://localhost:8081/api/v1/docs](http://localhost:8081/api/v1/docs)
* Stage - TBD.
* PROD - MVP will not be available.

## Folder Architecture
```
/configs              -- App Configs
/mocks                -- Mock Data to READ/WRITE
/resources            -- API Resource Definitions
/routes               -- API Resource Routes
/services             -- General Services
/spec                 -- Tests
```

## Todos
* [X] - Concat Version from `package.json`. Only read from Major and Minor.
* [X] - Fix Health Route.
* [X] - Temporary remove broken tests - _Since there was a big refactor most of the tests are renderd useless (I know, I know, I should be fixing them but this is a MVP approach, I want to start new)_
* [X] - Fix API Name
* [X] - Update README
* [X] - Add [Hapi Resource Validator (HRV) Documentation](/services/hapi-resource-creator.service)
* [X] - Add Example of model for HRV.
* [] - Fork
* [] - Deploy MVP to AWS 

### Nice to haves
* [] - Add Husky for CI
* [] - Refactor Hapi Resource Creator to auto include `id`
* [X] - Remove files prefixed with `_`
* [] - Convert HRV from Class based to Functional Based
