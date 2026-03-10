import { parse } from "csv-parse/sync";
import { getMongoDbConn } from "../db/dbConect.js";
import multer, { memoryStorage } from "multer"
export const createReporrt = async (req,res) => {
    try{
       const {category, urgency, message} = req.body;
       const newReport = {
        userid:req.user._id,
        category,
        urgency,
        message,
        sourceType:"manual",
        createdAt:new Date().toLocaleString()
       }
       const mongoConn = await getMongoDbConn()
       const reportCollection = mongoConn.collection("reports")
       const report = await reportCollection.insertOne(newReport)
       const reportToPrint = await reportCollection.findOne({_id : report.insertedId})
       return res.status(200).json({msg:"seccess",data:reportToPrint})
       

    }catch(arr){
        res.status(500).json({msg:arr.message,data:null})
    }
}








export const multerMidelwer = (extention,storig) => {
    return multer({storig,
        fileFilter: (req, file, cb) => {
            const validFaile = extention.some(ext => file.mimetype.endsWith(ext))
            cb(null, validFaile)
        },
        limits: 1024**2*5
    })
}
export const upload = multerMidelwer(["csv"],multer.memoryStorage())





const bufferToObject = async (req,res) => {
        const buffer = req.file.buffer; 
        const csvText = buffer.toString("utf-8");
        const data = parse(csvText, {
          columns: true,          
        });
        
        return data
}


export const createReporrtsFromCsv = async (req,res) => {
    try{
        const data = await bufferToObject(req,res)
       const newReports = data.map((report) =>({ userid:req.user._id,...report,sourceType:"csvFile",createdAt:new Date().toLocaleString()}));
       const mongoConn = await getMongoDbConn()
       const reportCollection = mongoConn.collection("reports")
       const reports = await reportCollection.insertMany(newReports)
    res.status(200).json({msg:"seccess",data:null})
    }catch(arr){
        res.status(500).json({msg:arr.message,data:null})
    }
}

export const getReports = async (req,res) => {
    let serchBy;
    const {agentCode, category, urgency} = req.query;
    if(agentCode){
        serchBy = agentCode
    }
    if(category){
        serchBy = category
    }
    if(urgency){
        serchBy = urgency   
    }
    try{
        const mongoConn = await getMongoDbConn()
        const reportCollection = mongoConn.collection("reports")
        if(agentCode){
        serchBy = {agentCode:agentCode} 
        }
        if(category){
        serchBy = {category:category} 
        }
        if(urgency){
        serchBy = {urgency:urgency}  
        }
        const reportsToPrint = await reportCollection.find(serchBy ? serchBy :{}).toArray()
        return res.status(200).json({msg:"seccess",data:reportsToPrint})

    }catch(arr){
        res.status(500).json({msg:arr.message,data:null})
    }
}




