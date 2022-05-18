import http from "./httpService";
import config from "../config.json";

const URL = config.apiEndpoint + "/users";

export function register(user) {
	return http.post(URL, {
		email: user.email,
		password: user.password,
		name: user.name,
	});
}
