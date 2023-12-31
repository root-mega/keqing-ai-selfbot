const dotenv = require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();
const client = new Client({
    checkUpdate: false,
});

// Use c.ai plus
characterAI.requester.usePlus = false;
// Keyword
const keyword = "ganyu"; // Ganyu
// Set the character id
const charId = "I3OCwWQKKEj12lt3mpLvHRyrBdXgotqVUHg0MzAGmSk"; // Ganyu

client.on("messageCreate", async (message) => {
    // Pass the message from message.content to the c.ai API
    const messageContent = message.content;

    // Listen for message that contains the magic word "ganyu"
    if (message.content.toLowerCase().includes(keyword)) {
        // console.log(messageContent);

        (async () => {
            // TODO: Add if user reply to message.reply, continue the conversation

            // c.ai part
            const chat = await characterAI.createOrContinueChat(charId);
            const response = await chat.sendAndAwaitResponse(
                messageContent,
                true
            );
            message.reply(response.text);
        })();
    }
});

// Authenticate with the c.ai API
async function authenticate() {
    await characterAI.authenticateWithToken(process.env.caiToken);
}

authenticate()
    .then(() => {
        // Authentication completed
        console.log("c.ai authentication completed");

        // Authenticate with Discord
        client.login(process.env.Token);
    })
    .catch((error) => {
        console.error("c.ai authentication failed:\n", error);
    });

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});
