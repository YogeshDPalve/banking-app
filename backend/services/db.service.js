import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const url = process.env.DB_URL;

mongoose.connect(url);

export const findAllRecord = async (schema) => {
  const dbRes = await schema.find();
  return dbRes;
};

export const createNewRecord = async (data, schema) => {
  const dbRes = await new schema(data).save();
  return dbRes;
};

export const updateRecord = async (id, data, schema) => {
  const dbRes = await schema.findByIdAndUpdate(id, data, { new: true });
  return dbRes;
};

export const deleteRecord = async (id, schema) => {
  const dbRes = await schema.findByIdAndDelete(id);
  return dbRes;
};
