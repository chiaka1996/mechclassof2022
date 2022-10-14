import  {Schema, model, models} from 'mongoose';

const profileSchema = new Schema({
    surname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },
    nickname: {
        type: String
    },
    image: {
        type: String
    },
    matric: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    bio: {
        type: String
    },
    password: {
        type: String
    },
    cloudinaryId:{
        
    }

});

const students_profile = models.students_profile ||  model('students_profile', profileSchema);

export default students_profile;