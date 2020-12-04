const userService = require("../services/user.service");
const { generateUuid } = require("../utils/uuid.utils");
const { checkId } = require("../utils/index")

class userController {
  static async signUp(req, res) {
    const callId = generateUuid();

    console.log("Call %s %s id: %s", req.method, req.url, callId);

    const { email, password, userName, firstName, lastName } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof userName !== "string" ||
      typeof firstName !== "string" ||
      typeof lastName !== "string"
    ) {
      console.log(
        "Call id: %s error:%s",
        callId,
        "Required parameter is missing or wrong type"
      );
      return res.status(400).send();
    }

    try {
      console.log("Call id: %s response: success", callId);
      const result = await userService.signUp(
        email,
        password,
        userName,
        firstName,
        lastName
      );

      return res.status(200).send(result);
    } catch (error) {
      console.log("Call id: %s error:%s", callId, error, JSON.stringify(error));
      const status = error.status;

      if (status === undefined) return res.status(500).send();

      return res.status(status).send(error);
    }
  }

  static async update(req, res) {
    const callId = generateUuid();

    console.log("Call %s %s id: %s", req.method, req.url, callId);

    const { email, userName, firstName, lastName, role } = req.body;
    const { id } = req.params;

    if(!checkId(req)){
      return res.status(404).send("User doesn't exist bruh.");
    }
    console.log("Ojo q pasa!")
    if (
      (email && typeof email !== "string") ||
      (userName && typeof userName !== "string") ||
      (firstName && typeof firstName !== "string") ||
      (lastName && typeof lastName !== "string")
    ) {
      console.log(
        "Call id: %s error:%s",
        callId,
        "Required parameter is missing or wrong type"
      );
      return res.status(400).send();
    }

    try {
      console.log("Call id: %s response: success", callId);
      await userService.update(id, email, userName, firstName, lastName,role);

      return res.status(200).send();
    } catch (error) {
      console.log("Call id: %s error:%s", callId, JSON.stringify(error));
      const status = error.status;

      if (status === undefined) return res.status(500).send();

      return res.status(status).send(error);
    }
  }

  static async delete(req, res) {
    const callId = generateUuid();

    console.log("Call %s %s id: %s", req.method, req.url, callId);
    console.log("Decoded!!!",req.decoded)
    const { id } = req.params;
    if(!checkId(req)){
      return res.status(404).send("User doesn't exist bruh.");
    }
      try {
        console.log("Call id: %s response: success", callId);
        await userService.delete(id);
  
        return res.status(200).send();
      } catch (error) {
        console.log("Call id: %s error:%s", callId, JSON.stringify(error));
        const status = error.status;
  
        if (status === undefined) return res.status(404).send("User doesnt exist");
  
        return res.status(status).send(error);
      }
  }

  static async get(req, res) {
    const callId = generateUuid();

    console.log("Call %s %s id: %s", req.method, req.url, callId);

    const { id } = req.params;

    try {
      const result = await userService.get(id);
      return res.status(200).send(result);
    } catch (error) {
      console.log("Call id: %s error:%s", callId, JSON.stringify(error));
      const status = error.status;

      if (status === undefined) return res.status(404).send();

      return res.status(status).send(error);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const result = await userService.login(email, password);
      console.log(result, "controller result");
      return res.status(200).send({ authentication: result });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}

module.exports = userController;
