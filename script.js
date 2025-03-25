let page = 1;
async function fetchNews(page) {
    const apiKey = "2ce9d4509a274e8084beb67dcbea821c";
    const url = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&apiKey=${apiKey}`;

    let response = await fetch(url);
    let data = await response.json();
    console.log(JSON.stringify(data));

    let contentContainer = document.querySelector(".content");
    let str = "";

    for (let item of data.articles) {
        str += `
            <div class="card my-4 mx-2" style="width: 18rem;">
                <img src="${item.urlToImage}" class="card-img-top" alt="News Image">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <a href="${item.url}" target="_blank" class="btn btn-primary">Read More</a>
                </div>
            </div>
        `;
    }

    contentContainer.innerHTML += str;
};

fetchNews(page);
document.getElementById("load-more").addEventListener("click", function () {
    page++;
    fetchNews(page);
});




