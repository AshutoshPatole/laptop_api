import { Router } from 'express'
import cache from '../../helper/express_cache'
import deleteLaptop from './deleteLaptop'
import filterBySpec from './filterBySpec'
import filterByRank from './filterLaptopByRank'
import getAllLaptops from './getLaptops'
import fetchSingleLaptop from './getSingleLaptop'
const lapRouter = Router()

lapRouter.delete('/:laptopID', deleteLaptop)
lapRouter.get('/', cache.route(), getAllLaptops)
lapRouter.get('/single/:laptopID', fetchSingleLaptop)
lapRouter.get('/rank', cache.route(), filterByRank)
lapRouter.get('/filter', cache.route(), filterBySpec)
export default lapRouter
