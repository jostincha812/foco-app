export default class User {
  constructor(fbUser) {
    if (fbUser == null) {
      return null;
    }

    // load from fb User
    this._fbUser = fbUser;
    this.uid = fbUser.uid;
    this.email = fbUser.email;
    this.displayName = fbUser.displayName;
    this.image = fbUser.photoURL;
      // http://schema.org/URL

    // load from fb database
    this.username = '';
    this.gender = '';
    this.appConfig = {
      level: '',
      hasCarddecks: false,
    };
  }

  // "@context": ["http://schema.org", {
  //   "gender": {"@id": "schema:gender", "@type": "@vocab"}
  // }]
  // this.type = 'Person';
    // http://schema.org/Person
  // this.gender = '';
    // http://schema.org/Male
    // http://schema.org/Female
  // this.givenName = '';
  // this.familyName = '';
  // this.jobTitle = '';
}
