const { expect } = require('chai');
const got = require('got');
const HTTP_STATUS = require('http-status');

const client = got.extend({
  prefixUrl: 'http://localhost:3000'
});

describe('node api tests', () => {
  let userId;

  it('get all users', async () => {
    const { data } = await client.get('users').json();
    expect(data.length).to.eql(4);
  });

  it('create user', async () => {
    const { data } = await client.post('users', { json: { name: 'Foo Bario', email: 'foo@bar.io' }}).json();

    const { id, name, email } = data;
    userId = id;

    expect(userId).to.exist;
    expect(name).to.eql('Foo Bario');
    expect(email).to.eql('foo@bar.io');
  });

  it('get user', async () => {
    expect(userId).to.exist;

    const { data } = await client.get('users/' + userId).json();

    const { id, name, email } = data;

    expect(id).to.eql(userId);
    expect(name).to.eql('Foo Bario');
    expect(email).to.eql('foo@bar.io');
  });

  it('update user', async () => {
    expect(userId).to.exist;

    const { data } = await client.put('users/' + userId, { json: { name: 'Bar Yaz', email: 'bar@yaz.io' }}).json();

    const { id, name, email } = data;

    expect(id).to.eql(userId);
    expect(name).to.eql('Bar Yaz');
    expect(email).to.eql('bar@yaz.io');
  });

  it('remove user', async () => {
    expect(userId).to.exist;

    await client.delete('users/' + userId).json();

    const { data } = await client.get('users/' + userId).json();
    expect(data).to.eql(null);
  });
});
