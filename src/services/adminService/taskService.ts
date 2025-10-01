import api from "../baseService";

export const taskService = {
    getAllTask: () => api.get(`/services/app/Task/GetAll`),
};