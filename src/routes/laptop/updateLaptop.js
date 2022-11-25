/* 
Endpoint for patching a laptop

PATCH: http://localhost:8000/laptop/laptopID
body: {laptop}
*/

import SERVER from "../../constants/message";
import STATUS_CODES from "../../constants/statusCode";
import Laptop from "../../models/laptop";

const updateLaptop = async (req, res) => {
  if (req.params.laptopID == null) {
    return status(STATUS_CODES.BAD_REQUEST).json({
      message: "Laptop ID cannot be null",
    });
  }
  const lap = await Laptop.findById(req.params.laptopID);
  if (!lap)
    return res.status(STATUS_CODES.NOT_FOUND).json({
      message: SERVER.CONTENT_NOT_FOUND,
    });
  try {
    lap.set(req.body);
    await lap.save();
    res.status(STATUS_CODES.OK).json({
      message: SERVER.CONTENT_MODIFIED_SUCCESSFULLY,
    });
  } catch (e) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: SERVER.CONTENT_NOT_FOUND,
    });
  }
};

export default updateLaptop;
