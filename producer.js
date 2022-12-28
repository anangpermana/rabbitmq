const amqp = require('amqplib')

amqp.connect('amqps://sacsavcg:hfav5Krnkxu9_1JMyWPdIni2o1uxn0Hx@mustang.rmq.cloudamqp.com/sacsavcg').then(conn => {
return conn.createChannel().then(ch => {
	const q = 'hello'
	const msg = 'Hello dunia lagi 14-10-22'

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
