export const obscureEmail = (email) => {
  const [name, domain] = String(email).split("@");
  return `${name
    .split("")
    .map((data, i) => (i + 1 < Math.ceil(name.length / 2) ? data : "*"))
    .join("")}@${domain}`;
};
