/* eslint-disable padded-blocks */
/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
import request from 'supertest';
import app from "./server";

describe("POST /company", () => {
  describe("when passed company type", () => {
    test("should respond w/ HTTP Status code(200)",
      async () => {
        const response = await request(app).post('/company').send({
          company_name: "D",
          state: "OR",
          country: "US",
          industry: "1",
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
          industry: "1",
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
