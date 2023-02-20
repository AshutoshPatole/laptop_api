/*
Endpoint for getting single laptop from db

ex: GET: http://localhost:8000/laptop/laptopID
*/

import SERVER from '../../constants/message';
import STATUS_CODES from '../../constants/statusCode';
import Laptop from '../../models/laptop';

const fetchSingleLaptop = async (req, res) => {
  try {
    const laptopID = req.params.laptopID;
    const existingLaptop = await Laptop.findById(laptopID);
    return res.send(existingLaptop);
  } catch (e) {
    return res.status(STATUS_CODES.OK).json({
      message: SERVER.CONTENT_NOT_FOUND,
    });
  }
};
export default fetchSingleLaptop;
