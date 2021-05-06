async function quickstart() {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = 'harry potter harry potter harry potter harry potter harry potter harry potter harry potter harry potter harry potter harry potter harry potter';

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.classifyText({document: document});
  const sentiment = result.categories;

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment}`);
  console.dir(sentiment)
  // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);


// // Imports the Google Cloud client library
// const language = require('@google-cloud/language');

// // Creates a client
// const client = new language.LanguageServiceClient();

// /**
//  * TODO(developer): Uncomment the following line to run this code.
//  */
// const text = 'Your text to analyze, e.g. Hello, world!';

// // Prepares a document, representing the provided text
// const document = {
//   content: text,
//   type: 'PLAIN_TEXT',
// };

// // Classifies text in the document
// const [classification] = await client.classifyText({document});
// console.log('Categories:');
// classification.categories.forEach(category => {
//   console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
// });
}
quickstart()
.catch(err=>{console.log(err)});


