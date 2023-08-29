const mongoose = require("mongoose");
const compSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        branch: String,
        roll: Number,
        date: Date,
        phone: Number,
        comp: String
    },
    {timestamps: true}
)
const tableModel = mongoose.model("table-detail", compSchema);
module.export = tableModel;