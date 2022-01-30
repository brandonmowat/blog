const isSubscribed = () => {
    if (typeof localStorage !== "undefined") {
        return !!localStorage.getItem("subscriberEmail")
    }
    return false;
}

export {isSubscribed}