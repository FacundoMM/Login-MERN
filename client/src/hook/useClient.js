import axios from "axios";

class useClient {
    constructor(){
        this.instance = axios.create({
            baseURL: "http://localhost:8000/api/auth",
            withCredentials: true,
        })
    }

    login(email, password){
        return this.instance.post("/login", {
            email,
            password
        })
    }

    register(values){
        return this.instance.post("/register", values)
    }

    logout(){
        return this.instance.post("/logout")
    }
}

export default useClient;