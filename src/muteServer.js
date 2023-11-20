const axios = require('axios')

module.exports = async function muteServer(serverId) {
    try {
        const response = await axios.patch(
            `https://discord.com/api/v9/users/@me/guilds/${serverId}/settings`,
            { 'muted': true },
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log(response.data.guild_id, 'has been muted');
    } catch (error) {
        console.error('Error muting server:', error.message);
    }
}