/* eslint-disable padded-blocks */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
import request from 'supertest';
import app from "../server";

/*

// ISSUE: Run tests back-to-back and/or more w/o fails (setup & teardown)

// ref: https://github.com/dwyl/aws-sdk-mock

import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { GetItemInput } from '../../node_modules/aws-sdk/clients/rds'; // <-- or .../rds

beforeAll(async (done) => {
  //get requires env vars
  // inject this into routes?? Don't know how or what else to setup
  done();
 });

afterAll(async (done) =>{
  // tear down
  done();
});

describe('the module', () => {

    // TESTS here

  it('should mock getItem from DynamoDB', async () => {
    // Overwriting DynamoDB.getItem()
    AWSMock.setSDKInstance(AWS);
    // Would like: AWSMock.mock('RDS', 'putItem, ...) =>{} ????
    AWSMock.mock('DynamoDB', 'getItem', (params: GetItemInput, callback: Function) => {
      console.log('DynamoDB', 'getItem', 'mock called');
      callback(null, {pk: 'foo', sk: 'bar'});
    })

    const input:GetItemInput = { TableName: '', Key: {} };
    const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    expect(await dynamodb.getItem(input).promise()).toStrictEqual({ pk: 'foo', sk: 'bar' });

    AWSMock.restore('DynamoDB');
  });

  it('should mock reading from DocumentClient', async () => {
    // Overwriting DynamoDB.DocumentClient.get()
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('DynamoDB.DocumentClient', 'get', (params: GetItemInput, callback: Function) => {
      console.log('DynamoDB.DocumentClient', 'get', 'mock called');
      callback(null, {pk: 'foo', sk: 'bar'});
    });

    const input:GetItemInput = { TableName: '', Key: {} };
    const client = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    expect(await client.get(input).promise()).toStrictEqual({ pk: 'foo', sk: 'bar' });

    AWSMock.restore('DynamoDB.DocumentClient');
  });
});

*/



/*
// NOTE: Previous tests
// Tasks before: (i) re-init table (seeding from doggr for instance)
describe("POST /company", () => {
  describe("when passed company type", () => {
    test("should respond w/ HTTP Status code(200)",
      async () => {
        const response = await request(app).post('/company').send({
          company_name: "A",
          state: "OR",
          country: "US",
          industry_id: "1",
        })
        expect(response.statusCode).toBe(200);
      })
  })
});

describe("GET /company", () => {
  describe("when passed company type", () => {
    test("should respond w/ HTTP Status code(200)",
      async () => {
        const response = await request(app).get('/company').send({
          company_name: "A",
          state: "OR",
          country: "US",
          industry_id: "1",
        })
        // clean up data
        const temp = await await request(app).delete('/company').send({
          company_name: "A",
          state: "OR",
          country: "US",
          industry_id: "1",
        })
        expect(response.statusCode).toBe(200);
      })
  })
});

describe("DELETE /company", () => {
  describe("when passed company type", () => {
    test("should respond w/ HTTP Status code(200)",
      async () => {
        const response = await request(app).delete('/company').send({
          company_id: "1",
        })
        expect(response.statusCode).toBe(200);
      })
  })
});

describe("GET /industry", () => {
  describe("when passed industry type", () => {
    test("should respond w/ HTTP Status code(200)",
      async () => {
        const response = await request(app).get('/company').send({
          industry: "A",
        })
        expect(response.statusCode).toBe(200);
      })
  })
});

*/
