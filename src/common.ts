import clsx from 'clsx';
export const classnames = clsx;


export const createPath = (sort: paramFech, range: paramFech, filter: paramFech) => {
    let path = '';

    if (sort !== null || range !== null || filter !== null) {
        path+='?';
    }
    if (sort !== null) {
        path+=`sort=${sort}`;
    }
    if (range !== null) {
        path+=`range=${range}`;
    }
    if (filter !== null) {
        path+=`filter=${filter}`;
    }

    return path;
}

export const setLocalStorage = (field: string, data: any) => {
    localStorage.setItem(field, JSON.stringify(data))
}

export const getLocalStorage = (field: string) => {
    const data = localStorage.getItem(field);
    if (data) return JSON.parse(data);
    return data;
}
