import STATUS_CODES from '../constants/statusCode'

const isAuthorized = async (req, res, next) => {
    if (req.user) {
        next()
    } else {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            error: {
                message:
                    'You are not authorised to perform this action. SignUp/Login to continue',
            },
        })
    }
}

export default isAuthorized
