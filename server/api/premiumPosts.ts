import axios from "axios"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    try {
        const response = await axios.get(`${config.apiUrl}/vue/premiumPosts`)
        const premiumPosts = response.data
        
        return {
            posts: premiumPosts
        };
    } catch (error) {
        console.error(error)
    }
})
