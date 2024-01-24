function getStringId(elem) {
  return  Array.isArray(elem)
    ? String(
        elem
          .sort(function (a, b) {
            if (a.value < b.value) {
              return -1;
            }
            if (a.value > b.value) {
              return 1;
            }
            return 0;
          })
          ?.map((item) => item.value)
          .join("/"),
      )
    : String(elem?.value);
}
export default getStringId;
