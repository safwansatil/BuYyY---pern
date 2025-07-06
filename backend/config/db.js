// file to help connect to our database

import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// creates a sql connection to db, make it seeing neon docs
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
); // this sql is a function we export, as a tagged template literal, to allow writing sql queries safely
