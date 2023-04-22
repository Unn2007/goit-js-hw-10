import './css/styles.css';
import Notiflix from 'notiflix';


import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 1000;
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
   fetchUsers(inputName.trim())
    .then((countries) => {
        if (inputName.trim()==="") {return};
       if (countries.length===1) {renderCountryInfo(countries)
    return};
    if (countries.length>10) {
        Notiflix.Notify.success("Too many matches found. Please enter a more specific name.");
        return
    }
    renderListCountries(countries);

    })
    .catch((error) => console.log(error));

   
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
      

// const fetchUsersBtn = document.querySelector(".btn");
// const userList = document.querySelector(".user-list");

// fetchUsersBtn.addEventListener("click", () => {
//   fetchUsers()
//     .then((users) => renderUserList(users))
//     .catch((error) => console.log(error));
// });

// function fetchUsers() {
//   return fetch(
//     "https://jsonplaceholder.typicode.com/users?_limit=7&_sort=name"
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// function renderUserList(users) {
//   const markup = users
//     .map((user) => {
//       return `
//           <li>
//             <p><b>Name</b>: ${user.name}</p>
//             <p><b>Email</b>: ${user.email}</p>
//             <p><b>Company</b>: ${user.company.name}</p>
//           </li>
//       `;
//     })
//     .join("");
//   userList.innerHTML = markup;
// }




