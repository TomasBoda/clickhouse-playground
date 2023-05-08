# ClickHouse Playground
JavaScript program that queries over the ClickHouse database.

## Usage
In order to use the program, first start the ClickHouse server using the ClickHouse binaries and the command `./clickhouse server`.

The program can be started using `npm run start` in the project root.

## Functionality
After starting the program, it creates example ClickHouse tables and fill them with data. Then it queries over the data and writes the results to json files in the `/results` folder.

by [Tomas Boda](https://github.com/TomasBoda)