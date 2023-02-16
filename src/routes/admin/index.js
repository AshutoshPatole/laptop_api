import { Router } from 'express'
import cache from '../../helper/express_cache'
import analytics from './analytics'
import bulkInsert from './bulk-upload'
import rankingSystem from './rankingSystem'
import updatePricing from './updatePricing'
import createAdminUser from './createAdmin'
import getDuplicates from './fetchDuplicates'
import multer from 'multer'
import {
    pricingStore,
    fileFilter,
    newLaptopsStore,
} from '../../helper/multer_config'
import uploadFile from './fileUpload'
import updateLaptop from './updateLaptop'

const adminRouter = Router()

const newLap = multer({
    storage: newLaptopsStore,
    fileFilter: fileFilter,
})

// ! TODO: Fix broken multer config. The file is not getting uploaded to pricingStore Storage engine
const pricingFile = multer({ storage: pricingStore, fileFilter: fileFilter })

adminRouter.get('/ranking', rankingSystem)
adminRouter.get('/analytics', cache.route(), analytics)
adminRouter.get('/update-pricing', updatePricing)
adminRouter.post('/:laptopID', updateLaptop)
adminRouter.get('/bulk-insert', bulkInsert)

adminRouter.post('/upload-new-file', newLap.single('newfile'), uploadFile)
adminRouter.get('/update', updatePricing)
adminRouter.get('/duplicate', getDuplicates)
adminRouter.post('/create-user', createAdminUser)
adminRouter.post('/upload', pricingFile.single('file'), uploadFile)
export default adminRouter
