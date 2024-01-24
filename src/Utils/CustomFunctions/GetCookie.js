export default function getCookie(cname) {
  let name = cname + "=";
  if (document?.cookie) {
    let decodedCookie = decodeURIComponent(document?.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return "";
}

export function checkCookie() {
  let username = getCookie("username");
  if (username != "" && username) {
    return true;
  } else {
    return false;
  }
}
