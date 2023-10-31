import axios from 'axios';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { token } = getQuery(event);

  try {
    
    const response = await axios.get(`${config.apiUrl}/vue/unreadmessages/${token}`);
    const totalUnreadMessages = response.data.totalUnreadMessages;

    return {
      totalUnreadMessages: totalUnreadMessages,
    };
  } catch (error) {
    console.error(error);
  }
});
