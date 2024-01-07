'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  return db.createTable('accounts', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    idCompany: 'int',
    username: 'string',
    password: 'string',
    role: 'int',
    type: 'int',
    status: 'int',
    email: 'string',
    created_at: 'datetime',
    updated_at: 'datetime'
  }, callback);
};

exports.down = function (db) {
  return db.dropTable('accounts', callback);
};

exports._meta = {
  "version": 1
};
