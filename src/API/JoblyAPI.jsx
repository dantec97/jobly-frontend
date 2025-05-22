import axios from "axios";

const BASE_URL = "http://localhost:3001";

class JoblyAPI {
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static setToken(newToken) {
    JoblyAPI.token = newToken;
  }

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = JoblyAPI.token
      ? { Authorization: `Bearer ${JoblyAPI.token}` }
      : {};
    const params = method === "get" ? data : {};

    try {
      const res = await axios({ url, method, data, params, headers });
      return res.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message || err.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Auth
  static async login(credentials) {
    const res = await this.request("auth/token", credentials, "post");
    return res.token;
  }

  static async signup(userData) {
    const res = await this.request("auth/register", userData, "post");
    return res.token;
  }

  // Companies
  static async getCompanies(filters = {}) {
    const res = await this.request("companies", filters);
    return res.companies;
  }

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Jobs
  static async getJobs(filters = {}) {
    const res = await this.request("jobs", filters);
    return res.jobs;
  }

  // Users
  static async getUserProfile(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUserProfile(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
  static async applyToJob(username, jobId) {
    const res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  }
}


export default JoblyAPI;