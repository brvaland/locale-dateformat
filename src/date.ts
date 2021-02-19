import { parse, isDate } from "date-fns";

export const getLocaleDateFormat = () => {
  console.log(navigator.language);

  const formatObj = new Intl.DateTimeFormat(navigator.language).formatToParts(
    new Date()
  );

  return formatObj
    .map((obj: any) => {
      switch (obj.type) {
        case "day":
          return "dd";
        case "month":
          return "MM";
        case "year":
          return "yyyy";
        default:
          return obj.value;
      }
    })
    .join("");
};

export const parseDateString = (
  value: any,
  originalValue: any,
  format: string
) => {
  if (isDate(originalValue)) return originalValue;

  if (!isNaN(Date.parse(originalValue))) {
    return new Date(originalValue);
  }

  return parse(originalValue, format, new Date());
};

export const getLocaleDateTimeFormat = () => {
  return `${getLocaleDateFormat()} HH:mm`;
};
