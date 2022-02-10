const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const memberSchema = new Schema({

    member_id:{
        type:String,
        require:true,
        unique:true, 
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    group:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    type:{
        type_name:{
            type:String,
            required:true
        },
        day_borrow:{
            type:Number,
            required:true
        }
    }
},{
    timestamps:true
});
/////////|เปลี่ยนชื่อให้เหมือนบรรทัดที่7(memberSchema)|////////////////////
memberSchema.methods.hashPassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
}
memberSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}
memberSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
}
module.exports = mongoose.model("Member", memberSchema);
memberSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});