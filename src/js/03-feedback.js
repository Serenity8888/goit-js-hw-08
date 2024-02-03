import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.feedback-form');

  // Function to update local storage with form data
  const updateLocalStorage = throttle(function () {
    const formData = {
      email: form.elements.email.value,
      message: form.elements.message.value,
    };

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }, 500);

  // Event listener for input changes in the form
  form.addEventListener('input', function () {
    updateLocalStorage();
  });

  // Function to load state from local storage
  const loadStateFromLocalStorage = function () {
    const storedData = localStorage.getItem('feedback-form-state');

    if (storedData) {
      const formData = JSON.parse(storedData);
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    }
  };

  // Call the function to load state when the page loads
  loadStateFromLocalStorage();

  // Function to handle form submission
  const handleSubmit = function (event) {
    event.preventDefault();

    // Get form data
    const formData = {
      email: form.elements.email.value,
      message: form.elements.message.value,
    };

    // Display form data in the console
    console.log('Form Data:', formData);

    // Clear local storage and form fields
    localStorage.removeItem('feedback-form-state');
    form.reset();
  };

  // Event listener for form submission
  form.addEventListener('submit', handleSubmit);
});
