# ClickHouse Playground
JavaScript program that queries over the ClickHouse database.

## Usage
In order to use the program, first start the ClickHouse server using the ClickHouse binaries and the command `./clickhouse server`.

The JavaScript program can be started using `npm run start` in the project root.

## Results
After running the program, all tables will be created and the queries will be executed. The results of the queries are stored in `/results` folder as individual `JSON` files.

## Overview
- database and table models are defined in the `/src/model.js` file
- the initialization of the database and tables as well as query execution is done in the `index.js` file
- general functions such as query functions are defined in the `/src/lib.js` file
- sample data generation is defined in the `/src/generator.js` file
- non-trivial queries are defined in the `/src/queries.js` file
- results of the queries are stored in the `/results` folder

by [Tomas Boda](https://github.com/TomasBoda)
