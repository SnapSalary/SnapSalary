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


// Tasks before: (i) re-init table (seeding from doggr for instance)
describe("POST /company", () => {
  describe("when passed company type", () => {
    test("should respond w/ HTTP Status code(200)",
      async () => {
        const response = await request(app).post('/company').send({
          company_name: "KK",
          state: "OR",
          country: "US",
          industry_id: "1",
        })
        console.log(response);
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
        expect(response.statusCode).toBe(200);
      })
  })
});

describe("GET /company", () => {
  describe("when passed nothing", () => {
    test("should respond w/ HTTP Status code(200)",
      async () => {
        const response = await request(app).get('/company').send()
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