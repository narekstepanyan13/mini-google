const formEl = document.getElementById("form");
const inputEl = document.getElementById('input');
let page = 1;
const results = document.getElementById("results");
const viewEl = document.getElementById("view");
const moredivEl = document.getElementById("more-div");
const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
moredivEl.style.display = "none"

formEl.addEventListener('submit', (event) => {
  page = 1;
  event.preventDefault();
  moredivEl.style.display = "flex"
  results.innerHTML = ""
  fetchImages();
})

viewEl.addEventListener('click', (event) => {
  event.preventDefault();
  page++
  fetchImages();
})

async function fetchImages() {
  const inputData = inputEl.value
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  if (inputData.trim().length) {
    alert("Please enter a search term");
    return;
  }

  const response = await fetch(url)
  const data = await response.json();

  for (let item of data.results) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card')

    const imageEl = document.createElement('img');
    imageEl.classList.add('image')
    imageEl.setAttribute('src', item.urls.regular)

    const aEl = document.createElement('a')
    aEl.classList.add('description')
    aEl.innerText = item.alt_description;
    aEl.setAttribute("href", item.links.html)
    aEl.setAttribute("target", "_blank")

    cardEl.append(imageEl);
    cardEl.append(aEl);
    results.append(cardEl);


  }

}



function showSidebar() {
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'
}
function hideSidebar() {
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'none'
}