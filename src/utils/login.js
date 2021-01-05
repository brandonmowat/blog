const isLoggedIn = () => {
    if (typeof localStorage !== "undefined") {
        return localStorage.getItem("token")
    }
}

const logout = () => {
    if (typeof localStorage !== "undefined") {
        localStorage.removeItem("token")
    }
}

export {isLoggedIn, logout}