const amqp = require('amqplib')

amqp.connect('amqps://qufajbbc:lnOB6BblSDZUiuKM5ZZ9FsNtLKlqEQoR@stingray.rmq.cloudamqp.com/qufajbbc').then(conn => {
return conn.createChannel().then(ch => {
	const q = 'hello'
	const msg = '192.168.1.1'

	const ok = ch.assertQueue(q, {durable:false})
	
	return ok.then(() => {
		ch.sendToQueue(q, Buffer.from(msg))
		console.log('-Send', msg)
		return ch.close()
	})
}).finally(() => conn.close())
}).catch(err => {
	console.log(err)
})
