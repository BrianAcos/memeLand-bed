const sinon = require('sinon');
const mysql = require('mysql');
const mockMysql = sinon.mock(mysql);
mockMysql.expects('createConnection').returns({
  connect: () => {
    console.log('Succesfully connected');
  },
  query: (query, vars, callback) => {
    callback(null, null);
  },
  end: () => {
    console.log('Connection ended');
  }
});
after(function() {
  mockMysql.restore();
});