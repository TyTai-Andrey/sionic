import { API_URL } from '../constants/constants';
import { createPath } from '../common';

export const fetchProducts = async (sort: paramFech = null, range: paramFech = null, filter: paramFech = null) => {

  try {
    const rawResponse = await fetch(
      `${API_URL}/Products/` + createPath(sort, range, filter)
    );
    const response = await rawResponse.json();
    if (rawResponse.ok) {
    return response;
    } else return false
  } catch {
    return false;
  }
};
