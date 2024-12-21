import mongoose from "mongoose";


const productCollection="productos"

const productIndexNeeded ={
    type: String,
    index:true
}


const productSchema={

title:productIndexNeeded,
description:String,
price:Number,
stock:Number,
category:productIndexNeeded,
status:Boolean
}


export const productModel = mongoose.model(productCollection,productSchema)