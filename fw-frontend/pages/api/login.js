import UserAPI from "../../api/user";
// import cookies from 'utils/cookies';

const handler = async (req, res) => {
  const password = req.query.password;
  const email = req.query.email;
  try {
    const loginResult = await UserAPI.serverLogin({email, password})
    const data = loginResult?.data ?? {}
    res.send(data)
  } catch (error) {
    console.log("SERVER LOGIN ERROR", error)
    const status = error.statusCode || 400
    res.status(status).send(error.err_msg || "Unknown Error")
  }
}

export default handler
