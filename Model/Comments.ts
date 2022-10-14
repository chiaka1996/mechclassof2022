import  {Schema, model, models} from 'mongoose';

const commentsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },

    senderId: {
        type: String,
        required: true
    },

    senderSurname: {
        type: String,
        required: true
    },

    senderLastname: {
        type: String,
        required: true
    },

    comment:{
        type: String,
        required: true,
    },

    senderPics: {
        type: String
    },

    senderNickname: {
        type: String
    }

});

const comment = models.comments ||  model('comments', commentsSchema);

export default comment;