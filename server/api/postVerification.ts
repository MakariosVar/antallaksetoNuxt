import axios from "axios";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { token } = getQuery(event);
    const { id } = getQuery(event);
    const { action } = getQuery(event);

    try {
        let formData = new FormData();
        formData.append('auth_token', token);
        let url = '';
        if (action == 'verificate') {
            url = `${config.apiUrl}/verificatepost/${id}`;
        } else if (action == 'reEdit') {
            url = `${config.apiUrl}/toreedit/${id}`;
        }
        
        const request = await axios.post(url, formData);
        const response = request.data;

        return {
            response: response,
        };
    } catch (error) {
        console.error(error);
    }
});
