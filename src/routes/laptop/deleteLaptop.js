import SERVER from "../../constants/message"
import STATUS_CODES from "../../constants/statusCode";
import Laptop from "../../models/laptop";

const deleteLaptop = async (req, res) => {
    let laptopID = req.params.laptopID
    const existingLaptop = await Laptop.findById(laptopID)
    if (!existingLaptop) return res.status(STATUS_CODES.NO_CONTENT).json({
        message: SERVER.CONTENT_NOT_FOUND
    });
    try {
        await Laptop.findByIdAndRemove(laptopID)
        return res.status(STATUS_CODES.OK).json({
            message: SERVER.CONTENT_DELETED_SUCCESSFULLY
        });
    } catch (e) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: SERVER.INTERNAL_ERROR
        });
    }
}

export default deleteLaptop;