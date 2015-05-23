var fql = require('fql');
 
function search(urlInfo, callback){
  fql({
      token: 'CAACEdEose0cBAOXoi0z13LQZAnBPguIRnwwyNA6VemVaWIczCdJUoRpuUcloOZCI1VofsNOJR13DVEA8phmJiAgQtNj9iq6pG4F7EKK4C5dxQQFkKtoZBo3CZBIfLfVE60X4ONEU1IXygHBopJr0aCOLnBVrsNFebvrHiZCVSkj4ZBbY0sVZCCq52HFtbdMTZCC1MmrhxRHu506ivIRZA7yWSubqxcsP6GygZD'
  }).query('select eid, uid, rsvp_status from event_member where uid = me()', function(err, data) {
      if (err) {
          callback(err);
      }
      callback(data); // [ { name: 'John Doe' } ] 
  });
}

module.exports = {
    search: search
}