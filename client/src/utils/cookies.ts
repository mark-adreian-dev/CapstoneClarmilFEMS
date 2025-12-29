export const getCookie = (name: string) => {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
};

export const deleteCookie = (name:string) => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};

export const deleteAllCookie = () => {
  document.cookie.split(";").forEach(cookie => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, "=; Max-Age=0; path=/");
  });
}