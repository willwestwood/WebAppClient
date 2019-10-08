import * as Cookies from "js-cookie";

export const setSessionCookie = (session) => {
  Cookies.remove("session");
  var now = new Date();
  now.setTime(now.getTime() + 1 * 30 * 1000);
  Cookies.set("session", session, { expires: now });
};

export const resetSessionCookie = () => {
  Cookies.remove("session");
};

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");

  if (sessionCookie === undefined) {
    return {};
  } else {
    return JSON.parse(sessionCookie);
  }
};