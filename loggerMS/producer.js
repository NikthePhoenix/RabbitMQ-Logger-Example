const amqp = require("amqplib");
const config = require("./config");

//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key

class Producer {
  channel;

  async createChannel() {
    const connection = await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, to, subject, body) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = config.rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, "direct");

    const mailDetails = {
      mailType: routingKey,
      to: to,
      subject: subject,
      body: body,
      
    };
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(mailDetails))
    );

    console.log(
      `The new ${routingKey} mail request is sent to exchange ${exchangeName}`
    );
  }
}

module.exports = Producer;
