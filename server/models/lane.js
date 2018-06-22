import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.plugin(schema => { schema.options.usePushEach = true });

const laneSchema = new Schema({
  name: { type: 'String', required: true },
  notes: [{ type: Schema.ObjectId, ref: 'Note', required: true }],
  id: { type: 'String', required: true, unique: true },
});


function populateNotes(next) {
  this.populate('notes');
  next();
}


function removeAllNotes(next) {
	const notes = this.notes;
    notes.forEach((arg) => {
      arg.remove(arg.id).exec()  
    });
    next();
};

laneSchema.pre('find', populateNotes);
laneSchema.pre('findOne', populateNotes);
laneSchema.pre('remove', removeAllNotes);

export default mongoose.model('Lane', laneSchema);