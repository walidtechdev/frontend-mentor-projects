const form = document.getElementById('inscription');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  // Convertir age en nombre
  const age = Number(data.age); // Comment convertir data.age en nombre ?

  // Vérifier que c'est positif
  if (age > 0 && age < 120) {
    console.log('✅ Age valide');
  } else {
    console.log('❌ Age invalide');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(data.email)) {
    console.log('✅ Email valide');
  } else {
    console.log('❌ Email invalide');
  }
});
