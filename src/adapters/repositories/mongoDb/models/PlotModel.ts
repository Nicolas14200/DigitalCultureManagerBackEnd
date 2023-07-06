import * as mongoose from "mongoose";

const plotShema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
      },
    name:{
        type: String,
        required: true,
    },
    codeName:{
        type: String,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    heigth: {
        type: Number,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    ph: {
        type: Number,
        required: true,
    },
    pebbles: {
        type: Number,
        required: true,
    },

    plank: {
        type: Number,
        required: true,
    },

    series:[{   
        vegetableVariety: {
            type: String
        },
        nbPlank: {
            type: Number
        }
    }],

    subPlot: [{
        plotShema:{}
    }],

    eventCulture:[{
        eventCultureShema:{}
    }]
})

export const PlotModel = mongoose.model("plot", plotShema)