import { localUsers, saveLocal } from "./storage.js"

const people = document.getElementById('peopleList')
const form = document.getElementById('fish')

form.addEventListener('submit', event => {
    event.preventDefault()

    const name = document.getElementById('name').value
    const surname = document.getElementById('surname').value
    const email = document.getElementById('email').value

    const newPerson = { name, surname, email }

    // salva no array
    localUsers.push(newPerson)
    saveLocal()

    // mostra na tela
    const li = document.createElement("li")
    li.textContent = `${newPerson.name} ${newPerson.surname} ${newPerson.email}`
    people.appendChild(li)

    form.reset()
})

// renderiza ao carregar
localUsers.forEach(person => {
    const li = document.createElement("li")
    li.textContent = `${person.name} ${person.surname} ${person.email}`
    people.appendChild(li)
})
