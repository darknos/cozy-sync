// Generated by CoffeeScript 1.7.1
var Contact, VCardParser, americano;

americano = require('americano-cozy');

VCardParser = require('cozy-vcard');

module.exports = Contact = americano.getModel('Contact', {
  id: String,
  carddavuri: String,
  fn: String,
  n: String,
  datapoints: Object,
  note: String,
  _attachments: Object
});

Contact.prototype.getURI = function() {
  return this.carddavuri || this.id + '.vcf';
};

Contact.all = function(cb) {
  return Contact.request('byURI', cb);
};

Contact.byURI = function(uri, cb) {
  var req;
  req = Contact.request('byURI', null, cb);
  req.body = JSON.stringify({
    key: uri
  });
  return req.setHeader('content-type', 'application/json');
};

Contact.prototype.toVCF = function() {
  return VCardParser.toVCF(this.toJSON());
};

Contact.parse = function(vcf) {
  var parser;
  parser = new VCardParser();
  parser.read(vcf);
  return new Contact(parser.contacts[0]);
};
