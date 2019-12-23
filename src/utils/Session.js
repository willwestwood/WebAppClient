import * as Cookies from "js-cookie";

export const setSessionCookie = (session) => {
  Cookies.remove("session");
  var now = new Date();
  now.setMinutes(now.getMinutes() + 30)
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
    let result = JSON.parse(sessionCookie);
    setSessionCookie(result)
    return result
  }
};