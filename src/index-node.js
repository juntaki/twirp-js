/**
 * TWIRP RPC Client for Node JS
 */
var client = require("./client");
var fetch = require("node-fetch");

const serialize = msg => Buffer.from(msg.serializeBinary());
const deserialize = function (responseType) {
  return function (res) {
    return res.arrayBuffer().then(function (buf) {
      return responseType.deserializeBinary(new Uint8Array(buf)).toObject();
    });
  };
};
module.exports = client.clientFactory(fetch, serialize, deserialize);