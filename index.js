// ECHO est� activado.
// by git (root-mega) for honey :3

const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
	// See other options here
	// https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
	// All partials are loaded automatically
});
const { token, caiToken } = require('./config.json')
const CharacterAI = require("node_characterai");
const cai = new CharacterAI();

// i set previously a token of an account for you :3

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.on("messageCreate", message => {
    const args = message.content;
    const command = args

    if (command.includes("keqing")) {
        console.log('Keqing word message detected! Running AI...');
        (async () => {
            // Authenticating as a guest (use `.authenticateWithToken()` to use an account)
            await cai.authenticateWithToken(caiToken)
          
            // Place your character's id here
            const characterId = "yMYt_d44Jp5xrSRnYaaBa0RvLIo2ImlhrD2KZ4g4krg";
          
            const chat = await cai.createOrContinueChat(characterId);
            
            // Send a message
            const response = await chat.sendAndAwaitResponse(command, true);
          
            console.log(response.text);

            message.reply(response.text)
            // Use `response.text` to use it as a string
          })();
    }
});

client.login(token);