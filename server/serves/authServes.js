import multer, { memoryStorage } from "multer"
import { parse } from "csv-parse/sync";


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





export const bufferToObject = async (req,res) => {
        const buffer = req.file.buffer; 
        const csvText = buffer.toString("utf-8");
        const data = parse(csvText, {
          columns: true,          
        });
        
        return data
}