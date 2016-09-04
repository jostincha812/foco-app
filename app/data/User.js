
export default class User {
  constructor(id, username, email, level) {
    this.id = id;
    this.username = username;
    this.level = level;

    // "@context": ["http://schema.org", {
    //   "gender": {"@id": "schema:gender", "@type": "@vocab"}
    // }]
    // http://schema.org/Person
    this.type = 'Person';
    this.email = email;
    this.name = '';
    this.givenName = '';
    this.familyName = '';
    this.gender = '';
      // http://schema.org/Male
      // http://schema.org/Female
    this.jobTitle = '';
    this.image = '';
      // http://schema.org/URL
  }

  changeEmail(newEmail)  {
    this.email = newEmail;
    return "Email updated: " + this.email;
  }
}

const currentUser = new User('013', 'lovince','lovince@gmail.com','WSET3');

module.exports = {
  currentUser
}
