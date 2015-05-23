'use strict';
// https://github.com/amachang/facebook-node-sdk
var Facebook = require('facebook-node-sdk');
var facebook = new Facebook({
  appId: process.env.FB_APP_ID,
  secret: process.env.FB_APP_SECRET
});

// https://graph.facebook.com/oauth/access_token?client_id=373391102861923&client_secret=7f0d8213553ec2664d1180f1e35a62f5&grant_type=fb_exchange_token&fb_exchange_token=CAAFTmOQMYmMBAIuGm96cvMckFocbi3BZAzlEaZBTwoxqFOZCIAPwKe2lcSGCcKGjN09r8JfFUZCE85aEIecTjb1nb9ZBk2OKZAKYCsB23hC1RPWpZC1suInMVZA1eEeNG36A9S6xzAFa7FbYCN3b3lC7uKKsZC8fafkVCNagkPYoscMCQYWnt18ZALQ0xbSOSzyyeqNRfABgWz24Fv9il64ZC1ZCwWel8ZCUag8kZD
// access_token=CAAFTmOQMYmMBAEKMVkfTdcfLV9rkUIsAE5QT8IWisVklUNvhKYp66nEVd1rZCWt7eZBZA73g1C9XEttS7g7nGZCZCRISD86yMm6v6vH9AoJDYHt82ZCIfZBU909mIDOtPZA19BqjKz6wA0I9S7bupZCvEL20DMLXzHZB9WC4PZAeE2AJK4rthB3bNg6KeHZBpqDfOK0zoHLzet1VES3yLc5zHKFu&expires=5184000
// https://graph.facebook.com/oauth/access_token?client_id=373391102861923&client_secret=7f0d8213553ec2664d1180f1e35a62f5&grant_type=client_credentials
// access_token=373391102861923|X8m1_jUCB_qx7Oyov3vKSUDbpc8

function search(urlInfo, callback) {
  var id = 'access_token=X8m1_jUCB_qx7Oyov3vKSUDbpc8';
  if( urlInfo.query.id ) {
    id = urlInfo.query.id
  }
  var parameters = {};
  if( urlInfo.query.fields ) {
    parameters.fields = urlInfo.query.fields
  }
  if( urlInfo.query.q ) {
    parameters.q = urlInfo.query.q
  }
  if( urlInfo.query.type ) {
    parameters.type = urlInfo.query.type
  }

  facebook.api(id, parameters, function(err, data) {
    if(err){
      callback(err);
    }
    callback(data);
  });
}

module.exports = {
    search: search
}

// https://graph.facebook.com/search?access_token=CAAFTmOQMYmMBAEKMVkfTdcfLV9rkUIsAE5QT8IWisVklUNvhKYp66nEVd1rZCWt7eZBZA73g1C9XEttS7g7nGZCZCRISD86yMm6v6vH9AoJDYHt82ZCIfZBU909mIDOtPZA19BqjKz6wA0I9S7bupZCvEL20DMLXzHZB9WC4PZAeE2AJK4rthB3bNg6KeHZBpqDfOK0zoHLzet1VES3yLc5zHKFu&q=ハッカソン&type=event&fields=id,owner,name,start_time,end_time,location,picture,timezone,venue,description,updated_time&limit=10
// https://graph.facebook.com/search?access_token=CAAFTmOQMYmMBAEKMVkfTdcfLV9rkUIsAE5QT8IWisVklUNvhKYp66nEVd1rZCWt7eZBZA73g1C9XEttS7g7nGZCZCRISD86yMm6v6vH9AoJDYHt82ZCIfZBU909mIDOtPZA19BqjKz6wA0I9S7bupZCvEL20DMLXzHZB9WC4PZAeE2AJK4rthB3bNg6KeHZBpqDfOK0zoHLzet1VES3yLc5zHKFu&q=ハッカソン&type=event
// https://graph.facebook.com/v2.3/331218348435/attending?access_token=CAAFTmOQMYmMBAEKMVkfTdcfLV9rkUIsAE5QT8IWisVklUNvhKYp66nEVd1rZCWt7eZBZA73g1C9XEttS7g7nGZCZCRISD86yMm6v6vH9AoJDYHt82ZCIfZBU909mIDOtPZA19BqjKz6wA0I9S7bupZCvEL20DMLXzHZB9WC4PZAeE2AJK4rthB3bNg6KeHZBpqDfOK0zoHLzet1VES3yLc5zHKFu