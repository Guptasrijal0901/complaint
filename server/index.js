const express = require("express");
const app = express();
const {connectDatabase} = require ("./Connection/Connect")
const tableModel = require ("./models/models")
app.use(express.json());

// create
app.post("/create", async(req, res)=>{
  try {
    const newobject = {
          name:  req.body.name,
          email:  req.body.email,
          cranch: req.body.branch,
          roll: req.body.roll,
          date: req.body.date,
          phone: req.body.phone,
          comp: req.body.comp
          }
          const tabledata = new tableModel(newobject);
          await tabledata.save();
          return res .status(100).json({success: true, message: "data saved succesfully"})      
  }
  catch (error) {
    return res.status(300).json({sucess: false, error: error.message});
  }
  });
//read
app.get("/read", async (req, res) => {
  try {
    const compdata = await tableModel.find().sort({createdAt: -1});
    // console.log(compdata);
    return res.status(200).json({ success: true, data: compdata });
  } catch (error) {
    return res.status(401).json({ success: false, error: error.message });
  }
});

//delete
app.delete("/delete/:id", async (req, res) => {
    try {
      const deldata = await tableModel.findByIdAndDelete(req.params.id);
      return res.json({
        success: true,
        message: "Table deleted",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  });

// update
app.put("/updateart/:id/:arttheme/:arttitle/:artdescription",async(req,res)=>{
    try {
      const updatedata =await tableModel.findByIdAndUpdate(req.params.id)
      return res.status.json({success:true,message:"Updated Successfully"})
    } catch (error) {
      return res.status(400).json({
        success:false,error:error.message,
      });
    }
  })

connectDatabase();
const PORT = 3000;
app.listen(PORT , async ()=>{
    await console.log(`Server is running at port ${PORT}`);
})