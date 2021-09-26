//URL API
const url = 'https://tony-json-server.herokuapp.com/api/todos'

function loadTracker() {
  getTrackers((trackers) => {
    const allTrackers = trackers.data
    renderTracker(allTrackers)
  })
}

loadTracker()

// GET API TRACKER

function getTrackers(callback) {
  fetch(url)
    .then((res) => res.json())
    .then(callback)
}

// Render tracker

function renderTracker(trackers) {
  const listTracker = document.getElementById('wrapper-list')
  const htmls = trackers.map((tracker) => {
    return `
      <div class="list-tracker">
        <div class="list-tracker-header">
          <h3 class="tracker-code" id="tracker-id">${tracker.id}</h3>
          <span class="tracker-tag new-tag" id="tracker-status"
            >${tracker.status}</span
          >
        </div>
        <div class="tracker-info">
          <div class="description-info">
            <p class="description" id="description">${tracker.description}</p>
            <span class="tracker-tag ${tracker.severity}" id="tag">${tracker.severity}</span>
          </div>
          <div id="option-button" class="option-button">
            <button id="close" class="btn clo-btn">Close</button>
            <button id="delete" class="btn del-btn" onclick ="deleteTracker('${tracker.id}')">Delete</button>
          </div>
        </div>
      </div>
    `
  })
  listTracker.innerHTML = htmls.join('')
}

// Add Tracker
const description = document.getElementById('description')
const severity = document.getElementById('severity').value
const formSubmit = document.getElementById('form')
const errorMess = document.getElementById('error-mess')

function showMessageError(message) {
  description.classList.add('error')
  errorMess.classList.add('active')
  errorMess.innerText = message
  setTimeout((e) => {
    description.classList.remove('error')
    errorMess.classList.remove('active')
  }, 3000)
}

function handleTrackerSubmit(e) {
  e.preventDefault()
  if (description.value === '') {
    showMessageError('Please Enter Your Description')
  } else if (description.value.length < 6) {
    showMessageError('Characters should more than 5')
  } else {
    addTracker()
  }
}

function addTracker() {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: description.value,
      id: Date.now(),
      severity,
      status: 'New',
    }),
  })
    .then((response) => response.json())
    .then(loadTracker)
    .catch((error) => {
      console.log('Error', error)
    })

  description.value = ''
}

formSubmit.addEventListener('submit', handleTrackerSubmit)

// DELETE TRACKER

function deleteTracker(id) {
  // console.log('delete: ' , id)
  fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(loadTracker)
}

// SEARCH TRACKERS
const searchBar = document.getElementById('search-tracker')

const searchValue = []

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value
  const filteredTrackers = getTrackers((trackers) => {
    trackers.data.filter((tracker) => {
      if (tracker.description.includes(searchString)) {
        return searchValue.push(tracker)
      }
    })
  })
  return renderTracker(filteredTrackers)
})
