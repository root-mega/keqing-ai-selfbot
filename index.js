const dotenv = require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();
const client = new Client({
    checkUpdate: false,
});

const charId = "yMYt_d44Jp5xrSRnYaaBa0RvLIo2ImlhrD2KZ4g4krg"; // Keqing

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    // Pass the message from message.content to the c.ai API
    const args = message.content;
    const command = args;

    // Listen for message that contains the magic word "keqing"
    if (message.content.toLowerCase().includes("keqing")) {
        console.log(command);

        (async () => {
            // c.ai part
            await characterAI.authenticateWithToken(process.env.caiToken);
            const chat = await characterAI.createOrContinueChat(charId);
            const response = await chat.sendAndAwaitResponse(command, true);
            console.log(response.text);
            message.reply(response.text);
        })();
    }
});

client.login(process.env.Token);
