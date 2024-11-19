const type = document.getElementById('productType');
const bookfield = document.getElementById('bookinfo');
const moviefield = document.getElementById('movieinfo');

const showField = () => {
  if (type.value === 'book') {
    bookfield.style.display = 'block';
    moviefield.style.display = 'none';
  } else {
    moviefield.style.display = 'block';
    bookfield.style.display = 'none';
  }
};
