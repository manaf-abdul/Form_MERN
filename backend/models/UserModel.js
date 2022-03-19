import mongoose from 'mongoose'

const UserSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        mobile:{
            type:Number,
            required:true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        jobType:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Category'
        },
        location:{
            type:String,
            required:true,
        },
        DOB:{
            type:String,
        },
        image:{
            type:String,
        }
    }
)

const User=mongoose.model('User',UserSchema)
export default User;