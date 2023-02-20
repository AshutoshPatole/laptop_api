import STATUS_CODES from '../../constants/statusCode';
import Users from '../../models/user';

const createUser = async (req, res) => {
  let user = await Users.findOne({_id: req.body.id});
  if (user) {
    return res.status(STATUS_CODES.BAD_REQUEST).send('User exists');
  }
  user = new Users({
    name: req.body.name,
    email: req.body.email,
    profile: req.body.profile,
    isAdmin: false,
    _id: req.body.id,
  });
  try {
    await user.save();
    return res.status(STATUS_CODES.CREATED).send(user);
  } catch (e) {
    console.log(e);
    return res.status(STATUS_CODES.BAD_REQUEST).send('Error creating user.');
  }
};

export default createUser;
