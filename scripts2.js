const people = document.getElementById('peopleList')
const form = document.getElementById('fish')

const API_URL = "https://crudcrud.com/api/4f03b845bae34f9e83cf73a916406d5f/people"

// array local
let localUsers = JSON.parse(localStorage.getItem("users")) || []

function saveLocal() {
  localStorage.setItem("users", JSON.stringify(localUsers))
}


function criarLi(person) {
  const personItem = document.createElement('li')
  personItem.textContent = `${person.name} ${person.surname} ${person.email} `

  const deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'x'

  deleteBtn.addEventListener('click', () => {
    localUsers = localUsers.filter(u => u.email !== person.email)
    saveLocal()
    people.removeChild(personItem)

    if (person._id) {
      fetch(`${API_URL}/${person._id}`, { method: 'DELETE' })
        .catch(err => console.error(err))
    }
  })

  personItem.appendChild(deleteBtn)
  return personItem
}

// pega da API
fetch(API_URL)
  .then(response => response.json())
  .then(peopleList => {
    const items = peopleList.map(person => criarLi(person))
    items.forEach(item => people.appendChild(item))

    const found = peopleList.find(p => p._id) // só exemplo de uso
    console.log("found:", found)
  })
  .catch(err => console.error(err))

// carrega do localStorage
localUsers.forEach(person => {
  const personItem = criarLi(person)
  people.appendChild(personItem)
})

form.addEventListener('submit', event => {
  event.preventDefault()

  const name = document.getElementById('name').value
  const surname = document.getElementById('surname').value
  const email = document.getElementById('email').value

  const newPerson = { name, surname, email }

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPerson)
  })
    .then(response => response.json())
    .then(savedPerson => {
      localUsers.push(savedPerson)
      saveLocal()
    })
    .catch(err => console.error(err))

  form.reset()
})
