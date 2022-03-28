class Profile {
  constructor() {
    this.name = "";
    this.firstname = "";
    this.lastname = "";
    this.ud = "";
    this.email = "";
    this.url = "";
  }

  getEmail() {
    return this.email;
  }
  setEmail(v) {
    this.email = v;
  }
  setUrl(v) {
    this.url = v;
    console.log(this.url);
  }
  getUrl() {
    return this.url;
  }

  getFirstname() {
    return this.firstname;
  }
  setFirstname(v) {
    this.firstname = v;
  }
  // LASTNAME
  getLastname() {
    return this.lastname;
  }
  setLastname(v) {
    this.lastname = v;
  }

  setName(name) {
    this.name = name;
  }

  // // UIID
  getUd() {
    return this.ud;
  }
  setUd(v) {
    this.ud = v;
  }
}

export const userData = new Profile();
