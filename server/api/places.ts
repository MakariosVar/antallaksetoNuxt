import axios from "axios"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        const response = await axios.get(`${config.apiUrl}/vue/places`)
        const places = response.data

        return {
            places: places
        };
    } catch (error) {
        console.error(error)
    }
})
