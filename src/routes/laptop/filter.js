/* 

This endpoint will filter laptops based on price, cpuScore, memoryScore, multimediaScore, connectivityScore and so on.

http://localhost:8000/laptop/filter?maxPrice=80000&cpuScore=1

All fields are optional: send 1 for low end and -1 for high end laptops. Example cpuScore=-1

*/

// !  TODO: Implement other fields like graphics and portability

import Laptop from '../../models/laptop'

const filter = async (req, res) => {
    const {
        cpuScore,
        multimediaScore,
        connectivityScore,
        graphicsScore,
        maxPrice,
    } = req.query
    const query = Laptop.find()

    if (cpuScore !== undefined) {
        query.sort({ cpu_score: cpuScore })
    } else if (multimediaScore !== undefined) {
        query.sort({ multimedia_score: multimediaScore })
    } else if (connectivityScore !== undefined) {
        query.sort({ connectivity_score: connectivityScore })
    } else if (graphicsScore !== undefined) {
        query.sort({ graphics_score: graphicsScore })
    }

    if (maxPrice) {
        query.where('price').lte(maxPrice)
    }

    const laptops = await query.exec()
    return res.send(laptops)
}

export default filter
