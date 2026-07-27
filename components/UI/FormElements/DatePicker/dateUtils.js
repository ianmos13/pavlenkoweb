export const DISPLAY_DATE_REGEX = /^(\d{2})\.(\d{2})\.(\d{4})$/;

export const formatInputValue = (raw) => {
  const digits = raw.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
};

export const displayToIso = (displayValue) => {
  const date = parseDisplayDate(displayValue);
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const isoToDisplay = (isoValue) => {
  if (!isoValue || !/^\d{4}-\d{2}-\d{2}$/.test(isoValue)) return "";

  const [year, month, day] = isoValue.split("-");
  return `${day}.${month}.${year}`;
};

export const parseDisplayDate = (displayValue) => {
  const match = displayValue.match(DISPLAY_DATE_REGEX);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

export const parseIsoDate = (isoValue) => {
  if (!isoValue || !/^\d{4}-\d{2}-\d{2}$/.test(isoValue)) return null;

  const [year, month, day] = isoValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

const startOfDay = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const isValidDateValue = (isoValue, { disablePast = false } = {}) => {
  const date = parseIsoDate(isoValue);
  if (!date) return false;

  if (disablePast) {
    const today = startOfDay(new Date());
    if (date < today) return false;
  }

  return true;
};

export const validateDisplayDate = (
  displayValue,
  { disablePast = false, required = false } = {}
) => {
  if (!displayValue.trim()) {
    return required
      ? { valid: false, error: "Укажите дату." }
      : { valid: true, error: "" };
  }

  if (!DISPLAY_DATE_REGEX.test(displayValue)) {
    return { valid: false, error: "Введите дату в формате ДД.ММ.ГГГГ." };
  }

  const date = parseDisplayDate(displayValue);
  if (!date) {
    return { valid: false, error: "Введите корректную дату." };
  }

  if (disablePast) {
    const today = startOfDay(new Date());
    if (date < today) {
      return { valid: false, error: "Дата не может быть в прошлом." };
    }
  }

  return { valid: true, error: "" };
};

export const getCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  let startDayOfWeek = firstDay.getDay() - 1;
  if (startDayOfWeek < 0) startDayOfWeek = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let i = 0; i < startDayOfWeek; i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(day);
  }

  return days;
};
