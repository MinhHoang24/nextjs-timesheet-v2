import { LoginData } from "@/types/auth";
import api from "../baseService";

export const authService  = {
    authenUser: (loginData: LoginData) => api.post(`/TokenAuth/Authenticate`,loginData),
}