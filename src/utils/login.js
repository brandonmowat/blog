const isLoggedIn = () => {
    if (typeof localStorage !== "undefined") {
        return !!localStorage.getItem("token")
    }
    return false;
}

const logout = () => new Promise((resolve, reject) => {
    if (typeof localStorage !== "undefined") {
        resolve(!!localStorage.removeItem("token"))
    }
    reject(false);
})

export {isLoggedIn, logout}