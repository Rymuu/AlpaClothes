const apiUrl = "http://localhost:8000"
export default {
    getProducts(){
        return fetch(`${apiUrl}/produit/all`)
        .then((res) => res.json())
    },
    getProduct(id){
        return fetch(`${apiUrl}/produit/${id}`)
        .then((res) => res.json())
    },

}