const express = require('express');
const multer = require('multer');

const router = express.Router();


const storage = multer.diskStorage({
    destination : (req, file, cp)=>{
        cp(null, "public/images");
    },
    filename : (req, file, cp)=>{
        cp(null,req.body.name)
    }
});

const upload = multer({storage : storage});

router.post("/",upload.single("file"), (req, res)=>{
    try{
        res.status(200).json({success: true});
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/images");
//     },
//     filename: (req, file, cb) => {
//       cb(null, req.body.name);
//     },
//   });
// const upload = multer({ storage: storage });


// router.post("/", upload.single("file"), (req, res) => {
//     try {
//       return res.status(200).json("File uploded successfully");
//     } catch (error) {
//       console.error(error);
//     }
//   });





module.exports = router;
