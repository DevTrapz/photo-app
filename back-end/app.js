var express = require("express");
var path = require("path");
const cors = require("cors");

var imageRouter = require("./routes/images");
var videoRouter = require("./routes/videos");

var app = express();

app.use(cors());
app.use("/images", imageRouter);
app.use("/videos", videoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
