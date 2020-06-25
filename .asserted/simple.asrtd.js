const { expect } = require('chai');
const axios = require('axios');
const HTTP_STATUS = require('http-status');

describe('simple tests', () => {
  it('get endpoint returns 200', async () => {
    const { status } = await axios.get('http://localhost:3000/echo');
    expect(status).to.eql(HTTP_STATUS.OK);
  });

  it('post endpoint returns 200 and body', async () => {
    const { status, data } = await axios.post('http://localhost:3000/echo', { foo1: 'bar1', foo2: 'bar2' });
    expect(status).to.eql(HTTP_STATUS.OK);
    expect(data.body).to.eql({ foo1: 'bar1', foo2: 'bar2' });
  });

  it('intentionally failing test', async () => {
    const { status, data } = await axios.post('http://localhost:3000/echo?foo=bario', { something: 'exists' });
    expect(status).to.eql(HTTP_STATUS.OK);
    expect(data.body).to.eql({ something: 'doesnt exist' });
  });
});
