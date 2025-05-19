import { createNewRecord } from "../services/db.service.js";

export const createData = async (req, res, schema) => {
  try {
    const data = req.body;
    const dbRes = await createNewRecord(data, schema);
    return res.status(200).send({
      success: true,
      message: "Data is inserted successfully",
      data: dbRes,
    });
  } catch (error) {
    console.log("Error in create data controller : ", error);
    if (error.code === 11000) {
      return res.status(422).send({
        success: false,
        message: "Email already exist",
        error,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Internal server error",
        error,
      });
    }
  }
};
