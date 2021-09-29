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
            <button id="close" class="btn clo-btn" onclick="updateTracker('${tracker.id}')">Close</button>
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
const severity = document.getElementById('severity')
const formSubmit = document.getElementById('form')
const errorMess = document.getElementById('error-mess')

function handleChangeValue() {
  return severity.value
}
severity.addEventListener('change', handleChangeValue)

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
      // id: Date.now(),
      severity: handleChangeValue(),
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

// Update Tracker
function updateTracker(id) {
  fetch(`${url}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      data.data.status.toLowerCase() === 'new' ||
      data.data.status.toLowerCase() === 'close'
        ? fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Open' }),
          }).then(loadTracker)
        : fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Close' }),
          }).then(loadTracker)
    })
}

// SEARCH TRACKERS

const searchBar = document.getElementById('search-tracker')

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase()

  getTrackers((trackers) => {
    const dataTrackers = trackers.data
    const filterTrackers = dataTrackers.filter((tracker) => {
      return tracker.description.toLowerCase().includes(searchString)
    })
    renderTracker(filterTrackers)
  })
})

// Filter Trackers

const allFilter = document.getElementById('all')
const openFilter = document.getElementById('open')
const closeFilter = document.getElementById('close')

function filterString(trackers, string) {
  const dataTrackers = trackers.data
  const check = dataTrackers.filter((tracker) => {
    return tracker.status === string
  })
  return renderTracker(check)
}

allFilter.addEventListener('click', (e) => {
  loadTracker()
})

openFilter.addEventListener('click', (e) => {
  getTrackers((trackers) => {
    filterString(trackers, 'Open')
  })
})

closeFilter.addEventListener('click', (e) => {
  getTrackers((trackers) => {
    filterString(trackers, 'Close')
  })
})

// ORDER BY

const orderBy = document.getElementById('order-by')

//Order ASC
function orderByAsc(trackers) {
  const allTrackers = trackers.data
  return allTrackers.sort((a, b) => {
    if (a.description < b.description) {
      return -1
    }
  })
}

//Order DESC
function orderByDesc(trackers) {
  const allTrackers = trackers.data
  return allTrackers.sort((a, b) => {
    if (a.description > b.description) {
      return -1
    }
  })
}

function defaultOrderAsc() {
  orderBy.value === 'asc'
  getTrackers((trackers) => {
    renderTracker(orderByAsc(trackers))
  })
}

defaultOrderAsc()

orderBy.addEventListener('change', () => {
  if (orderBy.value === 'asc') {
    getTrackers((trackers) => {
      renderTracker(orderByAsc(trackers))
    })
  }
  if (orderBy.value === 'desc') {
    getTrackers((trackers) => {
      renderTracker(orderByDesc(trackers))
    })
  }
})
