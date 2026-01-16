class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }

  findUsers(userMatch) {
    if (userMatch) {
      return Object.values(this.storage).filter(
        (user) =>
          user.firstName === userMatch ||
          user.lastName === userMatch ||
          user.email === userMatch
      );
    }
  }
}

module.exports = new UsersStorage();
