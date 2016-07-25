var mongoose = require('mongoose');

var AnimeSchema = {
  id: { type: Number, unique: true },
  genre: String,
  name:  String,
  nameKana:  String,
  namePlus:  String,
  namePlusKana:  String,
  length: Number,
  restricted: String,
  startDay: String
};

module.exports = mongoose.model('Anime', AnimeSchema);
