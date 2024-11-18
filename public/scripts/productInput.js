const type = document.getElementById('productType');
const bookfield = document.getElementById('bookinfo');
const moviefield = document.getElementById('movieinfo');

const showField = () => {
  if (type.value === 'Book') {
    bookfield.style.display = 'show';
    movie.style.display = 'none';
  } else {
    movie.style.display = 'show';
    bookfield.style.display = 'none';
  }
};
