let secrets   = require('./secrets');
let paypal    = require('paypal-rest-sdk');

let handleResp = function(res, data){
  return res.send(data);
};

let apiController = {
  /**
   * Paypal
   */
  paypal:{
    get(amount, url) {
      let {client_id, client_secret, cancel_url, return_url} = secrets.paypal;
      paypal.configure({mode: 'sandbox', client_id, client_secret});

      var paymentDetails = {
        intent: 'sale',
        payer: {payment_method: 'paypal'},
        redirect_urls: {return_url: url, cancel_url},
        transactions: [{
          description: 'Fare Trader',
          amount: {
            currency: 'AUD',
            total: amount
          }
        }]
      };

      console.log(paymentDetails.redirect_urls);

      return new Promise(function(resolve, reject){
        paypal.payment.create(paymentDetails, function(err, payment) {
          if (err) {
            return reject(err);
          }
          let links = payment.links;
          for (var i = 0; i < links.length; i++) {
            if (links[i].rel === 'approval_url') {
              return resolve({id: payment.id, href: links[i].href});
            }
          }    
        });
      });
    }
  }
};


module.exports = apiController;