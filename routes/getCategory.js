// TODO: add AJV when have time.
// use uClassify Api to get the category of a provided text
module.exports = (text) => {
  require('dotenv').config();
  const fetch = require('node-fetch');

  const data = { texts: [text] };
  const key = process.env.API_READ;

 return fetch('https://api.uclassify.com/v1/jessiep/todolist/classify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${key}`
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    // data:[
    //       {
    //        textCoverage: 0,
    //        classification: [
    //          { className: 'to eat', p: 0.0000346946 },
    //          { className: 'to read', p: 0.0000361779 },
    //          { className: 'to shop', p: 0.999896 },
    //          { className: 'to watch', p: 0.0000329382 } ]
    //         }
    //       ]
      console.dir(data[0])
    const results = data[0].classification;
    let cateName;
    for(let result of results) {
      if(result.p === 0.25){
        cateName = "to eat";
      }
      else if (result.p > 0.25){
       cateName = result.className;
      }
    }

    return cateName;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};
