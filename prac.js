document.getElementById('animateCloud').addEventListener('click', function() {
  const cloud = document.querySelector('.cloud');
  cloud.classList.add('animate');

  setTimeout(() => {
    cloud.classList.remove('animate');
  }, 2000); 
});
