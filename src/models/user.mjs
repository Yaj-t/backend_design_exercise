class User {
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    getUser() {
        return {
            id: this.id,
            email: this.email
        };
    }

    updateUser({ email, password }) {
        if (email) this.email = email;
        if (password) this.password = password;
    }


}