const url = 'https://tony-json-server.herokuapp.com/api/users'
const form = document.getElementById('form')
const firstName = document.getElementById('firstname')
const lastName = document.getElementById('lastname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPass = document.getElementById('password2')
const isLoading = document.querySelector('.loading')
const allLabelError = document.querySelectorAll('label[class="des-error"]')

const firstNameLabel = document.querySelector('label[value="First Name"]')
const lastNameLabel = document.querySelector('label[value="Last Name"]')
const emailLabel = document.querySelector('label[value="Email"]')
const passLabel = document.querySelector('label[value="PassWord"]')
const confirmPassLabel = document.querySelector(
  'label[value="ConFirm PassWord"]'
)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  checkInputs()
  isLoading.classList.add('active')
  if (checkErrorExist()) {
    setTimeout(() => {
      addUsers()
    }, 1000)
  } else {
    isLoading.classList.remove('active')

    console.log('wrong')
  }
})
// Check before add API Users
function checkErrorExist() {
  for (const error of allLabelError) {
    if (error.classList.contains('error')) {
      return false
    }
  }
  return true
}

//Get API
function getUsers(cb) {
  fetch(url)
    .then((res) => res.json())
    .then(cb)
}

//POST API
function addUsers() {
  getUsers((data) => {
    const users = data.data
    const isUserExisted = users.some((user) => user.email === email.value)
    if (isUserExisted) {
      showError(emailLabel, 'Email already exist', email)
      return
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      }),
    })
      .then(() => (window.location.href = './login.html'))
      .catch((error) => console.log('error register: ', error))
  })
}

function checkInputs() {
  // Check First Name
  if (firstName.value === '') {
    showError(firstNameLabel, 'First Name cannot empty', firstName)
  } else {
    showSuccess(firstNameLabel, 'Correct', firstName)
  }

  // Check Last Name
  if (lastName.value === '') {
    showError(lastNameLabel, 'Last Name cannot empty', lastName)
  } else {
    showSuccess(lastNameLabel, 'Correct', lastName)
  }

  // Check Email
  if (email.value === '') {
    showError(emailLabel, 'Email cannot empty', email)
  } else if (!isEmail(email.value)) {
    showError(emailLabel, 'Email not valid', email)
  } else {
    showSuccess(emailLabel, 'Correct', email)
  }

  // Check Password
  if (password.value === '' || password.value.length < 6) {
    showError(passLabel, 'Password cannot empty', password)
  } else {
    showSuccess(passLabel, 'Correct', password)
  }

  // Check Confirm Password
  if (confirmPass.value === '') {
    showError(confirmPassLabel, 'Password cannot empty', password)
  } else if (confirmPass.value !== password.value) {
    showError(confirmPassLabel, 'Password does not match', password)
  } else {
    showSuccess(confirmPassLabel, 'Correct', confirmPass)
  }
}
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

function isEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
