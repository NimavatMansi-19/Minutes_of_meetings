export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
  document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Strict`;
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0";
};

export const getRoleFromToken = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload.role;
  } catch (e) {
    return null;
  }
};
