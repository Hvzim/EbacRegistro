export let localUsers = JSON.parse(localStorage.getItem("users")) || []

export function saveLocal() {
    localStorage.setItem("users", JSON.stringify(localUsers))
}
