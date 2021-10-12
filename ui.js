class UI {
    constructor() {
        this.profileDiv = document.getElementById("profile")
        this.repoDiv = document.getElementById("repos")
        this.lastUsers = document.getElementById("last-users")
        this.inputField = document.getElementById("githubname")
        this.cardBody = document.querySelector(".card-body")
        this.tableBody = document.querySelector("#table-body")
    }

    clearInput() {
        this.inputField.value = ""
    }

    showUserInfo(user) {
        this.profileDiv.innerHTML = `
                <div class="card card-body mb-3">
                    <div class="row">
                      <div class="col-md-4">
                        <a href="${user.html_url}" target = "_blank">
                         <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
                         <hr>
                         <div id="fullName" class="user-info"><strong>${user.name}</strong></div>
                         <hr>
                         <div id="bio" class="user-info">${user.bio}</div>
                        </div>
                      <div class="col-md-8">
                            <button class="btn btn-secondary">
                                  Takipçi <span class="badge badge-light">${user.followers}</span>
                            </button>
                            <button class="btn btn-info">
                                 Takip Edilen <span class="badge badge-light">${user.following}</span>
                              </button>
                            <button class="btn btn-danger">
                                Repolar  <span class="badge badge-light">${user.public_repos}</span>
                            </button>
                            <hr>
                            <li class="list-group">
                                <li class="list-group-item borderzero">
                                    <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/mail.png" width="30px"> <span id="email">${user.email}</span>
                                    
                                </li>
                                
                            </div>
                               
                            
                      </div>
                </div>
        
        
        
        
        
        `

    }

    showError(message, type) {
        const div = document.createElement("div")
        div.className = `alert alert-${type}`
        div.textContent = message
        this.cardBody.appendChild(div)

        setTimeout(() => {
            div.remove()
        }, 2000);

    }

    showRepoInfo(userRepos) {

        this.repoDiv.innerHTML = ""

        userRepos.forEach(repo => {
            this.repoDiv.innerHTML += `
            <div class="mb-2 card-body">
            <div class="row">
                <div class="col-md-2">
                <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-secondary">
                        Starlar  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                    </button>

                    <button class="btn btn-info">
                        Forklar  <span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
                    </button>
            
                </div>
            </div>

            </div>
        
            `
        });

    }

    addSearchedUserToUI(username) {
        let users = Storage.getSearchedUsersFromStorage()



        if (users.indexOf(username) === -1) {
            // <tr>
            //                 <th scope="row">1</th>
            //                 <div class="d-flex justify-content-between">
            //                     <td>${user}</td>
            //                     <td><i class="m-bottom-2px fas fa-trash-alt" id="deleteIcon"></i></td>

            //                 </div>
            // </tr> 

            let users = Storage.getSearchedUsersFromStorage()
            let order = Number(users.length) + 1

            const tr = document.createElement("tr")

            const th = document.createElement("th")
            th.textContent = `${order}`
            th.className = "scope=row"
            tr.appendChild(th)

            const div = document.createElement("div")
            div.className = "d-flex justify-content-between"
            const td1 = document.createElement("td")
            td1.textContent = `${username}`
            td1.className = "user"
            div.appendChild(td1)
            const td2 = document.createElement("td")
            td2.innerHTML = `<i class="m-bottom-2px fas fa-trash-alt" id="deleteIcon"></i>`
            div.appendChild(td2)
            tr.appendChild(div)

            this.tableBody.appendChild(tr)


        }
        else {
            this.reAddLastSearchedToUI()
        }
    }

    clearAllSearchedFromUI() {
        while (this.lastUsers.firstElementChild !== null) {
            this.lastUsers.removeChild(this.lastUsers.firstElementChild)
        }
    }

    deleteUserFromUI(e) {
        if (e.target.id === "deleteIcon") {
            e.target.parentElement.parentElement.parentElement.remove()
        }
    }


    reAddLastSearchedToUI() {
        let users;

        users = Storage.getSearchedUsersFromStorage()

        tableBody.innerHTML = ""

        users.forEach(user => {

            const tr = document.createElement("tr")

            const th = document.createElement("th")
            th.textContent = users.indexOf(user) + 1
            th.className = "scope=row"
            tr.appendChild(th)

            const div = document.createElement("div")
            div.className = "d-flex justify-content-between"
            const td1 = document.createElement("td")
            td1.textContent = `${user}`
            td1.className = "user"
            div.appendChild(td1)
            const td2 = document.createElement("td")
            td2.innerHTML = `<i class="m-bottom-2px fas fa-trash-alt" id="deleteIcon"></i>`
            div.appendChild(td2)
            tr.appendChild(div)

            tableBody.appendChild(tr)

        });
    }


}