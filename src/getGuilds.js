const axios = require('axios');

module.exports = async function getGuilds() {
    try {
        const response = await axios.get('https://discord.com/api/v9/users/@me/guilds', {
            headers: {
                'Authorization': { token },
                'Content-Type': 'application/json',
            },
        });

        return response.data.map(guild => guild.id);
    } catch (error) {
        console.error('Error fetching guilds:', error.message);
        return [];
    }
}