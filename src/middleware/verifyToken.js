import admin from 'firebase-admin';
import SERVER from '../constants/message';
import STATUS_CODES from '../constants/statusCode';

const verifyToken = async (req, res, next) => {
  if (!req.headers.token) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      message: SERVER.INVALID_TOKEN,
    });
  }

  try {
    // Use firebase-admin auth to verify the token passed in from the client header.
    // This is token is generated from the firebase client
    // Decoding this token returns the userpayload and all the other token claims you added while creating the custom token
    const userPayload = await admin.auth().verifyIdToken(req.headers.token);

    req.user = userPayload;

    next();
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: SERVER.INTERNAL_ERROR,
    });
  }
};

export default verifyToken;
