class Api {
    getFetch = async (endpoint) => {
        const response = await fetch(endpoint)
        return await response.json()
    }
}

export default new Api();