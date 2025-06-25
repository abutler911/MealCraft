// src/utils/dateHelpers.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const formatDateLong = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getDateForDay = (startDate, dayNumber) => {
  if (!startDate) return null;

  const start = new Date(startDate + "T00:00:00");
  return addDays(start, dayNumber - 1);
};

export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const compareDate = new Date(date);
  return today.toDateString() === compareDate.toDateString();
};

export const isPast = (date) => {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
};
