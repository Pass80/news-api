const searchTxt = document.querySelector('#search-txt');
const searchBtn = document.querySelector('#search-btn');
const article = document.querySelector('article');
const countries = document.querySelector('.countries');
const newsCategories = document.querySelector('.news-categories');
const myKey = config.API_KEY;

const categoriesArray = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
];
const countriesAndLanguages = ['de', 'en', 'fr'];

categoriesArray.forEach((category) => {
    const list = document.createElement('li');
    list.addEventListener('click', () => {
        article.textContent = '';
        getCategoriesResults(category);
    });
    list.textContent = category.toUpperCase();
    newsCategories.appendChild(list);
});

searchBtn.addEventListener('click', () => {
    article.textContent = '';
    let searchTerm = searchTxt.value;
    getSearchResults(searchTerm);
    searchTxt.value = '';
});

const generateNewsArticles = (array) => {
    array.articles.forEach((obj) => {
        const articleContainer = document.createElement('div');
        const image = document.createElement('img');
        image.src = obj.urlToImage;
        const articleContent = document.createElement('p');
        articleContent.textContent = obj.content;
        const readMoreBtn = document.createElement('a');
        readMoreBtn.textContent = 'Read more';
        readMoreBtn.setAttribute('href', `${obj.url}`);
        readMoreBtn.setAttribute('target', '_blank');
        articleContainer.appendChild(image);
        articleContainer.appendChild(articleContent);
        articleContainer.appendChild(readMoreBtn);
        article.appendChild(articleContainer);
    });
};

const getSearchResults = (query) => {
    fetch(
        `https://newsapi.org/v2/everything?q=${query}&pageSize=6&page=1&apiKey=${myKey}`
    )
        .then((res) => res.json())
        .then((data) => {
            generateNewsArticles(data);
        });
};

const getCategoriesResults = (category) => {
    article.textContent = '';
    fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=6&page=1&apiKey=${myKey}`
    )
        .then((res) => res.json())
        .then((data) => {
            generateNewsArticles(data);
        });
};

const countryNews = (code) => {
    article.textContent = '';
    fetch(
        `https://newsapi.org/v2/top-headlines?country=${code}&apiKey=${myKey}`
    )
        .then((res) => res.json())
        .then((data) => {
            generateNewsArticles(data);
        });
};

fetch('https://newsapi.org/v2/everything?q=news&apiKey=${myKey}')
    .then((res) => res.json())
    .then((data) => {
        generateNewsArticles(data);
    });
