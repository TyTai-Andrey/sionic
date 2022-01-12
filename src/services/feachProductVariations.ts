import { API_URL } from '../constants/constants';
import { createPath } from '../common';

export const feachProductVariations = async (id: number | paramFech = null, sort: paramFech = null, range: paramFech = null, filter: paramFech = null) => {
    try {
    const rawResponse = await fetch(
      `${API_URL}/ProductVariations/${id ? id : ''}` + createPath(sort, range, filter)
    );
    const response = await rawResponse.json();
    if (rawResponse.ok) {
    return response;
    } else return false
  } catch {
    return false;
  }
};
