import UserAPI from "../../api/user";

const handler = async (req, res) => {
  const token = req.query.token;
  const payload = JSON.parse(req.query.payload);
payload.theme = "#"+payload.theme 
  try {
    const loginResult = await UserAPI.createUserServer(token, payload)
    const data = loginResult?.data ?? {}
    res.send(data)
  } catch (error) {
    console.log("SERVER LOGIN ERROR", error)
    const status = error.statusCode || 400
    res.status(status).send(error.err_msg || "Unknown Error")
  }
}

export default handler
