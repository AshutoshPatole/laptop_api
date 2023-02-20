/*
Endpoint for fetching laptops based on :
- laptop name
- processor name
-  price

sort by less price first
*/

import SERVER from '../../constants/message'
import STATUS_CODES from '../../constants/statusCode'
import Laptop from '../../models/laptop'

const filterBySpec = async (req, res) => {
    const { brand, processor, price } = req.query
    if (brand == undefined && processor == undefined && price == undefined) {
        return res.send('Required brand, processor and price query')
    }
    try {
        const laptops = await Laptop.find({
            laptop_name: { $regex: brand, $options: 'i' },
            processor_name: { $regex: processor, $options: 'i' },
            price: { $lte: price },
        }).sort({ price: 1 })
        return res.send(laptops)
    } catch (e) {
        return res.status(STATUS_CODES.NO_CONTENT).json({
            message: SERVER.FILTER_ERROR,
        })
    }
}

export default filterBySpec
