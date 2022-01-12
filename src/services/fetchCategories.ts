import { API_URL } from '../constants/constants';

export const fetchCategories = async () => {
  try {
    const rawResponse = await fetch(
      `${API_URL}/Categories/`
    );
    const response = await rawResponse.json();
    if (rawResponse.ok) {
    return response;
    } else return false
  } catch {
    return false;
  }
};
