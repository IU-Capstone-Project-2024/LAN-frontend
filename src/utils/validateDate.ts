export const isValidDate = (dateString: string, registrationDate: Date): boolean => {
  const regex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!regex.test(dateString)) return false;

  const [day, month, year] = dateString.split('.').map(Number);
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return false;
  }

  const today = registrationDate;
  const hundredYearsAgo = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

  return !(date > today || date < hundredYearsAgo);


};
