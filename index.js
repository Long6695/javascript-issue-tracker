const select = document.getElementById('select')
const getValueSelect = () => {
  return select.options[select.selectedIndex].value
}

select.addEventListener('change', getValueSelect)

// GET API

const url = 'https://tony-json-server.herokuapp.com/api/todos'

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const users = data.data
    users.forEach((user) => getUser(user))
  })

function getUser(user) {
  const listTracker = document.getElementById('wrapper-list')
  listTracker.innerHTML += `
        <div class="list-tracker">
          <div class="list-tracker-header">
            <h3 class="tracker-code" id="tracker-id">${user.id}</h3>
            <span class="tracker-tag new-tag" id="tracker-status"
              >${user.status}</span
            >
          </div>
          <div class="tracker-info">
            <div class="description-info">
              <p class="description" id="description">${user.description}</p>
              <span class="tracker-tag tag" id="tag">${user.severity}</span>
            </div>
            <div id="option-button" class="option-button">
              <button id="close" class="btn clo-btn">Close</button>
              <button id="delete" class="btn del-btn" onclick ="handleDeleteTracker()">Delete</button>
            </div>
          </div>
        </div>
  `
}

// ADD TRACKER List
const formSubmit = document.getElementById('form')

function handleTrackerSubmit(e) {
  const des = document.getElementById('description').value
  e.preventDefault()
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: des,
      id: Math.random(),
      severity: getValueSelect(),
      status: 'New',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success', data)
    })
    .catch((error) => {
      console.log('Error', error)
    })
}

formSubmit.addEventListener('submit', handleTrackerSubmit)

// DELETE TRACKER
const getIdUser = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const users = data.data
      users.forEach((user) => user.id)
    })
}
console.log(getIdUser)

function handleDeleteTracker() {
  fetch(url / { getIdUser }, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
}
