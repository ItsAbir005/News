let page = 1;
const pageSize = 10;

async function fetchNews(page) {
    const apiKey = "2ce9d4509a274e8084beb67dcbea821c";
    const url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&page=${page}&apiKey=${apiKey}`;

    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    let data = await response.json();
    console.log(JSON.stringify(data));

    let contentContainer = document.querySelector(".content");
    let str = "";
    let articles = data.articles.slice(0, pageSize);
    for (let item of articles) {
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

    contentContainer.innerHTML = str;
}

fetchNews(page);

document.getElementById("next").addEventListener("click", function () {
    page++;
    fetchNews(page);
});

document.getElementById("prev").addEventListener("click", function () {
    if (page > 1) {
        page--;
        fetchNews(page);
    }
});
