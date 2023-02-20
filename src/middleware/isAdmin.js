import STATUS_CODES from '../constants/statusCode'
import Users from '../models/user'

const isAdmin = async (req, res, next) => {
    try {
        const role = await Users.findOne({ firebaseID: req.user.uid })
        if (role['isAdmin'] === req.user.admin) {
            next()
        } else {
            return res.status(STATUS_CODES.FORBIDDEN).json({
                error: {
                    message: 'You are not permitted to access this resource',
                },
            })
        }
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            error: {
                message:
                    'An error occurred while getting user access. Please try again',
            },
        })
    }
}

export default isAdmin
