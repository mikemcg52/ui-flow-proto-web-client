import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr'

export default {
  install: (app, options) => {
    const connection = new HubConnectionBuilder()
      // .withUrl(`${this.$axios.defaults.baseURL}/question-hub`, {
      .withUrl('https://localhost:7216/question-hub', {
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

    start()
  }
}
