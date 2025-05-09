import express from "express";
import bodyParser from "body-parser";

const port = 4000;
const app = express();
var dreams_saves = [];

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.get("/stories", (req, res) => {
 res.json(dreams_saves)
})

function formatDate() {
    const now = new Date();
  
    // Options for formatting the date
    const day = now.toLocaleDateString('en-US', { weekday: 'short' }); // Mon
    const month = now.toLocaleDateString('en-US', { month: 'short' }); // Jan
    const date = now.getDate(); // 06
    const year = now.getFullYear(); // 2025
  
    // Options for formatting the time
    const time = now.toLocaleTimeString('en-US', { hour12: true });
  
    return `${day} ${month} ${date < 10 ? '0' + date : date} ${year} ${time}`;
  }
  
  
  
  
app.post("/saves",(req,res)=> {
    console.log(req.body)
    var dream = 
        {
            id: dreams_saves.length + 1 , 
            text: req.body.text,
            date : formatDate(),
            title : req.body.title,
        }
    ;
    dreams_saves.push(dream)
  res.json(dreams_saves)
})

app.delete("/delete/:id", (req, res)=>{
  const id = parseInt(req.params.id);
  const story = dreams_saves.findIndex((dream)=> dream.id === id )
  console.log(story);
  if(story > -1 ){
  dreams_saves.splice(story , 1);
  res.json({answer : true})
  }
  else{
    res.json({answer : false})
  }


})
app.get("/edit-fetch/:id", (req, res)=> {
  const id = parseInt(req.params.id);
  const story = dreams_saves.find((dream)=> dream.id === id )
  res.json(story)
})

app.patch("/edit/:id", (req, res)=> {
const id = parseInt(req.params.id);
const story = dreams_saves.find((dream)=> dream.id === id )
var edited_story = {
  id: id, 
  text: req.body.text || story.text,
  date : formatDate() + "  edited",
  title : req.body.title || story.title,

}
const story_index = dreams_saves.findIndex((dream)=> dream.id === id )
dreams_saves[story_index] = edited_story

res.json(dreams_saves)

})


app.listen(port, (error)=> {
    if (error) throw error
     console.log(`port ${port} ,,, success`);

})