export interface TaskData {
    id: number;
    isDeleted: boolean;
    name: string;
    type: number;
}

export interface TaskUI extends TaskData {
    isArchive?: boolean;
}