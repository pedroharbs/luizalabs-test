'use strict'
import dataCore from './data_core'
import gameCore from './game_core'
import constants from '../config/constants'

class Kill {
  /** Responsible for making calls to methods that will parse log kills
   * @param {string} lineValue Value contained in the log file line
   * @return {void}
   */
  handle(lineValue) {
    this.createKills(lineValue, constants.game.regex_kill)
  }

  /** Create a kill in array of players and count totalKills
   * @param {string} lineValue The line value to parse
   * @param {regExp} regex regex retrieve player id
   * @return {void}
   */
  createKills(lineValue, regex) {
    try {
      const playerKill = lineValue.match(regex)[1]
      const playerKilled = lineValue.match(regex)[2]
      const mod = lineValue.match(regex)[3]
      const game = gameCore.getCurrentGame()

      if (playerKill != constants.game.world_id) {
        let player = dataCore.players.find(
          h => h.game === game && h.playerId === playerKill
        )
        if (player) {
          player.kills++
        }
        this.addTotalKills()
      } else {
        this.addTotalKills()
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  /** Add 1 to totalKills counter
   * @param {void}
   * @return {void}
   */
  addTotalKills() {
    try {
      return dataCore.totalKills++
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new Kill()