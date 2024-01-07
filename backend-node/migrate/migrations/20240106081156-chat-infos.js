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
  return db.createTable('chat_infos', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    idRoomChat: 'int',
    idAccount: 'int',
    content: 'string',
    timeCall: 'string',
    typeChat: 'int',
    typeCall: 'int',
    created_at: 'datetime',
    updated_at: 'datetime'
  }, callback);
};

exports.down = function(db) {
  return db.dropTable('chat_infos', callback);
};

exports._meta = {
  "version": 1
};
