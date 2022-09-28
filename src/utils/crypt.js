const crypto = require('node:crypto');

function GetHash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}

module.exports = GetHash;