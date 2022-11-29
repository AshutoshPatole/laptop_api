import admin from 'firebase-admin'
import adminList from '../../constants/admin-list'
import STATUS_CODES from '../../constants/statusCode'
import Users from '../../models/user'

const createAdminUser = async (req, res) => {
    try {
        const { email, displayName, photoURL, firebaseID } = req.body
        if (adminList.includes(email)) {
            admin.auth().setCustomUserClaims(firebaseID, { admin: true })
            let u = await Users.findOne({ email: email })
            if (u) {
                return res.status(STATUS_CODES.OK).json({
                    message: 'User already exists',
                })
            }
            let user = Users({
                email: email,
                displayName: displayName,
                photoURL: photoURL,
                firebaseID: firebaseID,
                isAdmin: true,
            })
            await user.save()
            return res.status(STATUS_CODES.CREATED).json({
                message: 'User created',
            })
        } else {
            return res.send('You have no permission to enter this zone')
        }
    } catch (e) {
        throw e
    }
}

export default createAdminUser
