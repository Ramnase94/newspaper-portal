const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");


const app = express();

const PORT = process.env.PORT || 3000;


// Middleware

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));

app.use(express.static("public"));

app.use("/uploads",
express.static("uploads"));



// File location

const newsFile = path.join(
    __dirname,
    "data",
    "newspapers.json"
);


// Read JSON

function readNews(){

    return JSON.parse(
        fs.readFileSync(newsFile)
    );

}


// Save JSON

function saveNews(data){

    console.log("Saving To:");
    console.log(newsFile);

    fs.writeFileSync(
        newsFile,
        JSON.stringify(data,null,2)
    );

    console.log("JSON Saved Successfully");

}



// Admin Login

app.post("/login",(req,res)=>{

    const {
        username,
        password
    } = req.body;


    const users =
    JSON.parse(
        fs.readFileSync(
        "./data/users.json"
        )
    );


    const user =
    users.find(
        u =>
        u.username===username &&
        u.password===password
    );


    if(user){

        res.json({
            success:true
        });

    }
    else{

        res.json({
            success:false
        });

    }


});




// Upload PDF


const storage =
multer.diskStorage({

destination:(req,file,cb)=>{

    cb(null,"uploads");

},


filename:(req,file,cb)=>{

    cb(null,
    Date.now()+"-"+file.originalname);

}

});


const upload =
multer({
    storage:storage
});





app.post("/upload",
upload.single("pdf"),
(req,res)=>{


    let news =
    readNews();

console.log(req.body);

   let item={

    id:uuidv4(),

    newspaper:
    req.body.newspaper,

    category:
    req.body.category,

    rni:
    req.body.rni,

    owner:
    req.body.owner,

    mobile:
    req.body.mobile,

    email:
    req.body.email,

    editor:
req.body.editor,

publisher:
req.body.publisher,

volume:
req.body.volume,

issue:
req.body.issue,

    pdf:
    req.file.filename,

    date:
    new Date()

};



    news.push(item);
    saveNews(news);

    console.log(news);


    res.json({
        message:"PDF Uploaded Successfully"
    });


});





// Display Newspaper


app.get("/newspapers",
(req,res)=>{

let news = readNews();

news.sort((a,b)=>
new Date(b.date)-new Date(a.date)
);

let category =
req.query.category;

if(category){

news = news.filter(
n => n.category === category
);

}

res.json(news);

});




// Delete PDF


app.delete(
"/delete/:id",
(req,res)=>{


let news =
readNews();


news =
news.filter(
n=>n.id!==req.params.id
);


saveNews(news);


res.json({
message:"Deleted"
});


});





app.listen(PORT,()=>{

console.log(
`Server running at http://localhost:${PORT}`
);



});