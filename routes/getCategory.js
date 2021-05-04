module.exports = (text) => {
  require('dotenv').config();
  const fetch = require('node-fetch');

  const data = { texts: [text] };
  const key = process.env.API_READ;

 return fetch('https://api.uclassify.com/v1/jessiep/todolist/classify', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${key}`
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {

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
