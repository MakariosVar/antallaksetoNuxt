import axios from "axios"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        const response = await axios.get(`${config.apiUrl}/vue/categories`)
        const categories = response.data

        return {
            categories: categories
        };
    } catch (error) {
        console.error(error)
    }
})
