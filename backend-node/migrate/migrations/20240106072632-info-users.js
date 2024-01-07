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
  return db.createTable('info_users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    idCompany: 'int',
    idAccount: 'int',
    name: 'string',
    phoneNumber: 'string',
    image: 'string',
    created_at: 'datetime',
    updated_at: 'datetime'
  }, callback);
};

exports.down = function(db) {
  return db.dropTable('info_users', callback);
};

exports._meta = {
  "version": 1
};
