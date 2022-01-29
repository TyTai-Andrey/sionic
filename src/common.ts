import clsx from 'clsx';
export const classnames = clsx;

export const createPath = (
  sort: paramFech = null,
  range: paramFech = null,
  filter: paramFech = null
) => {
  let path = '';

  if (sort !== null || range !== null || filter !== null) {
    path += '?';
  }
  if (sort !== null) {
    path += `sort=${sort}`;
  }
  if (range !== null) {
    if (sort !== null) {
      path += '&';
    }
    path += `range=${range}`;
  }
  if (filter !== null) {
    if (sort !== null || range !== null) {
      path += '&';
    }
    path += `filter=${filter}`;
  }

  return path;
};

export const setLocalStorage = (field: string, data: any) => {
  localStorage.setItem(field, JSON.stringify(data));
};

export const getLocalStorage = (field: string) => {
  const data = localStorage.getItem(field);
  if (data) return JSON.parse(data);
  return data;
};

export const checkPhone = (tel: string) => {
  if (/[\0-9]+/g.test(tel)) return true;

  return false;
};

export const getCorrectPhone = (tel: string) => {
  return tel.replace(/\D/g, '').slice(0, 12);
};

export const getCorrectName = (name: string) => {
  const result = name.replace(/\d/g, '').match(/[\wа-я_A-Я ]+/g);
  return result ? result[0].slice(0, 31) : '';
};

export const checkName = (name: string) => {
  if (/[\wа-я_A-Я]+/g.test(name) && !/[<>()[\]\\{}~!#,;:@?$/"'`]+/g.test(name))
    return true;
  return false;
};

export function getTotalPrice<T extends object, R extends keyof T>(
  array: T[] | null,
  ...args: R[]
) {
  if (!array?.length) return 0;

  function getPriceOne<T extends object, R extends keyof T>(
    obj: T,
    ...args: R[]
  ): number {
    let total = 1;
    while (args.length) {
      const nameProp = args.shift();
      const objValue = obj[nameProp as R];
      if (typeof objValue === 'number') {
        total *= objValue;
      }
    }

    return total;
  }

  return array.reduce(
    (sum: number, item: T) => sum + getPriceOne(item, ...args),
    0
  );
}

export const copy = (numberOrder: string) => {
  const el = document.createElement('textarea');
  el.value = numberOrder;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export function noFalseValues<T>(args: T[]): boolean {
  let result = true;

  args?.forEach((item: T) => (result = result && !!item));

  return result;
}
