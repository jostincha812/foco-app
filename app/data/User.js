export default class User {
  constructor(id, username, email, level) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.level = level;
  }

  changeEmail(newEmail)  {
    this.email = newEmail;
    return "Email updated: " + this.email;
  }
}

const currentUser = new User('013', 'lovince','lovince@gmail.com','wset3');

module.exports = {
  currentUser
}
