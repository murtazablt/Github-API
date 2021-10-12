//Elements Selecting

const githubForm = document.getElementById("github-form")
const nameInput = document.getElementById("githubname")
const clearLastUsers = document.getElementById("clear-last-users")
const userContainer = document.getElementById("users-container")
const tableBody = document.getElementById("table-body")
const github = new Github()
const ui = new UI()


eventListeners()

function eventListeners() {
    githubForm.addEventListener("submit", getData)
    clearLastUsers.addEventListener("click", clearAllSearched)
    document.addEventListener("DOMContentLoaded", getAllSearched)
    userContainer.addEventListener("click", deleteSearchedUser)
    userContainer.addEventListener("click", getClickedUserData)

}



function getData(e) {
    let username = nameInput.value.trim()
    if (username === "") {
        alert("Please enter a valid username!")
    }
    else {
        github.getGithubData(username)
            .then(result => {
                if (result.user.message === "Not Found") {
                    ui.showError("Please enter a valid username!", "danger")
                }
                else {
                    //Request is Successfull
                    ui.addSearchedUserToUI(username)
                    Storage.addSearchedUserToStorage(username)
                    ui.showUserInfo(result.user)
                    ui.showRepoInfo(result.repo)
                }
            }).catch(err => ui.showError(err, "danger"))
    }

    ui.clearInput() 
    e.preventDefault()
}

function clearAllSearched() {

    if (confirm("Are you sure?")) {

        Storage.clearAllSearchedUsersFromStorage() 
        ui.clearAllSearchedFromUI()
    }

}

function getAllSearched() {
    ui.reAddLastSearchedToUI()

}

function deleteSearchedUser(e) {

    ui.deleteUserFromUI(e)
    Storage.deleteUserFromStorage(e)

}


function getClickedUserData(e) {
    let userClassName = e.target.className
    if (userClassName === "user") {
        let username = e.target.textContent

        github.getGithubData(username)
            .then(result => {

                ui.showUserInfo(result.user)
                ui.showRepoInfo(result.repo)

            }).catch(err => ui.showError(err, "danger"))
    }
}