import { API_URL } from '../constants/constants';

type param = string | null

export const fetchProducts = async (sort: param, range: param, filter: param) => {

    let path = '';

    if (sort || range || filter) {
        path+='?';
    }
    if (sort) {
        path+=`sort=${sort}`;
    }
    if (range) {
        path+=`range=${range}`;
    }
    if (filter) {
        path+=`filter=${filter}`;
    }
  try {
    const rawResponse = await fetch(
      `${API_URL}/Products/` + path
    );
    const response = await rawResponse.json();
    if (rawResponse.ok) {
    return response;
    } else return false
  } catch {
    return false;
  }
};
