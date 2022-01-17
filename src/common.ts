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

export const checkPhone = (tel: string) => {
    if (/[\0-9]+/g.test(tel))
      return true;

    return false
}

export const getCorrectPhone = (tel: string) => {
    return tel.replace(/\D/g, "").slice(0, 12)
}

export const getCorrectName = (name: string) => {
    const result = name.replace(/\d/g, "").match(/[\wа-я_A-Я ]+/g);
    return result ? result[0].slice(0, 31) : ''
  };

export const checkName = (name: string) => {
    // if (/[A-z_0-9]+/g.test(name)) return true;
    if (/[\wа-я_A-Я]+/g.test(name) && !/[<>()[\]\\{}~!#,;:@?$/"'`]+/g.test(name))
      return true;
    return false;
  };
