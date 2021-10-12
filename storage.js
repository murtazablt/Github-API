class Storage {

    static getSearchedUsersFromStorage() {
        //Get All Users
        let users;

        if (localStorage.getItem("searched") === null) {
            users = []
        }
        else {
            users = JSON.parse(localStorage.getItem("searched"))
        }
        return users
    }
    static addSearchedUserToStorage(username) {
        
        let users = this.getSearchedUsersFromStorage()

      
        if (users.indexOf(username) === -1 || username === "") {
            users.push(username)
        }
        localStorage.setItem("searched", JSON.stringify(users))


    }

    static clearAllSearchedUsersFromStorage() {
        
        localStorage.removeItem("searched")
    }


    static deleteUserFromStorage(e) {
        let users = this.getSearchedUsersFromStorage()

        users.forEach((user, index) => {
            if (e.target.parentElement.previousElementSibling.textContent === user) {

                users.splice(index, 1)

            }

        });
        localStorage.setItem("searched", JSON.stringify(users))
    }
}