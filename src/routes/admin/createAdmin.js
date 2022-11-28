import admin from 'firebase-admin'
import adminList from '../../constants/admin-list'
import Users from '../../models/user'

const createAdminUser = async (req, res) => {
    try {
        const { email, displayName, password } = req.body
        if (adminList.includes(email)) {
            admin
                .auth()
                .createUser({
                    email: email,
                    emailVerified: false,
                    password: password,
                    displayName: displayName,
                })
                .then(async (userRecord) => {
                    let user = Users({
                        email: email,
                        password: password,
                        isAdmin: true,
                        displayName: displayName,
                        firebaseID: userRecord.uid,
                    })

                    await user.save()
                    admin
                        .auth()
                        .setCustomUserClaims(userRecord.uid, { admin: true })
                    return res.send(userRecord)
                })
                .catch((error) => {
                    console.log('Error creating new user:', error)
                })
        } else {
            return res.send('You have no permission to enter this zone')
        }
    } catch (e) {
        throw e
    }
}

export default createAdminUser
