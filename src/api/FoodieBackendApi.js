import appsettings from "../appsettings.json";

export default class FoodieBackendApi {
  constructor() {
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  async getApiUrl() {
    var host = window.location.hostname;
    //Desarrollo
    return "http://localhost:8080/api";
    //Produccion
    // return `${appsettings.host}/api`;
  }

  async login(body) {
    const request = fetch((await this.getApiUrl()) + "/usuarios/login", {
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
