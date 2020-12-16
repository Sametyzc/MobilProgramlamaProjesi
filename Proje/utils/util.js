export default function parseDate(date) {
  var value =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return value;
}
