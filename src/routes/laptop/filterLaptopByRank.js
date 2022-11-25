/* 
Endpoint for filtering laptops by min and max price

example: http://localhost:8000/laptop/search?min=30000&max=100000
*/

import STATUS_CODES from '../../constants/statusCode'
import isNumeric from '../../helper/is_number'
import Laptop from '../../models/laptop'

const filterByRank = async (req, res) => {
    const { min, max } = req.query
    var laptop
    if (!isNumeric(min) && !isNumeric(max)) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            message: 'Price query min or max required.',
        })
    }
    if (!isNumeric(min)) {
        laptop = await Laptop.find({ price: { $lt: max } }).sort({
            total_score: -1,
        })
    } else if (!isNumeric(max)) {
        laptop = await Laptop.find({ price: { $gt: min } }).sort({
            total_score: -1,
        })
    } else {
        laptop = await Laptop.find({ price: { $lt: max, $gt: min } }).sort({
            total_score: -1,
        })
    }
    return res.send(laptop)
}

export default filterByRank
