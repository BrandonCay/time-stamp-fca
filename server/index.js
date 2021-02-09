const express=require('express');
const app = express();

const timeFormat=(date)=>{
    return {unix:date.getTime(),utc: date.toUTCString()}
}

app.get('/api/time-stamp-fca',(req,res)=>{
    let date=new Date();
    date=timeFormat(date);
    res.json(date);
})



app.get('/api/time-stamp-fca/:time',(req,res)=>{
    let date=new Date(req.params.time);

    if(isNaN(date.getTime())){
        res.json({error:'Invalid'});
    }else{
       date=timeFormat(date);
       res.json(date);
    }
})


const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`listening to port ${PORT}`));