const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
    'language': 'es-ES',
  },
});

async function getTrendingMoviesPreview() {
  const { data } = await api(`trending/movie/day`);
  const movies = data.results;

  const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
  const fragment = new DocumentFragment();
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    
    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

    movieContainer.appendChild(movieImg);
    fragment.appendChild(movieContainer);
  });

  return trendingPreviewMoviesContainer.appendChild(fragment);
}

async function getCategoriesPreview() {
  const { data } = await api(`genre/movie/list`);

  const categories = data.genres;
  const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
  const fragment = new DocumentFragment();
  
  categories.forEach(category => {

    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', `id${category.id}`);
    categoryTitle.innerText = category.name;
    
    categoryContainer.appendChild(categoryTitle);
    fragment.appendChild(categoryContainer);
  });
  return previewCategoriesContainer.appendChild(fragment);
}
