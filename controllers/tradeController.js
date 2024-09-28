const Trade = require('../models/trade');
const csv = require('csv-parser');
const fs = require('fs');

exports.uploadCSV = (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {
      const [base_coin, quote_coin] = data.Market.split('/');
      const trade = new Trade({
        utc_time: new Date(data.UTC_Time),
        operation: data.Operation,
        base_coin: base_coin,
        quote_coin: quote_coin,
        amount: parseFloat(data['Buy/Sell Amount']),
        price: parseFloat(data.Price),
      });
      results.push(trade);
    })
    .on('end', () => {
      Trade.insertMany(results)
        .then(() => {
          res.status(200).send('CSV data stored successfully');
          fs.unlinkSync(req.file.path); 
        })
        .catch((err) => res.status(500).send('Error storing data: ' + err));
    });
};
