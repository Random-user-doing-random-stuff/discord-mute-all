const axios = require('axios');
const { token } = require('./config.json');

// Function to fetch the guilds (servers) you're in
async function getGuilds() {
  try {
    const response = await axios.get('https://discord.com/api/v9/users/@me/guilds', {
      headers: {
        'Authorization': {token},
        'Content-Type': 'application/json',
      },
    });

    return response.data.map(guild => guild.id);
  } catch (error) {
    console.error('Error fetching guilds:', error.message);
    return [];
  }
}

// Function to mute a specific server
async function muteServer(serverId) {
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

// Function to mute all servers
async function muteAllServers() {
  const servers = await getGuilds();

  if (!Array.isArray(servers)) {
    console.error('Error: Servers is not an array.');
    return;
  }

  const delayBetweenRequests = 1000; // Adjust as needed (in ms), lower values may increase rate limit risk

  // Use concurrency control to limit the number of parallel requests
  const concurrency = 5; // Adjust the concurrency level as needed
  const serverChunks = [];

  for (let i = 0; i < servers.length; i += concurrency) {
    serverChunks.push(servers.slice(i, i + concurrency));
  }

  for (const chunk of serverChunks) {
    await Promise.all(chunk.map(server => muteServer(server)));
    // Adding a delay between chunks to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
  }
}

muteAllServers();
