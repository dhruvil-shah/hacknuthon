const DataBase=require('../Database/Schema');
// const path = require('path');
// const {mongoose,User,Quiz}=DataBase;

const User=DataBase.User;
const path = require('path');
const AddUser=async (req,res)=>{
   
    const {name,rollno,points}=req.body;
    console.log(name,rollno,points);
    const isin=await User.findOne({rollno});
    if(!isin){

        const docs=new User({name,rollno,points});
        const ans=await docs.save();
        return res.send(ans);
    }
    res.status(404).send('User Exits');

}


const FindUser=async (req,res)=>{
   
    const {name,rollno,points}=req.params;
    // console.log(name,rollno,points);
    const ans=await User.findOne({rollno:name});
    if(ans===null){
        return res.status(404).send('User Not Found');
    }
    res.send(ans);
}


const AddQuiz=async (req,res)=>{

    // {
    //     question:{type:String},
    //     answer:{type:[
    //         {
    //         AnsText:String,
    //         up:Number,
    //         down:Number,
    //         id:String}]
    //     }
    
    // }
    res.send('AddQuiz');
}


const AddAns=async (req,res)=>{
    res.send('AddAns');
}


const UpdatePoint=async (req,res)=>{
    res.send('UpdatePoint');
}


const UpdateQuestion=async (req,res)=>{
    res.send('UpdateQuestion');
}



const UpVote=async (req,res)=>{
    res.send('UpVoteQuestion');
}


const DeleteQuiz=async (req,res)=>{
    res.send('DeleteQuiz');
}


exports.saydemo=function(req,res){
    res.render(res.path);
}

exports.AddUser=AddUser;
exports.FindUser=FindUser;
exports.AddQuiz=AddQuiz;
exports.AddAns=AddAns;
exports.UpVoteQuestion=UpVote;
exports.UpdatePoint=UpdatePoint;
exports.DeleteQuiz=DeleteQuiz;
exports.UpdateQuestion=UpdateQuestion;