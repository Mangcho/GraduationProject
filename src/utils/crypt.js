const crypto = require('node:crypto');

exports.GetHash = function(data){
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}