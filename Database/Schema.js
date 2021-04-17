
const mongoose =require('mongoose')


mongoose.connect('mongodb+srv://zeel_prajapati_mongo:zeel_prajapati_mongo@cluster0.zarzk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true,
useUnifiedTopology:true,
useCreateIndex:true}).then(()=>{
    console.log('Successfully Connected')
}).catch((err)=>{
    console.log(err)
})


// dhruvil shah14:39/
// const mongoose=require('mongoose');


const UserS= new mongoose.Schema(
    {
        name:{type:String},
        rollno:{type:String},
        points:{type:Number}
    }
)


const QuizS= new mongoose.Schema(
    {
        userid:{type:String},
        question:{type:String},
        answer:{type:[
            {
            AnsText:String,
            up:Number,
            down:Number,
            id:String
        }]
        }
    
    }
)

const User=new mongoose.model('User',UserS)
const Quiz=new mongoose.model('Quiz',QuizS)


exports.User=User;
exports.Quiz=Quiz;
exports.mongoose=mongoose;