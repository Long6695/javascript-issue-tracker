const url = 'https://tony-json-server.herokuapp.com/api/users'
const form = document.getElementById('form')
const firstName = document.getElementById('firstname')
const lastName = document.getElementById('lastname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPass = document.getElementById('password2')
const allLabelError = document.querySelectorAll('label[class="des-error"]')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  checkInputs()
  if (checkErrorExist()) {
    addUsers()
    setTimeout(() => {
      window.location.href = './login.html'
    }, 1000)
  } else {
    console.log('error')
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
  }).then((response) => response.json())
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  password.value = ''
}
function checkInputs() {
  const firstNameLabel = document.querySelector('label[value="First Name"]')
  const lastNameLabel = document.querySelector('label[value="Last Name"]')
  const emailLabel = document.querySelector('label[value="Email"]')
  const passLabel = document.querySelector('label[value="PassWord"]')
  const confirmPassLabel = document.querySelector(
    'label[value="ConFirm PassWord"]'
  )
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
    // Check email exist
    getUsers((data) => {
      const users = data.data
      users.forEach((user) => {
        if (user.email === email.value) {
          showError(emailLabel, 'Email already exist', email)
        }
      })
    })
    // Check email not registered
    showSuccess(emailLabel, 'Correct', email)
  }

  // Check Password
  if (password.value === '') {
    showError(passLabel, 'Password cannot empty', password)
  } else if (password.value.length < 6) {
    showError(passLabel, 'Password too short', password)
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

// Check All input is empty

// function checkAllInputError() {
//   for (const input of allInput) {
//     if (input.value === '') {
//       for (const error of errorMess) {
//         error.innerText = `Please Enter ${error.getAttribute('value')}`
//         error.classList.add('active')
//         input.classList.add('active')
//         setTimeout(() => {
//           error.innerText = ''
//           error.classList.remove('active')
//           input.classList.remove('active')
//         }, 3000)
//       }
//     }
//   }
// }

// function checkAllInputSuccess() {
//   for (const input of allInput) {
//     if (typeof input.value === 'string') {
//       console.log('Done input')
//     }
//   }
// }
// // Check Password Validate
// function checkPasswordError() {
//   const errorPass = document.querySelectorAll('.password')

//   if (password.value.length < 6 && confirmPass.value.length < 6) {
//     for (const err of errorPass) {
//       err.innerText = `Password should more than 6 characters`
//       err.classList.add('active')
//       password.classList.add('active')
//       confirmPass.classList.add('active')
//       setTimeout(() => {
//         err.innerText = ''
//         err.classList.remove('active')
//         confirmPass.classList.remove('active')
//         password.classList.remove('active')
//       }, 3000)
//     }
//   } else if (password.value !== confirmPass.value) {
//     for (const err of errorPass) {
//       err.innerText = `Password Not Match`
//       err.classList.add('active')
//       confirmPass.classList.add('active')
//       password.classList.add('active')
//       setTimeout(() => {
//         err.innerText = ''
//         confirmPass.classList.remove('active')
//         err.classList.remove('active')
//         password.classList.remove('active')
//       }, 3000)
//     }
//   }
// }
// function checkPasswordSuccess() {
//   if (
//     password.value.length >= 6 &&
//     confirmPass.value.length >= 6 &&
//     password.value === confirmPass.value
//   ) {
//     console.log('done pass')
//   }
// }
// //Check Email Validate
// function validateEmail(email) {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   return re.test(email)
// }

// const errorEmail = document.querySelector('label[value="Email"]')
// function checkEmailError() {
//   if (!validateEmail(email.value)) {
//     errorEmail.innerText = `${email.value} is not valid`
//     email.classList.add('active')
//     errorEmail.classList.add('active')
//   }
//   setTimeout(() => {
//     errorEmail.innerText = ``
//     email.classList.remove('active')
//     errorEmail.classList.remove('active')
//   }, 3000)
// }

// function checkEmailSuccess() {
//   if (validateEmail(email.value)) {
//     console.log('Done email')
//   }
// }

// // Check Email is used
// function checkHadEmailError() {
//   getUsers((data) => {
//     const users = data.data
//     users.forEach((user) => {
//       if (user.email === email.value) {
//         errorEmail.innerText = `${email.value} is used`
//         email.classList.add('active')
//         errorEmail.classList.add('active')
//       }
//     })
//   })
// }

// function checkHadEmailSuccess() {
//   getUsers((data) => {
//     const users = data.data
//     users.forEach((user) => {
//       if (user.email !== email.value) {
//         console.log('Done email correct')
//       }
//     })
//   })
// }

// //Get API
// function getUsers(cb) {
//   fetch(url)
//     .then((res) => res.json())
//     .then(cb)
// }
// //POST API
// function addUsers() {
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       firstName: firstName.value,
//       lastName: lastName.value,
//       email: email.value,
//       password: password.value,
//     }),
//   })
// }

// function handleRegister(e) {
//   e.preventDefault()
//   checkAllInputError()
//   checkPasswordError()
//   checkEmailError()
//   checkHadEmailError()
// }
// if (
//   checkAllInputSuccess &&
//   checkPasswordSuccess &&
//   checkEmailSuccess &&
//   checkHadEmailSuccess
// ) {
//   addUsers()
// }

// formRegister.addEventListener('submit', handleRegister)
