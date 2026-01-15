const form = document.getElementById('subscription');
const errorMessage = document.querySelector('.error-message');
const input = document.querySelector('input[name="email"]');
const bouton = document.querySelector('.card__btn') 


/* Form management*/

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  console.log(data);

  
  const email = data.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(data.email)) {
    window.location = 'success.html';
  } else {
    input.style.backgroundColor = 'hsl(2, 100%, 95%)';
    input.style.color = 'hsl(4, 100%, 67%)';
    input.style.border = '1px solid hsl(4, 100%, 67%)';
    errorMessage.classList.remove('hidden');
  }
});


/* Desktop btn color*/

input.addEventListener('input', function(e){ 
if (input.value){
  bouton.classList.add('btn-active');
}
else{
bouton.classList.remove('btn-active');
}
});




