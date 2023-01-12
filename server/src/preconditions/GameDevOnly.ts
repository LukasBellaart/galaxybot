import type { CommandInteraction } from 'discord.js'
import type GalaxyStaffIngest from 'ingest/services/GalaxyStaff'

export class GameDevOnly {
  public static async run (interaction: CommandInteraction) {
    const galaxyStaffIngest = interaction.client.GalaxyInfo.ingest.services.get('GalaxyStaffIngest') as GalaxyStaffIngest
    if (!galaxyStaffIngest) throw new Error('GalaxyStaffIngest missing')
    
    if (!galaxyStaffIngest.developers.members.includes(interaction.user.id)) throw new Error('Only developers of Galaxy can use this command.')
  }
}