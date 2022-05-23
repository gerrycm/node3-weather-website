console.log("client side js loaded");

/*
fetch("http://puzzle.mead.io/puzzle").then((reponse) => {
    reponse.json().then((data) => {
        console.log(data)
    })

})
*/

const getWeather = (address, callback) => {
  fetch("weather?address=" + address + "").then((response) => {
    response.json().then((data) => {
      callback(data);
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector('#messageone')
const messageTwo = document.querySelector('#messagetwo')

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  let data;

  messageOne.innerHTML = "loading";
  messageTwo.innerHTML = "";

  getWeather(location, (data) => {
    if (data.error) {
        messageOne.innerHTML = data.error;
        messageTwo.innerHTML = "";
    } else {
        messageOne.innerHTML = data.location;
        messageTwo.innerHTML = data.forecast;
    }
  });

  //console.log("form submitted")
});
