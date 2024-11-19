document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('libraryForm');

  form.addEventListener('submit', function(event) {
    // Prevent form submission
    event.preventDefault();

    // Validate each field
    if (validateForm()) {
      // If validation passes, submit the form
      form.submit();
    }
  });

  function validateForm() {
    let isValid = true;

    // Validate Book Title
    const bookTitle = document.getElementById('bookTitle');
    if (bookTitle.value.trim() === '') {
      displayError(bookTitle, 'Book title is required.');
      isValid = false;
    } else {
      clearError(bookTitle);
    }

    // Validate Author Name
    const authorName = document.getElementById('authorName');
    if (authorName.value.trim() === '') {
      displayError(authorName, 'Author name is required.');
      isValid = false;
    } else {
      clearError(authorName);
    }

    // Validate ISBN
    const isbn = document.getElementById('isbn');
    const isbnPattern = /^\d{13}$/;
    if (!isbnPattern.test(isbn.value.trim())) {
      displayError(isbn, 'ISBN must be a 13-digit number.');
      isValid = false;
    } else {
      clearError(isbn);
    }

    return isValid;
  }

  function displayError(element, message) {
    let errorElement = element.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      element.parentNode.insertBefore(errorElement, element.nextSibling);
    }
    errorElement.textContent = message;
    element.classList.add('error');
  }

  function clearError(element) {
    const errorElement = element.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.textContent = '';
    }
    element.classList.remove('error');
  }
});
