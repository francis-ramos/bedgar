import client from "./src/client";
import config from "./src/global.json";
import fg from "fast-glob";
import { connect } from "mongoose";

const commands = await fg('./commands/**/*');
for (let path of commands) {
    const module = (await import(path)).default;
    if ('data' in module && 'run' in module) {
        (client as any).commands.set(module.data.name, module);
    }
}

const events = await fg("./events/**/*");
for (let path of events) {
    const module = (await import(path) as any).default;
    const method = module[1] as keyof typeof client;
    (client as any)[method](module[0], (...K: any[]) => (module[2] as any)(...K, config));
}

await connect(config.uri);
client.login(config.token);