class Profile {
  constructor() {
    this.name = "";
    this.firstname = "";
    this.lastname = "";
    this.ud = "";
    this.email = "";
  }

  getEmail() {
    return this.email;
  }
  setEmail(v) {
    this.email = v;
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
