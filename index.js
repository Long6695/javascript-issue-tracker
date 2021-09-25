//URL API
const url = 'https://tony-json-server.herokuapp.com/api/todos'

function loadTracker() {
  getTrackers((trackers) => {
    renderTracker(trackers)
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
  const allTrackers = trackers.data
  const listTracker = document.getElementById('wrapper-list')
  const htmls = allTrackers.map((tracker) => {
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


function handleTrackerSubmit(e) {
  e.preventDefault()
  addTracker()
}

function addTracker() {
  const description = document.getElementById('description');
  const severity = document.getElementById('severity').value;

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

const formSubmit = document.getElementById('form')

formSubmit.addEventListener('submit', handleTrackerSubmit)

// DELETE TRACKER

function deleteTracker(id) {
  // console.log('delete: ' , id)
  fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(loadTracker)
}
