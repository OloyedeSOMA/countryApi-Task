// Theme toggle handling
const blackTheme = document.getElementById("theme-dark");
const lightTheme = document.getElementById("theme-light");

//enabling darkmode
function enableDarkMode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("theme", "dark");
}
//disabling darkmode
function enableLightMode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("theme", "light");
}

// Load theme from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark") enableDarkMode();
  else enableLightMode();
});

// Toggle buttons
blackTheme.addEventListener("click", enableDarkMode);
lightTheme.addEventListener("click", enableLightMode);



const url='https://restcountries.com/v3.1/all';
const searchInput =document.getElementById('searchInput');
const region = document.getElementById('filter');


//fetching all countries from api
const countryFetch=()=>{
  fetch(url).then(res => res.json()).then(data =>{
    console.log(data);
     const limitedData = data.slice(0, 12); // Get the first 10 countries
    console.log(limitedData);

    let html =``;
    limitedData.forEach(e => {
        console.log(e);
        html += 
        `
            <div class="country-card" onClick="showDetails('${e.cca2}')";>
                <img src=${e.flags.png} alt=${e.flags.alt} class="country-flag">
                <div class="country-info">
                    <h2>${e.name.official}</h2>
                    <p><strong>Population:</strong> ${e.population}</p>
                    <p><strong>Region:</strong> ${e.region}</p>
                    <p><strong>Capital:</strong> ${e.capital}</p>
                </div>
            </div>
        `;

        const Container = document.getElementById("countriesContainer");
        Container.innerHTML = html;
    });

  })
  .catch(error => console.error('Error:', error));
}
countryFetch();
//end

//fetch by region filter function
const regionFilter=(region)=>{
  const url=`https://restcountries.com/v3.1/region/${region}`;
  fetch(url).then(res => res.json()).then(data =>{
    console.log(data);
    const limitedData = data.slice(0, 12); // Get the first 10 countries
    console.log(limitedData);

    let html =``;
    limitedData.forEach(e => {
      console.log(e);
      html += 
        `
          <div class="country-card" onClick="showDetails('${e.cca2}')";>
              <img src=${e.flags.png} alt=${e.flags.alt} class="country-flag">
              <div class="country-info">
                  <h2>${e.name.official}</h2>
                  <p><strong>Population:</strong> ${e.population}</p>
                  <p><strong>Region:</strong> ${e.region}</p>
                  <p><strong>Capital:</strong> ${e.capital}</p>
              </div>
          </div>
        `;

        const Container = document.getElementById("countriesContainer");
        Container.innerHTML = html;
    });

  })
  .catch(error => console.error('Error:', error));
};


region.addEventListener("change", (e)=>{
  value = e.target.value.toLowerCase();
  console.log(value);
  if(value === "filter by region"){
    countryFetch();
  }
  else{
    regionFilter(value);
  }
  
});
//end

  //passing unique value to details page
  const showDetails=(code)=>{
    window.location.href = `Details.html?id=${code}`;
  }

  //search functionality
  const runSearch=(value)=>{
    const url=`https://restcountries.com/v3.1/name/${value}?fullText=true`;
    fetch(url).then(res => {
      if (!res.ok) throw new Error("Country not found");
      
      return res.json()
    }).then(data =>{
      console.log(data);
      let html=``;
      html+=
      `
      <a href="./index.html"><button class="back-btn">← Back</button></a>
      <div class="country-card" onClick="showDetails('${data[0].cca2}')";>
                <img src=${data[0].flags.svg} alt=${data[0].flags.alt} class="country-flag">
                <div class="country-info">
                    <h2>${data[0].name.official}</h2>
                    <p><strong>Population:</strong> ${data[0].population}</p>
                    <p><strong>Region:</strong> ${data[0].region}</p>
                    <p><strong>Capital:</strong> ${data[0].capital}</p>
                </div>
            </div>
        `;

        const Container = document.getElementById("countriesContainer");
        Container.innerHTML = html;
      
      
    })
    .catch(error => {
      console.error('Error:', error);
      window.alert("Country not found");
    
    });
    
  }
let debounceTimer;
searchInput.addEventListener("input", (e) =>{
    let value = e.target.value.trim();

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    if (value === "") {
      console.log("Input is empty — skipping API call.");
      countryFetch()
      
      return;
    }

    console.log("Searching for:", value);
    runSearch(value);
    searchInput.value="";
  }, 1000);
  
  
})
//end

