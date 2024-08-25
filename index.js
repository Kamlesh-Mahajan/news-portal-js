import API_KEY from "./apikey.js";
const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");

const baseUrl = "https://newsapi.org/v2/";
const apiKey = API_KEY;

const backupImage =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

async function dataRequest(url) {
  try {
    const response = await fetch(baseUrl + url + apiKey);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

function urlRequest(url) {
  dataRequest(url).then((data) => {
    data.articles.forEach((item) => {
      cards.innerHTML += `<div class="card">
                <div class="image">
                  <img
                    src="${item.urlToImage ? item.urlToImage : backupImage}"
                    alt="Default News Image"
                  />
                </div>
                <div class="information">
                  <div>
                    <p class="title">
                     ${item.title}
                    </p>
                    <p class="description">
                     ${item.description ? item.description : "No Description"}
                    </p>
                    <p class="time">
                      <span>${
                        item.publishedAt.replace("Z", "").split("T")[1]
                      }</span>
                      <span>${
                        item.publishedAt.replace("Z", "").split("T")[0]
                      }</span>
                    </p>
                  </div>
                  <div class="other">
                    <span class="source">${item.source.name}</span>
                    <a class="url" target="-blank" href="${item.url}">
                      Read Article <i class="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>`;
    });
  });
}

category.addEventListener("click", (event) => {
  if (event.target.tagName === "SPAN") {
    cards.innerHTML = "";
    urlRequest(event.target.dataset.url);
    categorySpan.forEach((item) => {
      item.classList.remove("active");
    });
    event.target.classList.add("active");
  }
});

urlRequest("/everything?q=india&sortBy=popularity");
