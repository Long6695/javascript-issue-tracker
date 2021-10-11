const url = 'https://tony-json-server.herokuapp.com/api/users'
const form = document.getElementById('form')
const email = document.getElementById('email')
const password = document.getElementById('password')
const emailLabel = document.querySelector('label[value="Email"]')
const passLabel = document.querySelector('label[value="PassWord"]')
const isLoading = document.querySelector('.loading')
const statusMessage = document.querySelector('.status-login')

let users
function getUsers() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      users = data.data
    })
    .catch((error) => console.log(error))
}
getUsers()
statusMessage.classList.add('active')
form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (users) {
    const checkUser = users.filter((user) => {
      return user.email === email.value
    })
    console.log(checkUser)
    let isCorrect = false

    if (checkUser.length > 0) {
      if (checkUser[0].email && checkUser[0].email !== '') {
        isCorrect = true
        showSuccess(emailLabel, 'Email đã đăng kí', email)
      }

      if (
        checkUser[0].password === password.value &&
        checkUser[0].password !== ''
      ) {
        isCorrect = true
        showSuccess(passLabel, 'Password OK', password)
      } else if (checkUser[0].password !== password.value) {
        isCorrect = false
        showError(passLabel, 'Wrong Password', password)
      }

      if (isCorrect) {
        isLoading.classList.add('active')
        localStorage.setItem('user', email.value)
        if (localStorage.getItem('user') !== null) {
          setTimeout(() => {
            window.location.href = '../dashboard/index.html'
          }, 1500)
        }
      }
    } else {
      showError(emailLabel, 'Email chưa đăng kí', email)
    }
  }
})

function showError(label, message, input) {
  label.className = 'des-error error'
  label.innerText = message
  input.className = 'error'
}

function showSuccess(label, message, input) {
  label.className = 'des-error success'
  label.innerText = message
  input.className = 'success'
}
