const axios = require('axios');

const { token } = require('./config.json')

// Function to fetch the guilds (servers) you're in
async function getGuilds() {
  let guilds = [];
  try {
    const response = await axios({
      method: 'get',
      url: 'https://discord.com/api/v9/users/@me/guilds',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });

    for (let i = 0; i < response.data.length; i++) {
      guilds.push(response.data[i].id);
    }

    return guilds;
  } catch (error) {
    console.error(error.response.data);
    return [];
  }
}

// Function to mute all the guilds (servers)
async function muteAllServers() {
  const servers = await getGuilds();

  if (!Array.isArray(servers)) {
    console.error("Error: Servers is not an array.");
    return;
  }

  const delayBetweenRequests = 1000; // Adjust as needed (in ms), lower values may increase rate limit risk
  for (const server of servers) {
    const response = await axios.patch(
      `https://discord.com/api/v9/users/@me/guilds/${server}/settings`,
      {
        'muted': true
      },
      {
        headers: {
          'authorization': token,
        }
      }
    );

    console.log(response.data.guild_id, " has been muted")

    // Adding a delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
  }
}

muteAllServers();