function Validate(formSelector) {
  const url = 'https://tony-json-server.herokuapp.com/api/users'

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

  const getParent = (element, selector) => {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement
      }
      element = element.parentElement
    }
  }
  const formValidation = {}

  const validateValue = {
    isRequired(value) {
      return value ? undefined : 'Please Enter This Field'
    },
  }

  const formEl = document.querySelector(formSelector)

  const inputs = formEl.querySelectorAll('input[name]')
  if (formEl) {
    let input
    for (input of inputs) {
      formValidation[input.name] = validateValue.isRequired

      input.onblur = handleCheckMessage
      input.oninput = handleCheckInput
    }
    function handleCheckMessage(e) {
      const formGroup = getParent(e.target, '.form-group')
      const messEl = formGroup.querySelector('.message')
      const message = formValidation[input.name](e.target.value)

      if (message) {
        messEl.innerText = message
        formGroup.classList.add('error')
        formGroup.classList.remove('success')
      } else {
        messEl.innerText = ''
        formGroup.classList.remove('error')
        formGroup.classList.add('success')
      }

      return !message
    }

    function handleCheckInput(e) {
      const formGroup = getParent(e.target, '.form-group')
      const messEl = formGroup.querySelector('.message')
      const message = formValidation[input.name](e.target.value)
      if (!message) {
        messEl.innerText = ''
        formGroup.classList.remove('error')
        formGroup.classList.add('success')
      }
    }

    formEl.addEventListener('submit', (e) => {
      e.preventDefault()
      let isValid = false
      const inputs = formEl.querySelectorAll('input[name]')
      for (let input of inputs) {
        if (
          !handleCheckMessage({
            target: input,
          })
        ) {
          isValid = false
        } else {
          isValid = true
        }
      }
      if (isValid) {
        const emailEl = document.getElementById('email')
        const passEl = document.getElementById('password')
        const user = users.find((user) => user.email === emailEl.value)

        if (user === undefined) {
          const emailParentEl = getParent(emailEl, '.form-group')
          const message = emailParentEl.querySelector('.message')
          message.innerText = `Couldn't find your Account`
          emailParentEl.classList.add('error')
          return
        }

        if (user.email && !user.password) {
          const isLoading = document.querySelector('.loading')
          isLoading.classList.add('active')
          localStorage.setItem('user', email.value)
          if (localStorage.getItem('user') !== null) {
            setTimeout(() => {
              window.location.href = '../dashboard/index.html'
            }, 1500)
          }
        } else if (user.email && user.password) {
          if (user.password === passEl.value) {
            const isLoading = document.querySelector('.loading')
            isLoading.classList.add('active')
            localStorage.setItem('user', email.value)
            if (localStorage.getItem('user') !== null) {
              setTimeout(() => {
                window.location.href = '../dashboard/index.html'
              }, 1500)
            }
          } else {
            const passParentEl = getParent(passEl, '.form-group')
            const message = passParentEl.querySelector('.message')
            message.innerText = `Please try again, Wrong Password!`
            passParentEl.classList.add('error')
          }
        }
      } else {
        throw 'Error'
      }
    })
  }
}

Validate('#form')
