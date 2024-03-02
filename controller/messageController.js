
const Messages = require("../model/messageModel");

module.exports.addMsg = async (req,res, next)=>{
    try {

        const {from, to , message} = req.body;
        const data = await Messages.create({
            message : {text : message},
            users: [from,to],
            sender : from,
        });

        if(data)return res.json({msg:"Message added succesfully"});
        return res.json({msg : "Failed to add mesage to database."});
    }catch(ex){
        next(ex);
    }
}
module.exports.getMsg = async (req,res, next)=>{
        try{
            const {from,to} =req.body;
            // console.log(from ,to);
            const mess = await Messages.find({users: {$all:[from,to],},
            }).sort({updatedAt : 1});
            
            const projectedMessages = mess.map((msg)=>{
                return{
                    fromSelf : msg.sender.toString()===from,
                    message : msg.message.text,
                };
            });
            // console.log(projectedMessages);
            res.json(projectedMessages);
        }catch(ex){
            next(ex);
        }
}