const mongoose= require("mongoose")

const entrySchema=new mongoose.Schema(
    {
        laptop:{ type:mongoose.Schema.Types.ObjectId, ref:'Laptop', required:true,},
        holder: { type: mongoose.Schema.Types.ObjectId, ref: 'Holder', required:true},
        entrytime:{ type:Date, default: Date.now},
        checkout: { type:Date, default:Date.now},
        type: { type:Number, default:1}
    },
    {
        timestamps:true
    }
)

module.exports= mongoose.model("Entry", entrySchema)