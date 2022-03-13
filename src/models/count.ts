import { Schema, model, Date, Number } from 'mongoose';

interface Count {
    key: string;
    createdAt: Date,
    counts: [Number],
    value: String
}

const schema = new Schema<Count>({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    counts: [Number],
    createdAt: {
        type: Date,
        required: true,
        index: true
    }
}, {
    collection: 'records',
    versionKey: false
});

const countModel = model<Count>('Count', schema);

export default countModel;
