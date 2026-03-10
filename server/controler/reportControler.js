import { getMongoDbConn } from "../db/dbConect";
import multer, { memoryStorage } from "multer"
export const createReporrt = async (req,res) => {
    try{
       const {category, urgency, message} = req.body;
       const newReport = {
        userid:req.user._id,
        category,
        urgency,
        message,
        imagePath : req.file ? src/uploads/req.file.filename : null,
        sourceType:"manual",
        createdAt:new Date().toLocaleString()
       }
       const mongoConn = await getMongoDbConn()
       const reportCollection = mongoConn.collection("reports")
       const report = reportCollection.insertOne(newReport)
       

    }catch{

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







// /reports/csv POST
// מטרה: קליטת קובץ CSV והמרתו לדיווחים
// Admin או Agent של Bearer token :הרשאה
// מה מקבל
// Content-Type: multipart/form-data
// File required: csvFile
// פורמט מומלץ לעמודות: message ,urgency ,category