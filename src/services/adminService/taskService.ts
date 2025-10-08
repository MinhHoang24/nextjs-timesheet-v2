import { TaskData } from "@/types/admin";
import api from "../baseService";

export const taskService = {
    getAllTask: () => api.get(`/services/app/Task/GetAll`),
    addNewTask: (newTaskData: TaskData) => api.post(`/services/app/Task/Save`, newTaskData),
    deleteTask: (Id: number) => api.delete(`/services/app/Task/Delete`, {
        params: { Id }
    }),
    archiveTask: (Id: number) => api.delete(`/services/app/Task/Archive`, {
        params: { Id }
    }),
    deArchiveTask: (Id: number) => api.post(`/services/app/Task/DeArchive`, { Id }),
};