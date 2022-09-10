import { Client, Permissions } from 'discord.js'
import fetch from 'node-fetch'
import { sleep } from './sleep'

export async function getUserGuildOrThrowIfNoPerms (GalaxyInfo: GalaxyInfo, discordUserId: string, token: string, guildid: string): Promise<any> {
  const userGuilds = await (await fetch(`https://discord.com/api/v9/users/@me/guilds?after=${BigInt(guildid) - 1n}&limit=1`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })).json()
  if (userGuilds.retry_after) {
    await sleep(userGuilds.retry_after * 1000)
    return await getUserGuildOrThrowIfNoPerms(GalaxyInfo, discordUserId, token, guildid)
  }
  if (userGuilds.message) throw new Error(JSON.stringify(userGuilds))

  const userGuild = userGuilds.find((guild: any) => guild.id === guildid)
  if (!userGuild) throw new Error("didn't find guild")

  if (
    !GalaxyInfo.devs.includes(discordUserId)
    && !new Permissions(userGuild.permissions)
      .has(['ADMINISTRATOR', 'MANAGE_GUILD'])
  ) throw new Error('not correct perms')

  return userGuild
}

export async function getBotGuild (user: string, token: string, guildid: string, client: Client) {
  const userGuild = await getUserGuildOrThrowIfNoPerms(client.GalaxyInfo, user, token, guildid)
  const botGuild = await client.guilds.fetch(userGuild.id)
  if (!botGuild) throw new Error('bot not in guild')

  return botGuild
}
