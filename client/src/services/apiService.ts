import client from "../api/client";

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await client.get<T>(url);
  return response.data;
};

export const poster = async <T, U>(url: string, body: U): Promise<T> => {
  const response = await client.post<T>(url, body);
  return response.data;
};
