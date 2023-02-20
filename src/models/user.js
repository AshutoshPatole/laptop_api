import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
            required: false,
            default: 'NA',
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        firebaseID: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const Users = mongoose.model('users', userSchema)

export default Users
