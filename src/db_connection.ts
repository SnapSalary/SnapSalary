import { Client } from "pg";
import * as type from "./types";

export const initDBTables = async (dbData: type.rdsSecret): Promise<void> => {
	const conn = connect(dbData);
	await conn.connect();

	await conn
		.query(
			`
		CREATE TABLE IF NOT EXISTS users(
			user_id SERIAL UNIQUE NOT NULL,
			first_name VARCHAR(100) NOT NULL,
			last_name VARCHAR(100) NOT NULL,
			email VARCHAR(100) UNIQUE NOT NULL,
			PRIMARY KEY(user_id)
		);
		
    CREATE TABLE IF NOT EXISTS companies (
  	  company_id SERIAL UNIQUE NOT NULL,
  	  company_name VARCHAR (100) UNIQUE NOT NULL,
			country VARCHAR(30),
			industry_id SERIAL,
			PRIMARY KEY(company_id) 
		);

		CREATE TABLE IF NOT EXISTS job (
			job_title VARCHAR(100),
			company_id serial NOT NULL
			REFERENCES companies(company_id),
			salary NUMERIC(6, 2),
			skill skill_types,
			job_id SERIAL UNIQUE NOT NULL,
			PRIMARY KEY(job_id, company_id)
		);

		CREATE TABLE IF NOT EXISTS industry(
			industry_id serial NOT NULL
			REFERENCES companies(industry_id),
			industry VARCHAR(100) UNIQUE NOT NULL,
			PRIMARY KEY(industry_id)
		);
		
		DO $$
		BEGIN
			CREATE TYPE skill_types AS ENUM(
				'Entry-Level',
				'Assistant',
				'Senior',
				'Manager',
				'Director',
				'Executive',
				'Lead',
				'Associate',
				'Principal'
			);
		EXCEPTION
				WHEN duplicate_object THEN null;
		END$$;`
		)
		.then(() => console.log("Successfully initialized DB"))
		.catch((e) => console.log(e));

	await conn.end();
};

///test <-- REMOVE LATER!!!
//export const test = async (dbData: type.rdsSecret): Promise<void> => {
//	const conn = connect(dbData);
//	await conn.connect();
//
//	await conn
//		.query(
//			`
//SELECT enum_range(NULL::skill_types)
//		`
//		)
//		.then(() => console.log("Successfully executed test"))
//		.catch((e) => console.log(e));
//
//	await conn.end();
//};

export const connect = (dbData: type.rdsSecret): Client => {
	const conn = new Client({
		user: dbData.username,
		password: dbData.password,
		host: dbData.host,
		database: "snapsalary",
		port: 5432,
	});
	return conn;
};
