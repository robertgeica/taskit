const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
	userId: {
		type: Object,
		required: true
	},
	card: 
		{
			cardTitle: { type: String },
			cardDescription: { type: String },
			createdAt: { type: Date, default: Date.now },
			deadline: { type: String },
			status: { type: String },
			allocatedTo: { type: String }
		}
	,
	cardTasks: [
		{
			taskTitle: { type: String },
			taskDescription: { type: String },
			createdAt: { type: Date, default: Date.now },
			deadline: { type: String },
			status: { type: String },
			allocatedTo: { type: String }
		}
	]
});

module.exports = Card = mongoose.model('card', CardSchema);
