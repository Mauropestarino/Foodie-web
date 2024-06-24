import appsettings from "../appsettings.json";

export default class LicenseManagerApi {
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async getApiUrl() {
    var host = window.location.hostname;
    //Desarrollo
    return "http://" + host + ":8080/api";
    //Produccion
    // return `${appsettings.host}/api`;
  }

  async recoverPasswordEmail(body) {
    const request = fetch((await this.getApiUrl()) + "/email/forgot-password", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return request;
  }

  async changePassword(body) {
    const request = fetch((await this.getApiUrl()) + "/user/reset-password", {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return request;
  }

  async emailToCreateAccount(body) {
    const request = fetch((await this.getApiUrl()) + "/email/request-account", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return request;
  }

  async login(body) {
    const request = fetch((await this.getApiUrl()) + "/user/login", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return request;
  }

  async isLogged(email) {
    const request = fetch(
      (await this.getApiUrl()) + `/user/is-logged?email=${email}`,
      {
        method: "GET",
        headers: this.headers,
      }
    );
    return request;
  }
}
