import { type } from "os";

export interface rdsSecret {
  username: string;
  password: string;
  host: string;
}

export interface dataResponse {
  data: any[];
  status: {
    status_code: number;
    message: string;
  }
}

export interface company {
  company_id: string;
  company_name: string;
  state: string;
  country: string;
  industry_id: string;
}

export interface user {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface job{
  job_title: string;
  company_id: string;
  salary: string;
  skill: skill_types;
  job_id: string;
}

export type skill_types = [
  'Entry-Level',
  'Assistant',
  'Senior',
  'Manager',
  'Director',
  'Executive',
  'Lead',
  'Associate',
  'Principal',
]
