const shortid = require('shortid');

let users = [
    {
      "id": "sJMd3qBHd",
      "name": "Dennis Deckow",
      "email": "Clovis.Breitenberg77@gmail.com"
    },
    {
      "id": "7FqcF2m8gj",
      "name": "Salvador Cormier",
      "email": "Micheal39@gmail.com"
    },
    {
      "id": "t9JZG-fOyk",
      "name": "Vern Kuvalis",
      "email": "Rodrigo.Walter@yahoo.com"
    },
    {
      "id": "07Cl2FYMyR",
      "name": "Sterling Stracke",
      "email": "Rowena49@gmail.com"
    }
  ];

class Users {
  async create(name, email) {
    const user = {
      id: shortid.generate(),
      name,
      email,
    };

    users.push(user);
    return user;
  }

  async get(id) {
    const user = users.find(({ id: _id }) => _id === id);
    return user || null;
  }

  async update(id, name, email) {
    const user = await this.get(id);
    if (!user) {
      throw new Error('User not found');
    }

    const updated = { id, name, email };

    users = users.filter(({ id: _id }) => id !== _id).concat(updated);
    return updated;
  }

  async remove(id) {
    users = users.filter(({ id: _id }) => id !== _id)
  }

  async list() {
    return [...users];
  }
}

module.exports = Users;
