const userModel = require('../Models/User');


const getAllUsers = async(req, res) => {
    try{
        const allUsers = await userModel.find({});
        res.status(200).send(allUsers);
    }
    catch(err){
        res.status(404).send({err : "Can't Find Users"});
    }
}

const createUser = async(req, res) => {
    try{
        const {groupNo, groupName, members, projectName} = req.body;
        const newUser = new userModel({
            groupNo, groupName, members, projectName
        })
        
        await newUser.save();
        res.status(200).send({msg : "user created successfully!!!!"});
    }
    catch(err){
        console.log(err.message);
        res.status(409).send({err : 'can\'t create user...'});
    }
}


const deleteUser = async(req, res) => {
    try{
        const groupID = req.params.id;
        // console.log(groupID);
        await userModel.deleteOne({groupNo : groupID})
        res.status(200).send({msg: "Done"});
    }
    catch(err){
        res.status(409).send({err : err.message});
    }
} 



const updateUser = () => {
    try{
        
    }
    catch(err){
        res.status(409).send({err : 'can not update user'});
    }
}

module.exports = {getAllUsers, createUser, deleteUser, updateUser};