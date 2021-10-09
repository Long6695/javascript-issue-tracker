const url = 'https://tony-json-server.herokuapp.com/api/users'
const form = document.getElementById('form')
const email = document.getElementById('email')
const password = document.getElementById('password');
const loading = document.getElementById('loading');
loading.style.display = 'none';

function getUsers(cb) {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then(cb)
}

let users = [];

getUsers(data => users = data.data)

form.addEventListener('submit', (e) => {
  loading.style.display = 'block';

  e.preventDefault()
  users.forEach((user) => {
    if (user.email === email.value && user.password === password.value) {
      localStorage.setItem('user', email.value)
      window.location.href = '../dashboard/index.html'
     
    }
  })
  
  setTimeout(() => {
    loading.style.display = 'none';
  }, 500)
  
})

if (localStorage.getItem('user') !== null) {
  window.location.href = '../dashboard/index.html'
}


