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
  company_id: number;
  company_name: string;
}
