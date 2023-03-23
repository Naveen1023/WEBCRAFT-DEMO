const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema (
    {
        groupNo : {
            type : Number,
            required: true,
            unique : true,
        },
        groupName : {
            type : String,
            required: true,
            min : 3,
            max : 50,
        },
        members : {
            type : Array,
            required: true,
            default : []
        },
        projectName : {
            type : String,
            required: true,
        },
    }, {timestamps : true}  
    // timstamps = true => will give the time of creation and updation of the object....
);

const User = mongoose.model("User", UserSchema)

module.exports = User;