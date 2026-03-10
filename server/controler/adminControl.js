import { getMongoDbConn } from "../db/dbConect.js"
import jwt from "jsonwebtoken"


export const createAgent = async (req,res) => {
    try{

        const {agentCode, fullName, role} = req.body;
        const newAgent = {
            agentCode,
            fullName,
            role,
            createdAt :new Date().toLocaleString(),
            passwordHash : fullName
        }
        const mongoConn = await getMongoDbConn();
        const usersCollection = mongoConn.collection("usersData");
        const user = await usersCollection.insertOne(newAgent);
        const agentToPrint = await usersCollection.findOne({_id : user.insertedId})
        res.status(200).json({msg:"seccess",data:agentToPrint})
    }catch(arr){
        res.status(500).json({msg:arr.message,data:null})
    }
}


export const logIn = async (req,res) => {
    try{
        const mongoConn = await getMongoDbConn();
        const usersCollection = mongoConn.collection("usersData");
        const{agentCode,password} = req.body;
        const user = await usersCollection.findOne({agentCode : agentCode})
        if(!user){
            res.status(404).json({msg:"user not pound"})
        }
        if(!user.passwordHash === password){
            res.status(400).json({msg:"rong password"})
        }
        const token = jwt.sign({id: user._id},"123",{expiresIn:"1h"})
        const userAndToken = {
            user,
            token
        }
        res.status(200).json({msg:"seccess",data:userAndToken})
    }catch(err){
        res.status(500).json({msg:"samthing went rong",data:null})
    }
}