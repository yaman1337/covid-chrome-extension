const select = document.querySelector(".search");
const flag = document.getElementById('flag');
const deaths = document.getElementById('deaths');
const newCase = document.getElementById('new');
const test = document.getElementById('test');
const loaders = document.querySelectorAll(".loading");
const data_el = document.querySelectorAll(".data");

window.onload = fetchCountries;
select.onchange = callData;


function fetchCountries() {
  fetch("https://disease.sh/v3/covid-19/countries/")
    .then((res) => res.json())
    .then((data) => {
      data.map((item) => {
        select.innerHTML += `<option>${item.country}</option>`;
      });
    });
}

async function callData() {
  const country = document.getElementById("search").value;

  loaders.forEach(loader => {
    loader.classList.remove("close");
    loader.classList.add("open");
  })

  data_el.forEach(data => {
    data.classList.add("close")
  })

  await fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
    .then((res) => res.json())
    .then((item) => {

      loaders.forEach(loader => {
        loader.classList.remove("open");
        loader.classList.add("close");
      })

      data_el.forEach(data => {
        data.classList.remove("close")
      })

      flag.innerHTML = `<img src=${item.countryInfo.flag} height="30px">`;
      deaths.textContent = item.deaths;
      newCase.textContent = item.todayCases == 0 ? "Updating soon" : `+ ${item.todayCases}`;
      test.textContent = item.tests;
    });
}
