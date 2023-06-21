const API = `http://localhost:8000/api/`

export const Method = (methodType, send) => {
    if (methodType === "DELETE") {
        return {
            method: methodType,
            headers: {
                "Authorization": `Token ${localStorage.getItem("tzadik_token")}`
            },
        }
    } else {
        return {
            method: methodType,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("tzadik_token")}`
            },
            body: JSON.stringify(send)
        }
    }
}

export const AuthMethod = (methodType, send) => {
    if (methodType === "DELETE") {
        return { method: methodType }
    } else {
        return {
            method: methodType,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(send)
        }
    }
}

export const Fetch = (folder, filtering, method = {}) => {
    return fetch(`${API}${folder}${filtering}`, method)
        .then(res => res.json())
}

export const FetchDelete = (folder, filtering, method ={}) => {
    return fetch(`${API}${folder}${filtering}`, method)
}