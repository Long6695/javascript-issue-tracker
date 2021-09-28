const url = 'https://tony-json-server.herokuapp.com/api/users'
const form = document.getElementById('form')
const email = document.getElementById('email')
const password = document.getElementById('password')

function getUsers(cb) {
  fetch(url)
    .then((res) => res.json())
    .then(cb)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  getUsers((data) => {
    const allUsers = data.data
    allUsers.forEach((user) => {
      if (user.email === email.value && user.password === password.value) {
        window.location.href = '../dashboard/index.html'
      } else {
        alert('Wrong email or password')
      }
    })
  })
})
