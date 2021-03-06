import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

  signup({ email, password }) {
    return this.auth
      .post("/auth/signup", { email, password })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  refresh(userId) {
    return this.auth
      .get(`/auth/refresh/${userId}`) ///
      .then(({ data }) => data)
      .catch((err) => console.log(err))
  }


  login({ email, password }) {
    return this.auth
      .post("/auth/login", { email, password })
      .then(({ data }) => data);
    // .then((response) => response.data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
    // return this.auth.post("/auth/logout", {}).then((response) => response.data);
  }

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data);
    // return this.auth.get("/auth/me").then((response) => response.data);
  }
}

const authService = new Auth();
// `authService` is the object with the above axios request methods

export default authService;
