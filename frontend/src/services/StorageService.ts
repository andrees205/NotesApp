const USER_ID_KEY = "userId";
const NAME_KEY = "userName";

export const getUserId = (): string | null => {
  return localStorage.getItem(USER_ID_KEY);
};

export const setUserId = (id: string): void => {
  localStorage.setItem(USER_ID_KEY, id);
};

export const clearUserId = (): void => {
  localStorage.removeItem(USER_ID_KEY);
};

export const getUserName = (): string | null => {
  return localStorage.getItem(NAME_KEY);
};

export const setUserName = (name: string): void => {
  localStorage.setItem(NAME_KEY, name);
};

export const clearUserName = (): void => {
  localStorage.removeItem(NAME_KEY);
};
