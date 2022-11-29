import admin from 'firebase-admin'
import adminList from '../../constants/admin-list'
import Users from '../../models/user'

const createAdminUser = async (req, res) => {
    try {
        const { email, displayName, photoURL, firebaseID } = req.body
        if (adminList.includes(email)) {
            admin.auth().setCustomUserClaims(firebaseID, { admin: true })
            let user = Users({
                email: email,
                displayName: displayName,
                photoURL: photoURL,
                firebaseID: firebaseID,
            })
            await user.save()
            return res.send(user)
        } else {
            return res.send('You have no permission to enter this zone')
        }
    } catch (e) {
        throw e
    }
}

export default createAdminUser
