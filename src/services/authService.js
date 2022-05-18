import http from "./httpService";
import config from "../config.json";

function movieURL() {
	return `${config.apiEndpoint}/auth`;
}

export function login(email, password) {
	return http.post(movieURL(), { email, password });
}
