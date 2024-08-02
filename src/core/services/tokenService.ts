import LoginResponse from "../../models/responses/auth/loginResponse";

class TokenService {
    getToken(): string | null {
        return localStorage.getItem("token");
    }

    hasToken(): boolean {
        return localStorage.getItem("token") != null;
    }

    setToken(item: LoginResponse) {
        localStorage.setItem("token", item.token);
    }

    removeToken() {
        localStorage.removeItem("token")
    }
}

export default new TokenService();