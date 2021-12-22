export type Homework = {
    class?: string;
    todo?: string;
    due?: string;
    done?: boolean;
};

export type HomeworkSet = {
    [key: string]: Homework
}

export type UserData = {
    data: HomeworkSet;
    removed: string[];
    last: string;
};

export as namespace UserDataType;
