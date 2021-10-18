function validateRegister(formSelector) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement
      }
      element = element.parentElement
    }
  }

  const formValidate = {}

  const validateInput = {
    required: function (value) {
      return value ? undefined : 'Please Enter This Field'
    },
    email: function (value) {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(value) ? undefined : 'Incorrect Email Format'
    },
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `Password should have ${min} characters`
      }
    },
    max: function (max) {
      return function (value) {
        return value.length <= max
          ? undefined
          : `Password should have ${max} characters`
      }
    },

    match: function (value) {
      const password = document.getElementById('password')
      return value === password.value && value.length >= 6
        ? undefined
        : 'Password dont match'
    },
  }
  const formEl = document.getElementById(formSelector)
  const inputs = formEl.querySelectorAll('[name][rules]')
  if (formEl) {
    for (let input of inputs) {
      const rules = input.getAttribute('rules').split('/')
      for (let rule of rules) {
        let isRuleHasValue = rule.includes(':')
        let ruleInfo
        if (isRuleHasValue) {
          ruleInfo = rule.split(':')
          rule = ruleInfo[0]
        }

        let ruleFunc = validateInput[rule]

        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1])
        }

        if (Array.isArray(formValidate[input.name])) {
          formValidate[input.name].push(ruleFunc)
        } else {
          formValidate[input.name] = [ruleFunc]
        }
      }
      input.onblur = handleValidate
      input.oninput = handleClearError
    }
    function handleValidate(e) {
      const rules = formValidate[e.target.name]
      let errorMessage
      rules.find((rule) => {
        errorMessage = rule(e.target.value)
        return errorMessage
      })

      const formParent = getParent(e.target, '.form-group')
      if (formParent) {
        const message = formParent.querySelector('.message')
        if (message) {
          if (errorMessage) {
            message.innerText = errorMessage
            formParent.classList.add('error')
          }
        }
      }

      return !errorMessage
    }

    function handleClearError(e) {
      const formParent = getParent(e.target, '.form-group')
      const message = formParent.querySelector('.message')

      if (formParent.classList.contains('error')) {
        formParent.classList.remove('error')
        formParent.classList.add('success')
        message.innerText = ''
      }
    }
  }

  //Get API
  const url = 'https://tony-json-server.herokuapp.com/api/users'
  function getUsers(cb) {
    fetch(url)
      .then((res) => res.json())
      .then(cb)
  }

  //POST API
  function addUsers(formValues) {
    delete formValues.password2
    getUsers((data) => {
      const emailEl = document.getElementById('email')
      const users = data.data
      const isUserExisted = users.some((user) => user.email === emailEl.value)
      if (isUserExisted) {
        const formParent = getParent(emailEl, '.form-group')
        const emailElMess = formParent.querySelector('.message')
        emailElMess.innerText = 'Email already exist'
        formParent.classList.add('error')
        const isLoading = document.querySelector('.loading')
        isLoading.classList.remove('active')
      } else {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        })
          .then(() => (window.location.href = './login.html'))
          .catch((error) => console.log('error register: ', error))
      }
    })
  }

  formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    let isValid = false
    for (let input of inputs) {
      if (
        !handleValidate({
          target: input,
        })
      ) {
        isValid = false
      } else {
        isValid = true
      }
    }

    if (isValid) {
      const isLoading = document.querySelector('.loading')
      isLoading.classList.add('active')
      const formValues = Array.from(inputs).reduce((values, input) => {
        values[input.name] = input.value
        return values
      }, {})

      setTimeout(() => {
        addUsers(formValues)
      }, 1000)
    } else {
      throw 'error API'
    }
  })
}

validateRegister('form')
