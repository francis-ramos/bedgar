import { Client, Events } from "discord.js";

export default [
    Events.ClientReady,
    'once',
    async function (client: Client) {
        console.log(client.user?.username);
    }
]