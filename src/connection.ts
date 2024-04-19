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
   },
});

export default connection;
