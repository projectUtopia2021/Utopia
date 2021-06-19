import axios from "axios"

const pre_fixed_API = "http://localhost:8080"

export const loginService = (username, password) => {
    return axios
        .post(pre_fixed_API + "/authenticate", {
            username,
            password
        }).then(
            response => {
                if (response.data.aceessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    document.cookie = "token=" + response.data;
                }
                return response.data;
            })
}

export const registerServive = (name, email, password) => {
    console.log("calling api")
    return axios.post(pre_fixed_API + "/register", {
        name, 
        email,
        password
    });
}
