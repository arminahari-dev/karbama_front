function DateFormater(inputDate: string) {
  const date = new Date(inputDate);
  return date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default DateFormater;
