const puppeteer = require("puppeteer");

const getMovies = async (url) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const movies = await page.evaluate(() => {
    let movies = [];
    let elements = document.querySelectorAll(".ipc-poster-card");
    elements.forEach((element) => {
      const movie = {
        title: element.querySelector(".ipc-poster-card__title span").innerHTML,
        featuredImage: element.querySelector(".ipc-image").src,
        rate: parseFloat(
          element
            .querySelector(".ipc-rating-star")
            .innerHTML.replace(/<(?:.|\n)*?>/gm, "")
        ),
      };
      movies = [...movies, movie];
    });
    return movies;
  });
  await browser.close();
  return {
    data: movies,
    averageRate:
      movies.reduce((acc, curr) => {
        return acc + curr.rate;
      }, 0) / movies.length,
  };
  
};

module.exports = getMovies;
