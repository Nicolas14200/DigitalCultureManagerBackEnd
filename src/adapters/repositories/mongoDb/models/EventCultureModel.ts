import * as mongoose from "mongoose";
export const eventCultureShema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
      },
    date: {
        type: Date,
        required: true,
    },
    note: {
        type: String,
    },
    plotId: {
        type: String,
        required: true,
    }
})
export const eventCultureModel = mongoose.model("eventCultures", eventCultureShema)