import { DiscordGatewayAdapterCreator, DiscordGatewayAdapterLibraryMethods } from "@discordjs/voice"
import {
    Channel,
    Client, 
    Status, 
    Events, 
    GatewayDispatchEvents, 
    GatewayVoiceServerUpdateDispatchData, 
    GatewayVoiceStateUpdateDispatchData, 
    Guild, 
    Snowflake, 
    VoiceBasedChannel
} from "discord.js"

export default class MusicAdapter {
    private adapters = new Map<Snowflake, DiscordGatewayAdapterLibraryMethods>();
    private trackedClients = new Set<Client>();
    private trackedShards = new Map<number, Set<Snowflake>>();

    constructor(
        private channel: VoiceBasedChannel,
        private guild: Guild,
    ) {}

    async trackClient(client: Client) {

        if (this.trackedClients.has(client)) return

        this.trackedClients.add(client)

        client.ws.on(GatewayDispatchEvents.VoiceServerUpdate, (payload: GatewayVoiceServerUpdateDispatchData) => {
            this.adapters.get(payload.guild_id)?.onVoiceServerUpdate(payload)
        });

        client.ws.on(GatewayDispatchEvents.VoiceStateUpdate, (payload: GatewayVoiceStateUpdateDispatchData) => {
            if (payload.guild_id && payload.session_id && payload.user_id === client.user?.id) {
                // @ts-expect-error
                adapters.get(payload.guild_id)?.onVoiceStateUpdate(payload)
            }
        });

        client.on(Events.ShardDisconnect, (_, shardId) => {
            const guilds = this.trackedShards.get(shardId)

            if (guilds) {
                for (const guildID of guilds.values()) {
                    this.adapters.get(guildID)?.destroy()
                }
            }
            this.trackedShards.delete(shardId)
        })
    }

    async trackGuild(guild: Guild) {
        let guilds = this.trackedShards.get(guild.shardId)

        if (!guilds) {
            guilds = new Set()
            this.trackedShards.set(guild.shardId, guilds)
        }
        guilds.add(guild.id)
    }

    createDiscordJSAdapter(channel: VoiceBasedChannel): DiscordGatewayAdapterCreator {
        return (methods) => {
            this.adapters.set(channel.guild.id, methods)
            this.trackClient(channel.client)
            this.trackGuild(channel.guild)
            return {
                sendPayload(data) {
                    if (channel.guild.shard.status === Status.Ready) {
                        channel.guild.shard.send(data)
                        return true
                    }
                    return false
                },
                destroy() {
                    return this.destroy()
                },
            };
        };
    }

}