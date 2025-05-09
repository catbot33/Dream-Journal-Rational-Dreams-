import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios';
import methodOverride from 'method-override';



const app = express();
const port = 3500;
var fetch_result;
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("index.ejs")
} )
app.get("/index.ejs", (req, res) =>{
    res.render("index.ejs")
} )
app.get("/guide.ejs", (req, res) =>{
    res.render("guide.ejs")
} )

app.get("/dreamjournal.ejs", async(req, res) =>{
    try {
        const response = await axios.get("http://localhost:4000/stories"); 
          var result = response.data;
          res.render("dreamjournal.ejs",{stories: result,
          });
       
       } catch (error) { 
       console.log("Failed to make request:", error.message); 
       res.render("dreamjournal.ejs")
        }
       
} )
app.post("/dreamjournal.ejs/saves", async(req, res) =>{
    try {
        const response = await axios.post("http://localhost:4000/saves", req.body); 
        console.log(req.body)
        res.redirect("/dreamjournal.ejs")
       } catch (error) { 
       console.log("Failed to make request:", error.message); 
     res.send(error.message)
        }
       
} )
app.delete("/dreamjournal.ejs/saves/:id", async (req, res) => {
    try {
        var response = await axios.delete(`http://localhost:4000/delete/${req.params.id}`);
        var result = response.data;
        if(result.answer){
            res.redirect("/dreamjournal.ejs")
        }
        else{
            res.redirect("/dreamjournal.ejs")
        }
       
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
app.get("/dreamjournal.ejs/saves/edit-fetch/:id", async(req, res)=> {
    
    try {
           var response = await axios.get(`http://localhost:4000/edit-fetch/${req.params.id}`, req.body);
           var result = response.data;
          res.render("edit.ejs",{
            fetch: result,
          });
 
       } catch (error) { 
       console.log("Failed to make request:", error.message); 
       res.render("dreamjournal.ejs")
        }

})
app.post("/dreamjournal.ejs/edit/:id", async(req, res)=> {
    try {
        var response = await axios.patch(`http://localhost:4000/edit/${req.params.id}`, req.body);
        fetch_result = response.data;
           res.redirect("/dreamjournal.ejs")


       
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


app.get("/dreamjournal.ejs/cancel", (req, res)=> {
    res.redirect("/dreamjournal.ejs")
})

app.listen(port, () => {
    console.log(`Hosted: True ,,, Port : ${port}`)
})
