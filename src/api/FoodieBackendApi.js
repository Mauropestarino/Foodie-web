import appsettings from "../appsettings.json";

export default class FoodieBackendApi {

  async getApiUrl() {
    return "http://localhost:8080/api";
  }

  setAuthToken(token) {
    this.headers["authorization"] = token;
  }

  async login(body) {
    const request = fetch((await this.getApiUrl()) + "/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return request;
  }

  
  async createUser(body) {
    const request = fetch((await this.getApiUrl()) + "/usuarios/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return request;
  }

  async favoritasRecetas(body) {
    const request = fetch((await this.getApiUrl()) + "/recetas/favoritas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("loginToken")
      },
      body: JSON.stringify(body),
    });
    return request;
  }

  async creadasRecetas(body) {
    const request = fetch((await this.getApiUrl()) + "/recetas/creadas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("loginToken")
      },
      body: JSON.stringify(body),
    });
    return request;
  }

  async historialRecetas(body) {
    const request = fetch((await this.getApiUrl()) + "/recetas/historial", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("loginToken")
      },
      body: JSON.stringify(body),
    });
    return request;
  }

  async ingredientesStock(body) {
    const request = fetch((await this.getApiUrl()) + "/stock/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("loginToken")
      },
      body: JSON.stringify(body),
    });
    return request;
  }
  
}
