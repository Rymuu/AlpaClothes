const apiUrl = "http://localhost:8000"
export default {
    getUsers(jwt) {
        return fetch(`${apiUrl}/admin/user/all`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
            .then((res) => res.json())
    },
}