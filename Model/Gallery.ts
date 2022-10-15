import  {Schema, model, models} from 'mongoose';

const gallerySchema = new Schema({
    userId: {
        type: String,
        required: true
    },

    imgUrl: {
        type: String,
        required: true
    },

    cloudinaryId: {
        type: String,
        reqiured: true
    }
});

const gallery = models.pictures ||  model('pictures', gallerySchema);

export default gallery;