var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var moment = require('moment');

var AuthorSchema = Schema(
	{
		first_name: {type: String, required: true, max: 100},
		family_name: {type: String, required: true, max: 100},
		date_of_birth: {type: Date},
		date_of_death: {type: Date},
	}
);

//Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
	return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
	return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('lifespan')
.get(function () {
  var lifetime_string='';
  if (this.date_of_birth) {
      lifetime_string=moment(this.date_of_birth).format('MMMM Do, YYYY');
      }
  if (this.date_of_death) {
      lifetime_string+= ' - ' + moment(this.date_of_death).format('MMMM Do, YYYY');
      }
  return lifetime_string
});


//Export model
module.exports = mongoose.model('Author', AuthorSchema);

