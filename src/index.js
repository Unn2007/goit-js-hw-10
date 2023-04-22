import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const refs = {
inputCountryName:document.querySelector("#search-box"),
countryList:document.querySelector(".country-list"),
countryInfo:document.querySelector(".country-info")};
refs.inputCountryName.addEventListener("input",debounce(onInput,DEBOUNCE_DELAY));
function onInput(e) {
    e.preventDefault();
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";

   let inputName = e.target.value;
   if (inputName.trim()==="") {return};
   fetchUsers(inputName.trim())
    .then((countries) => {
  if (countries.length===1) {
    renderCountryInfo(countries)
    return};
    if (countries.length>10) {
        Notiflix.Notify.success("Too many matches found. Please enter a more specific name.");
        return
    }
    renderListCountries(countries);

    })
    .catch((error) => {
      Notiflix.Notify.failure("Oops, there is no country with that name.");
      console.log(error)});

   
};







function fetchUsers(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
   
    return response.json();
  });
}
function renderListCountries(countriesInfo) {
    
      const markup = countriesInfo
        .map((countries) => {
          return `
              <li>
                <p><img src="${countries.flags.svg}" alt="flag" width="20" height="20">
                ${countries.name.official}</p>
            </li>
          `;
        })
        .join("");
      refs.countryList.innerHTML = markup;
    }
    function renderCountryInfo(countriesInfo) {
   
        const markup = countriesInfo
          .map((countries) => {
            
            return `
              <p><img src="${countries.flags.svg}" alt="flag" width="20" height="20">
                  ${countries.name.official}</p>
                 <p>Capital: ${countries.capital}</p> 
                 <p>Population: ${countries.population}</p> 
                 <p>Languages: ${Object.values(countries.languages).join("")}</p> 
              
            `;
          })
          .join("");
        refs.countryInfo.innerHTML = markup;
      }
      

