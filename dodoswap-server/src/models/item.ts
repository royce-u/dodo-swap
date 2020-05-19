import * as mongoose from 'mongoose'

//Create Item interface extending mongoose.Document (which includes ._id)
export interface ItemInterface extends mongoose.Document {
    acID: string;
    name: string;
    variation: string;
    image: string;
    buy: number;
    sell: number;
    tag: string;
}
//create item schema
let itemSchema: mongoose.Schema = new mongoose.Schema({
    acID: String,
    name: String,
    variation: String,
    image: String,
    buy: Number,
    sell: Number, 
    tag: String
})
//create model with type item and export item model
export default mongoose.model<ItemInterface>('Item', itemSchema)
