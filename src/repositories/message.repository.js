const aws = require("aws-sdk");

const sqs = new aws.SQS({
  apiVersion: "2012-11-05",
  endpoint: "http://localstack:4576",
  region: "us-west-2",
});

class MessageRepository {
  static sendMessage(event_name, user) {
    const params = {
      DelaySeconds: 10,
      MessageAttributes: {},
      MessageBody: JSON.stringify(user),
      QueueUrl: "http://localstack:4576/queue/notifications",
    };

    console.log(`SQS: ${event_name} => ${JSON.stringify(user)}`);

    return new Promise(function (resolve, reject) {
      try {
        sqs.sendMessage(params, function (err, data) {
          if (err) {
            console.log("SQS ERROR", err);
            reject(err);
          } else {
            resolve(data);
          }
        });
      } catch (err) {
        console.log("PROMISE ERROR", err);
      }
    });

    // sqs.sendMessage(params, function (err, data) {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(data);
    //   }
    // });
  }
}

module.exports = MessageRepository;
