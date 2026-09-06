import { Schema, model } from "mongoose";

export default model('guild', new Schema({
    guildId: { type: String, required: true },
    administrativeRole: String,
    whitelistRole: Array,
    blacklistRole: Array,
    autoRoles: Array
}));