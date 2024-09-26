const { host, password } = require('pg/lib/defaults');

const Pool=require('pg').Pool;

const pool= new Pool({
    user:'nikhiltomy',
    host:'localhost',
    database:'student',
    password:'test',
    port:5432
});

module.exports=pool;