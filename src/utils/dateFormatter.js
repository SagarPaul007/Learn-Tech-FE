const getDate = (date) => {
  const d = date ? new Date(date) : new Date();
  const yyyy = d.getFullYear();
  let mm = d.getMonth() + 1; // Months start at 0!
  let dd = d.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;
  return formattedDate;
};

module.exports = {
  getDate,
};
