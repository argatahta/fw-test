import UserAPI from "../../api/user";

const handler = async (req, res) => {
  const token = req.query.token;
  const payload = JSON.parse(req.query.payload);
  try {
    const deleted = await UserAPI.deleteUserServer(token, payload)
    const data = deleted?.data ?? {}
    res.send(data)
  } catch (error) {
    console.log("SERVER LOGIN ERROR", error)
    const status = error.statusCode || 400
    res.status(status).send(error.err_msg || "Unknown Error")
  }
}

export default handler
