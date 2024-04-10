import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

let ssl;
if (process.env.AWS_BUNDLE_BASE64) {
   ssl = {
      rejectUnauthorized: false,
      ca: Buffer.from(process.env.AWS_BUNDLE_BASE64, 'base64').toString(),
   };
} else {
   console.error('AWS_BUNDLE_BASE64 não está definido!');
}

const connection = knex({
   client: "postgres",
   connection: {
      connectionString: process.env.POSTGRES_URL,
      multipleStatements: true,
      ssl: ssl,
      // host: process.env.DB_HOST,
      // port: 5432, 
      // user: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_SCHEMA,
      
   },
});

export default connection;
