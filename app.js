const form = document.querySelector("form");
const searchInput = form.querySelector("#searchInput");
const displayResult = document.querySelector("#displayResult");
const showMoreBtn = document.querySelector("#showMore");
let api_KEY;
// Keep page count
let page = 1;
let queryKeyword = "";

fetch("config.json")
  .then((response) => response.json())
  .then((config) => {
    const secretKey = config.API_KEY;
    api_KEY = secretKey;
    console.log(`Secret Key: ${api_KEY}`);
  })
  .catch((error) => console.error(error));


// Async function to fetch query
async function fetchResults() {
  queryKeyword = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${queryKeyword}&client_id=${api_KEY}`;
  // fetch data
  const response = await fetch(url);
  const data = await response.json();
  if(page === 1){
      displayResult.innerHTML = "";
  }
  // Get results[Array] from data
  const results = data.results;
  console.log(results);
  // Map result
  results.map((result) => {
    const resultWrapper = document.createElement("div");
    resultWrapper.classList.add("result");
    const imgPreview = document.createElement("img");
    imgPreview.src = result.urls.small;
    imgPreview.alt = result.alt_description;
    const linkText = document.createElement("a");
    linkText.href = result.links.html;
    linkText.innerText = result.alt_description;
    linkText.target = "_blank";
    linkText.setAttribute("ref", "noopener noreferrer");

    // Append
    resultWrapper.appendChild(imgPreview);
    resultWrapper.appendChild(linkText);
    displayResult.appendChild(resultWrapper);

    if (page > 1) {
        showMoreBtn.style["display"] = "block";
    }
    page++;
  });
}

// Listeneing for submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
    page = 1
  fetchResults();
});

showMoreBtn.addEventListener('click', ()=>{
    fetchResults()
})