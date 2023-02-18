import { Router } from 'express'
import cache from '../../helper/express_cache'
import filter from './filter'
import filterBySpec from './filterBySpec'
import filterByRank from './filterLaptopByRank'
import getAllLaptops from './getLaptops'
import fetchSingleLaptop from './getSingleLaptop'
const lapRouter = Router()

lapRouter.get('/', cache.route(), getAllLaptops)
lapRouter.get('/single/:laptopID', fetchSingleLaptop)
lapRouter.get('/rank', cache.route(), filterByRank)
lapRouter.get('/filter', cache.route(), filter)
// lapRouter.get('')

export default lapRouter
