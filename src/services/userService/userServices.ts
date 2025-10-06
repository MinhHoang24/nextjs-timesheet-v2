import api from "../baseService";

export const userService = {
    getUserInfo: () => api.get(`/services/app/User/Get`),
    getUserAva: (userId: number) => api.get(`services/app/User/GetUserAvatarById`, {
        params: { userId }
    }),
}