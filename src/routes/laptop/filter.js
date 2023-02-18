/* 

This endpoint will filter laptops based on price, cpuScore, memoryScore, multimediaScore, connectivityScore and so on.


*/

import Laptop from '../../models/laptop'

const filter = async (req, res) => {
    const { cpuScore, multimediaScore, connectivityScore, maxPrice } = req.query
    const query = Laptop.find()

    if (cpuScore) {
        query.sort({ cpu_score: -1 })
    } else if (multimediaScore) {
        query.sort({ multimedia_score: -1 })
    } else if (connectivityScore) {
        query.sort({ connectivity_score: -1 })
    }

    if (maxPrice) {
        query.where('price').lte(maxPrice)
    }

    const laptops = await query.exec()
    return res.send(laptops)
}

export default filter
