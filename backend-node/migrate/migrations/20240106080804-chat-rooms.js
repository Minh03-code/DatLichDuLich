'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  return db.createTable('chat_rooms', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    idCompany: 'int',
    idAccount1: 'int',
    idAccount2: 'int',
    newChat: 'string',
    typeRead: 'int',
    created_at: 'datetime',
    updated_at: 'datetime'
  }, callback);
};

exports.down = function(db) {
  return db.dropTable('chat_rooms', callback);
};

exports._meta = {
  "version": 1
};
