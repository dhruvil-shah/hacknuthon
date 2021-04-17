const DataBase=require('../Database/Schema');
// const path = require('path');
const {mongoose,User,Quiz}=DataBase;

// const User=DataBase.User;
const path = require('path');




//For adding new User in DataBase

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


//For finding the data of user in data base

const FindUser=async (req,res)=>{
   
    const {rollno,points}=req.params;
    // console.log(name,rollno,points);
    const ans=await User.findOne({rollno});

    if(ans===null){
        return res.status(404).send('User Not Found');
    }

    res.send(ans);
}

// 607abcc38b41e1f63900fee0


//for adding new Quiz in Data base

const AddQuiz=async (req,res)=>{

    const {userid,question}=req.body;
    // console.log(name,rollno,points);
    // const isin=await User.findOne({userid,question});
    // if(!isin){

        const docs=new Quiz({userid,question});
        const ans=await docs.save();
        return res.send(ans);
    
    // res.status(404).send('User Exits');
    // res.send('AddQuiz');
}


//For adding ans in Given Quiz.

const AddAns=async (req,res)=>{

    const {questionid,anstext,userid}=req.body;

    let quiz=await Quiz.findOne({_id:questionid});
    
    let new_quiz=[...quiz["answer"]];
    
    // int aee=[1,2];
    
    new_quiz.push({anstext,userid,up:0});

    await Quiz.updateOne(quiz, {answer:new_quiz});
    
    quiz=await Quiz.findOne({_id:questionid});
    
    
    
    console.log(quiz);
    res.send(quiz);
}



const UpVote=async (req,res)=>{

    const {questionid,ansid}=req.body;

    let quiz=await Quiz.findOne({_id:questionid});

    let new_quiz=[...quiz["answer"]];

    let ans_arr=new_quiz.find((data)=>data['_id']==ansid);

    // console.log(typeof(new_quiz[0]['_id']));

    let userid=ans_arr['userid'];

    await Quiz.updateOne(quiz, {up:1});

    // conat an
    let ans=await User.findOne({_id:userid});
    const new_p=ans['points']+10;

    await User.updateOne({_id:userid},{points:new_p});
  
    ans=await User.findOne({_id:userid});

    res.send(ans);







    res.send('UpVoteQuestion');
}


//For find all the data of User.
const FindAllUserInfo=async (req,res)=>{
   
    const {userid}=req.params;
    // console.log(name,rollno,points);
    const ans=await Quiz.find({userid});

    if(ans===null){
        return res.status(404).send('User Not Found');
    }

    res.send(ans);
}



// const UpdateQuestion=async (req,res)=>{
//     const {questionid,question}=req.body;

//     // let quiz=await Quiz.findOne({_id:questionid});
//     await Quiz.updateOne({_id:questionid}, {});

//     res.send('UpdateQuestion');
// }


// const DeleteQuiz=async (req,res)=>{
//     res.send('DeleteQuiz');
// }


exports.saydemo=function(req,res){
    res.render(res.path);
}

exports.AddUser=AddUser;
exports.FindUser=FindUser;
exports.AddQuiz=AddQuiz;
exports.AddAns=AddAns;
exports.UpVoteQuestion=UpVote;
// exports.UpdatePoint=UpdatePoint;
exports.FindAllUserInfo=FindAllUserInfo;
// exports.DeleteQuiz=DeleteQuiz;s
// exports.UpdateQuestion=UpdateQuestion;