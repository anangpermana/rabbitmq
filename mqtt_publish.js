const mqtt = require('mqtt')

const host = 'stingray.rmq.cloudamqp.com'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'qufajbbc:qufajbbc',
  password: 'lnOB6BblSDZUiuKM5ZZ9FsNtLKlqEQoR',
  reconnectPeriod: 1000,
})

const topic = '/anang/echarging'
client.on('connect', () => {
  console.log('Connected')

  setInterval(() => {
    client.publish(topic, 'on', { qos: 0, retain: false }, (error) => {
      console.log('publish')
      if (error) {
        console.error(error)
      }
    })
  }, 2000)

})
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})
