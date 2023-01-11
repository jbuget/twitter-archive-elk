const Fs = require('fs');

if (process.argv.length === 2) {
  console.error('Expected the object type ("tweets", "direct-messages") to be analyzed!');
  process.exit(1);
}

const type = process.argv[2];

if (type === 'tweets') {
  const filePath = './data/input/tweets.js';

  if (!Fs.existsSync(filePath)) {
    console.error(`File "${filePath}" not found`);
    process.exit(1);
  }

  Fs.readFile(filePath, {}, (err, data) => {
      if (err) {
        console.error(`An error occurred during reading`);
        process.exit(1);
      }

      const text = data.toString();

      const code = text.slice(26, text.length);
      const json = JSON.parse(code);
      console.log(json.length);
      console.log(json[0]);

      const outputFile = './data/output/tweets.ndjson';

      if (Fs.existsSync(filePath)) {
        if (err) {
          console.error(`An error occurred during writing (output file existing)`);
          process.exit(1);
        }

        if (Fs.existsSync(outputFile)) {
          Fs.rmSync(outputFile);
        }

        json.forEach((item) => {
          const tweet = item['tweet'];
          tweet.is_retweet = (!!tweet.full_text && tweet.full_text.startsWith('RT @'));
          tweet.is_reply = (!!tweet.in_reply_to_status_id && tweet.in_reply_to_status_id.trim().length > 0);
          Fs.appendFileSync(outputFile, JSON.stringify(tweet) + '\n');
        })

        console.log('succeeded!')
        process.exit(0);
      }
    }
  )

} else {
  if (type === 'direct-messages') {

    const filePath = './data/input/direct-messages.js';

    if (!Fs.existsSync(filePath)) {
      console.error(`File "${filePath}" not found`);
      process.exit(1);
    }

    Fs.readFile(filePath, {}, (err, data) => {
        if (err) {
          console.error(`An error occurred during reading`);
          process.exit(1);
        }

        const text = data.toString();

        const code = text.slice(35, text.length);
        const json = JSON.parse(code);
        console.log(json.length);
        console.log(json[0]);

        const outputFile = './data/output/direct-messages.ndjson';

        if (Fs.existsSync(filePath)) {
          if (err) {
            console.error(`An error occurred during writing (output file existing)`);
            process.exit(1);
          }

          if (Fs.existsSync(outputFile)) {
            Fs.rmSync(outputFile);
          }

          json.forEach((item) => {
            const conversation = item['dmConversation'];
            Fs.appendFileSync(outputFile, JSON.stringify(conversation) + '\n');
          })

          console.log('succeeded!')
          process.exit(0);
        }
      }
    )


  } else {
    console.error('Twitter object type not found. Available types are: "tweets" and "direct-messages".');
    process.exit(1);
  }
}

