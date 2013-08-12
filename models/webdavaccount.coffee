db = require './db'

# Object required to store the automatically generated webdav credentials.
module.exports = WebDAVAccount = db.define 'WebDAVAccount',
    id: String
    login: String
    password: String

all = (doc) -> emit doc._id, doc
WebDAVAccount.defineRequest 'all', all, ->
    console.log 'WebDAVAccount "all" request created'

WebDAVAccount.first = (callback) ->
    WebDAVAccount.request 'all', (err, accounts) ->
        if err then callback err
        else if not accounts or accounts.length is 0 then callback null, null
        else  callback null, accounts[0]