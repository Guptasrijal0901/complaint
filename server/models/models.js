const mongoose = require("mongoose");
const compSchema = new mongoose.Schema(
    {
        tabname: String,
        tabemail: String,
        tabbranch: String,
        tabroll: Number,
        tabdate: Date,
        tabphone: Number,
        tabcomp: String
    },
    {timestamps: true}
)
const tableModel = mongoose.model("table-detail", compSchema);
module.export = tableModel;