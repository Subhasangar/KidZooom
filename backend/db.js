require('dotenv').config(); // Load .env during local development

const {Pool} = require('pg');
if (!process.env.DATABSE_URL){
    console.log("ERROR: database_url is not set in environment variables.");
    process.exit(1);
}
const pool=new Pool({
    ConnectionString;
    process.env.DATABSE_URL,
    ssl:{
        rejectUnauthorized:false},
});
pool.on (error,(err)=> {
    console.error("enexpected PG error :", err);
    process.exit;
});
module.exports=pool;
