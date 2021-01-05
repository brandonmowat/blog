const isLoggedIn = () => {
    return localStorage.getItem("token")
}

const logout = () => {
    localStorage.removeItem("token")
}

export {isLoggedIn, logout}