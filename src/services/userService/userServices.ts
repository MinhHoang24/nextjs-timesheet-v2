import api from "../baseService";

export const userService = {
    getUserInfo: (userId: number) => api.get(`/services/app/User/Get`, {
        params: { Id: userId }
    }),
    getUserAva: (userId: number) => api.get(`/services/app/User/GetUserAvatarById`, {
        params: { Id: userId }
    }),
}