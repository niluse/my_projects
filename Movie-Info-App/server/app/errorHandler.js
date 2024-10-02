"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

// module.exports = (err, req, res, next) => {
  // const errorStatusCode = res.errorStatusCode ?? 500;
  // console.log("errorHandler worked.");
  // res.status(errorStatusCode).send({
    // error: true, // special data
    // message: err.message, // error string message
    // cause: err.cause, // error option cause
    // // stack: err.stack, // error details
  // });
// };

// app/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    error: true,
    message: err.message || 'Internal Server Error',
  });
};
