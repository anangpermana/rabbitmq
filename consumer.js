const amqp = require('amqplib')

amqp.connect('amqps://sacsavcg:hfav5Krnkxu9_1JMyWPdIni2o1uxn0Hx@mustang.rmq.cloudamqp.com/sacsavcg').then(conn => {
	return conn.createChannel().then(ch => {
		const ok = ch.assertQueue('hello', {durable: false})
		ok.then(() => {
			return ch.consume('hello', msg => console.log('- Received', msg.content.toString()), {noAck: true})
		}).then(() => {
			console.log('* Waiting for message. Ctrl+C to exit')
		})
	})
}).catch(err => console.log(err))
