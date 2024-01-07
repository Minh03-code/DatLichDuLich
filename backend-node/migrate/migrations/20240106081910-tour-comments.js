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
  return db.createTable('tour_comments', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    idTour: 'int',
    idAccount: 'int',
    comment: 'string',
    created_at: 'datetime',
    updated_at: 'datetime'
  }, callback);
};

exports.down = function(db) {
  return db.dropTable('tour_comments', callback);
};

exports._meta = {
  "version": 1
};
