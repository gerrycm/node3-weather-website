const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "gerry",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "gerry",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    name: "gerry",
    helpmessage: "this is a help message!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  } else {
    //weather and geocode stuff

    geocode(
      req.query.address,
      (error, { longitude, lattitude, location } = {}) => {
        if (error) {
          return res.send({
            error,
          });
        } else {
          forecast(longitude, lattitude, (error, forecastdata) => {
            if (error) {
              return res.send({
                error,
              });
            } else {
              console.log(location);
              console.log(forecastdata);

              return res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address,
              });
            }
          });
        }
      }
    );

    //end weather and geocode stuff
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "help article not found",
    name: "gerry",
    errormessage: "help article not found",
  });
});

//match anything that hasnt been matched
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 - page not found",
    name: "gerry",
    errormessage: "404 - page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
