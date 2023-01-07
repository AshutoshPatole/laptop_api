import { Router } from 'express'
import cache from '../../helper/express_cache'
import verifyToken from '../../middleware/verifyToken'
import deleteLaptop from './deleteLaptop'
import filterBySpec from './filterBySpec'
import filterByRank from './filterLaptopByRank'
import getAllLaptops from './getLaptops'
import fetchSingleLaptop from './getSingleLaptop'
import updateLaptop from './updateLaptop'
const lapRouter = Router()

lapRouter.delete('/:laptopID', deleteLaptop)
lapRouter.post('/:laptopID', /* laptopValidate ,*/ updateLaptop)
lapRouter.get('/', verifyToken, cache.route(), getAllLaptops)
lapRouter.get('/single/:laptopID', verifyToken, fetchSingleLaptop)
lapRouter.get('/rank', verifyToken, cache.route(), filterByRank)
lapRouter.get('/filter', verifyToken, cache.route(), filterBySpec)
export default lapRouter
