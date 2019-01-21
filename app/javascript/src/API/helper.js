export const addCsrf = object => {
  const token = document.querySelector("meta[name=csrf-token]").content;
  const key = document.querySelector("meta[name=csrf-param]").content;
  object[key] = token;
  return object;
};
