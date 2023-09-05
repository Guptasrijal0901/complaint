const express = require("express");
const app = express();
const {connectDatabase} = require ("./Connection/Connect")
const tableModel = require ("./models/models")
app.use(express.json());

// create
app.post("/api/create", async (req, res)=>{
  try {
    const newobject = {
          tabname:  req.body.name,
          tabemail:  req.body.email,
          tabbranch: req.body.branch,
          tabroll: req.body.roll,
          tabdate: req.body.date,
          tabphone: req.body.phone,
          tabcomp: req.body.comp
          }
          const tabledata = new tableModel(newobject);
          await tabledata.save();
          return res
          .status(100)
          .json({success: true, message: "Data saved succesfully"})      
  }
  catch (error) {
    console.log(error);
    return res.status(303).json({sucess: false, error: error.message});
  }
  });

  
//read
app.get("/api/read", async (req, res) => {
  try {
    const data = await tableModel.find().sort({ createdAt: -1 });
    // console.log(compdata);
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, error: error.message });
  }
});

//delete
app.delete("/delete/:id", async (req, res) => {
    try {
      const tabledelete = await tableModel.findByIdAndDelete(req.params.id);
      console.log(tabledelete)
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
app.put("/update/:comp/:id",async(req,res)=>{
    try {
      const tableupdate = await tableModel.findByIdAndUpdate(req.params.id, 
      { comp: req.params.comp
      })
      console.log(tableupdate)
      return res.status.json({success:true,message:"Updated Successfully"})
    } catch (error) {
      return res.status(400).json({
        success:false, error:error.message,
      });
    }
  })

connectDatabase();
// const PORT = 5000;
const PORT = process.env.PORT || 5000

app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname + "/client/build/index.html"),
      function (err) {
        if (err) {
          console.log(err);
        }
      }
);
});
app.listen(PORT , async ()=>{
    await console.log(`Server is running at port ${PORT}`);
})