import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr'
import PubSub from 'pubsub.js'

export default {
  install (app, options) {
    const connection = new HubConnectionBuilder()
      // .withUrl(`${this.$axios.defaults.baseURL}/question-hub`, {
      .withUrl('https://localhost:7216/alert-hub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Information)
      .build()

    let startedPromise = null
    function start () {
      startedPromise = connection.start().catch(err => {
        console.error('Failed to connect with hub', err)
        return new Promise((resolve, reject) =>
          setTimeout(() => start().then(resolve).catch(reject), 5000))
      })
      return startedPromise
    }
    connection.onclose(() => start())

    connection.on('AlertCreated', (alert) => {
      // console.log(alert.alertId)
      PubSub.publish('alert-added', [
        JSON.stringify({
          ...alert,
          modified_flag: true
        })
      ])
    })
    start()
  }
}
