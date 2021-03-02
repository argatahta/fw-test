import UserAPI from "../../api/user";

const handler = async (req, res) => {
  const token = req.query.token;
  const page = req.query.page || 1;
  try {
    const loginResult = await UserAPI.getUsersServer(token, page)
    const data = loginResult?.data ?? {}
    res.send(data)
  } catch (error) {
    console.log("SERVER LOGIN ERROR", error)
    const status = error.statusCode || 400
    res.status(status).send(error.err_msg || "Unknown Error")
  }
}

export default handler