const express = require("express");
const index = require("./routers/index.js");
const path = require("path");
const session = require("express-session");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "pethubrian",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

//bootstrap
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

app.use("/", index);

app.listen(port, () => {
  console.log(`PetHug App listening on http://localhost:${port}`);
});
