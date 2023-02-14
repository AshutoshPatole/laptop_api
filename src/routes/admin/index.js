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
import { storage, fileFilter } from '../../helper/multer_config'
import uploadFile from './fileUpload'

const adminRouter = Router()

const upload = multer({ storage: storage, fileFilter: fileFilter })

adminRouter.get('/ranking', verifyToken, rankingSystem)
adminRouter.get('/analytics', verifyToken, cache.route(), analytics)
adminRouter.get('/update-pricing', updatePricing)
adminRouter.get('/bulk-insert', bulkInsert)
adminRouter.get('/update', updatePricing)
adminRouter.get('/duplicate', /* verifyToken, isAdmin, */ getDuplicates)
adminRouter.post('/create-user', createAdminUser)
adminRouter.post('/upload', upload.single('file'), uploadFile)
export default adminRouter
