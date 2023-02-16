import { Router } from 'express'
import cache from '../../helper/express_cache'
import analytics from './analytics'
import bulkInsert from './bulk-upload'
import rankingSystem from './rankingSystem'
import updatePricing from './updatePricing'
import verifyToken from '../../middleware/verifyToken'
import createAdminUser from './createAdmin'
import getDuplicates from './fetchDuplicates'
import isAdmin from '../../middleware/isAdmin'
import multer from 'multer'
import {
    pricingStore,
    fileFilter,
    newLaptopsStore,
} from '../../helper/multer_config'
import uploadFile from './fileUpload'

const adminRouter = Router()

// two multer config for saving new laptop file and updated pricing file
const newLaptopFile = multer({
    storage: newLaptopsStore,
    fileFilter: fileFilter,
})

// ! TODO: Fix file not uploading using this configuration. It works on newLaptop file
const pricingFile = multer({ storage: pricingStore, fileFilter: fileFilter })

adminRouter.get('/ranking', verifyToken, rankingSystem)
adminRouter.get('/analytics', verifyToken, cache.route(), analytics)
adminRouter.get('/update-pricing', updatePricing)
adminRouter.get('/bulk-insert', bulkInsert)
adminRouter.post(
    '/upload-new-file',
    newLaptopFile.single('newfile'),
    uploadFile
)
adminRouter.get('/update', updatePricing)
adminRouter.get('/duplicate', /* verifyToken, isAdmin, */ getDuplicates)
adminRouter.post('/create-user', createAdminUser)
adminRouter.post('/upload', pricingFile.single('file'), uploadFile)
export default adminRouter
