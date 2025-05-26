import {
  createNewRecord,
  findAllRecord,
  updateRecord,
} from "../services/db.service.js";

export const getData = async (req, res, schema) => {
  try {
    const dbResponce = await findAllRecord(schema);
    return res.status(200).send({
      success: true,
      message: "Employees data get successfully",
      data: dbResponce,
    });
  } catch (error) {
    console.log("Error to get employees : ", error.message);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

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
        message: "Already exist",
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

export const updateData = async (req, res, schema) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const dbRes = await updateRecord(id, data, schema);
    return res.status(200).send({
      success: true,
      message: "Record Updated !",
      data: dbRes,
    });
  } catch (error) {
    console.log("Error to update status : ", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
