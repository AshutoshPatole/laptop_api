/* 

This endpoint will filter laptops based on price, cpuScore, memoryScore, multimediaScore, connectivityScore and so on.


*/

import Laptop from '../../models/laptop'

const filter = async (req, res) => {
    const { cpuScore, multimediaScore, connectivityScore, maxPrice } = req.query
    const query = Laptop.find()

    if (cpuScore !== undefined) {
        query.sort({ cpu_score: cpuScore })
    } else if (multimediaScore !== undefined) {
        query.sort({ multimedia_score: multimediaScore })
    } else if (connectivityScore !== undefined) {
        query.sort({ connectivity_score: connectivityScore })
    }

    if (maxPrice) {
        query.where('price').lte(maxPrice)
    }

    const laptops = await query.exec()
    return res.send(laptops)
}

export default filter
