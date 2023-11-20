const axios = require('axios');
const { token } = require('./config.json');
const getGuilds = require('./src/getGuilds')
const muteServer = require('./src/muteServer')
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
