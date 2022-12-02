import API_KEY from './config.js';
const searchTxt = document.querySelector('#search-txt');
const searchBtn = document.querySelector('#search-btn');
const article = document.querySelector('article');
const newsCategories = document.querySelector('.news-categories');
const german = document.querySelector('#de');
const english = document.querySelector('#us');
const french = document.querySelector('#fr');

const categoriesArray = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
];

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
    fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            generateNewsArticles(data);
        });
};

const getCategoriesResults = (category) => {
    article.textContent = '';
    fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    )
        .then((res) => res.json())
        .then((data) => {
            generateNewsArticles(data);
        });
};

const countryNews = (code) => {
    article.textContent = '';
    fetch(
        `https://newsapi.org/v2/top-headlines?country=${code}&apiKey=${API_KEY}`
    )
        .then((res) => res.json())
        .then((data) => {
            generateNewsArticles(data);
        });
};

german.addEventListener('click', () => {
    countryNews('de');
});
english.addEventListener('click', () => {
    countryNews('us');
});
french.addEventListener('click', () => {
    countryNews('fr');
});

fetch(`https://newsapi.org/v2/everything?q=news&apiKey=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
        generateNewsArticles(data);
    });
