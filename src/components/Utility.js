var moment = require('moment')

module.exports = {
    dateFormat: "YYYY-MM-DD",
    formatDateToString: function(value) {
      if(moment.isDate(value))
      {
        var moDate = moment(value);
        return moDate.format(this.dateFormat);
      }
      return "";
    }

}
