# Installation and Setup Guide

This guide will walk you through the process of setting up and running the Discord Mute All application.

## Prerequisites

Before you begin, ensure you have met the following requirements:

   - [Node.js](https://nodejs.org/)
   - [Git](https://git-scm.com/)
## Installation

1. Clone the repository by running the following command in your terminal:

   ```
   git clone https://github.com/Random-user-doing-random-stuff/discord-mute-all
   ```

   Alternatively, you can download the code as a ZIP archive and extract it to your preferred directory.

2. Navigate to the project directory:

   ```
   cd discord-mute-all
   ```

3. Install the required Node.js packages by running:

   ```
   npm install
   ```

   This command will download and install all the necessary dependencies listed in the `package.json` file.

## Configuration

1. Open the `config.json` file located in the project's root directory.

2. Insert your Discord token inside the double quotes:

   ```json
   {
       "token": "YOUR_TOKEN_HERE"
   }
   ```

   Replace "YOUR_TOKEN_HERE" with your actual Discord token.

## Running the Application

Now that you've completed the installation and configuration steps, you can run the Discord Mute All application. To start the application, run the following command in your terminal:

```
node .
```

The application should now mute all servers you are in.

## How to Get Your Discord Token

To obtain your Discord token, follow these steps:

1. **Open Discord in Your Web Browser:** Launch Discord in your preferred web browser.

2. **Access Developer Tools:** Press `F12` or right-click anywhere on the Discord page and select "Inspect" to open the Developer Tools.

3. **Navigate to the Console:** In the Developer Tools, go to the "Console" tab.

4. **Run the Command:** Copy and paste the following command into the console window:

   ```javascript
   (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()
   ```

5. **Execute the Command:** Press `Enter` to execute the command.

6. **Retrieve Your Token:** Your Discord token will be displayed in the console as a long string of characters. **Note:** Keep your token confidential and never share it with anyone.

That's it! You have successfully obtained your Discord token, which you can use for authentication in your Discord bot or applications.