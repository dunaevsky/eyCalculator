const { expect } = require('chai');
const request = require('request');
const { port } = require('../common/config');

describe('calculator test', () => {
  describe('division', () => {
    it('tests result', (done) => {
      request({
        method: 'POST',
        uri: `http://localhost:${port}/calculator/calculate`,
        form: {
          elements: [1, 1, 1],
          operation: 'divide',
        },
      }, (error, response, body) => {
        expect(parseInt(body)).to.be.a('number');
        expect(parseInt(body)).to.equal(1);
        done();
      });
    });

    it('tests result with zeroes in input', (done) => {
      request({
        method: 'POST',
        uri: `http://localhost:${port}/calculator/calculate`,
        form: {
          elements: [1, 1, 0, 1],
          operation: 'divide',
        },
      }, (error, response, body) => {
        expect(parseInt(body)).to.be.a('number');
        expect(parseInt(body)).to.equal(1);
        done();
      });
    });
  });

  describe('multiply', () => {
    it('tests multiply end-point', (done) => {
      request({
        method: 'POST',
        uri: `http://localhost:${port}/calculator/calculate`,
        form: {
          elements: [1, '1.4', 1],
          operation: 'multiply',
        },
      }, (error, response, body) => {
        expect(parseInt(body)).to.be.a('number');
        expect(parseFloat(body)).to.equal(1.4);
        done();
      });
    });
  });

  describe('erroneous', () => {
    it('tests unsupported operation', (done) => {
      request({
        method: 'POST',
        uri: `http://localhost:${port}/calculator/calculate`,
        form: {
          elements: [1, 1, 1],
          operation: 'unsupported operation',
        },
      }, (error, response, body) => {
        expect(response.statusCode).to.equal(422);
        done();
      });
    });
  });
});
