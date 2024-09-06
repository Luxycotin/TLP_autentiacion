import { createPool } from "mysql2/promise";

import{
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_USER
} from "../enviroments.js"

const createMyPool = ()=>{
        const pool = createPool({
            database: DB_NAME,
            host: DB_HOST,
            user: DB_USER,
            port: DB_PORT,
        });
        return pool;
}
const conn = createMyPool();

export { conn };
