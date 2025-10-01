import api from "../baseService";

export const userService = {
    getUserInfo: () => api.get(`/services/app/User/Get`),
    getUserAva: () => api.get(`services/app/User/GetUserAvatarById`),
}