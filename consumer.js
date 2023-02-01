const amqp = require('amqplib')

amqp.connect('amqps://qufajbbc:lnOB6BblSDZUiuKM5ZZ9FsNtLKlqEQoR@stingray.rmq.cloudamqp.com/qufajbbc').then(conn => {
	return conn.createChannel().then(ch => {
		const ok = ch.assertQueue('hello', {durable: false})
		ok.then(() => {
			return ch.consume('hello', msg => console.log('- Received', msg.content.toString()), {noAck: true})
		}).then(() => {
			console.log('* Waiting for message. Ctrl+C to exit')
		})
	})
}).catch(err => console.log(err))
