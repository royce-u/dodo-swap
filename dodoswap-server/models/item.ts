import * as mongoose from 'mongoose'
//Create Item interface extending mongoose.Document (which includes ._id)
export default interface Item extends mongoose.Document {
acID: number;
name: string;
variation: string;
image: string;
buy: number;
sell: number
}
//create item schema
let itemSchema: mongoose.Schema = new mongoose.Schema({
acID: String,
name: String,
variation: String,
image: String,
buy: Number,
sell: Number
})
//create model with type item and export item model
let Item: mongoose.Model<Item> = mongoose.model<Item>('Item', itemSchema)
module.exports = Item