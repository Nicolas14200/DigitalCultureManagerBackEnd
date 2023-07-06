import * as mongoose from "mongoose";
const eventCultureShema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
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
        unique: true,
    }
})
export const EventCultureModel = mongoose.model("eventCulture", eventCultureShema)