const people = document.getElementById('peopleList')
const form = document.getElementById('fish')

const API_URL = "https://crudcrud.com/api/531b31877b6145e08df327bb81ab5e48/people";

fetch(API_URL)
    .then(response => response.json())
    .then(peopleList => {
        peopleList.forEach(person => {
            const personItem = document.createElement('li');
            personItem.textContent = `${person.name} ${person.surname} ${person.email} `;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'x';

            deleteBtn.addEventListener('click', () => {
                fetch(`${API_URL}/${person._id}`, { method: 'DELETE' })
                    .then(() => people.removeChild(personItem))
                    .catch(err => console.error(err));
            });

            personItem.appendChild(deleteBtn);
            people.appendChild(personItem);
        });
    });

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email })
    })
        .then(res => res.json())
        .then(data => {
            const personItem = document.createElement('li');
            personItem.textContent = `${data.name} ${data.surname} ${data.email} `;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'x';

            deleteBtn.addEventListener('click', () => {
                fetch(`${API_URL}/${data._id}`, { method: 'DELETE' })
                    .then(() => people.removeChild(personItem))
                    .catch(err => console.error(err));
            });

            personItem.appendChild(deleteBtn);
            people.appendChild(personItem);

            form.reset();
        })
        .catch(err => console.error(err));
});
