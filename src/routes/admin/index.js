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

const adminRouter = Router()

const newLaptopFile = multer({
    storage: newLaptopsStore,
    fileFilter: fileFilter,
})

const pricingFile = multer({ storage: pricingStore, fileFilter: fileFilter })

adminRouter.get('/ranking', rankingSystem)
adminRouter.get('/analytics', cache.route(), analytics)
adminRouter.get('/update-pricing', updatePricing)
adminRouter.get('/bulk-insert', bulkInsert)
adminRouter.post(
    '/upload-new-file',
    newLaptopFile.single('newfile'),
    uploadFile
)
adminRouter.get('/update', updatePricing)
adminRouter.get('/duplicate', getDuplicates)
adminRouter.post('/create-user', createAdminUser)
adminRouter.post('/upload', pricingFile.single('file'), uploadFile)
export default adminRouter
