const moment = require("moment/moment");

const isDate = (value) => {
  if (!value) {
    return false;
  }

  const date = moment(value);

  if (date.isValid()) {
    return true;
  } else {
    return true;
  }
};

module.exports = {
  isDate,
};
