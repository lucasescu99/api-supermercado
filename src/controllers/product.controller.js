const productService = require("../services/product.service");
const { generateUuid } = require("../utils/uuid.utils");

class productController {
  static async add(req, res) {
    const callId = generateUuid();
    console.log("Call %s %s id: %s", req.method, req.url, callId);
    const { category, name, stock, description } = req.body;

    if (
      typeof category !== "string" ||
      typeof name !== "string" ||
      typeof stock !== "number" ||
      typeof description !== "string"
    ) {
      return res
        .status(400)
        .send("Required parameter is missing or wrong type");
    }

    try {
      console.log("Call id: %s response: success", callId);
      const result = await productService.add(
        category,
        name,
        stock,
        description
      );

      return res.status(200).send(result);
    } catch (error) {
      console.log("Call id: %s error:%s", callId, error, JSON.stringify(error));
      return res.status(400).send(error);
    }
  }

  static async update(req, res) {
    const callId = generateUuid();
    console.log("Call %s %s id: %s", req.method, req.url, callId);

    const { category, name, sotock, description } = req.body;
    const { id } = req.params;

    if (
      (category && typeof category !== "string") ||
      (name && typeof name !== "string") ||
      (stock && typeof stock !== "number") ||
      (description && typeof description !== "string")
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
      await productService.update(id, category, name, sotock, description);
      return res.status(200).send();
    } catch (error) {
      console.log("Call id: %s error:%s", callId, JSON.stringify(error));
      return res.status(400).send(error);
    }
  }

  static async delete(req, res) {
    const callId = generateUuid();
    console.log("Call %s %s id: %s", req.method, req.url, callId);

    const { id } = req.params;

    try {
      console.log("Call id: %s response: success", callId);
      await productService.delete(id);
      return res.status(200).send();
    } catch (error) {
      console.log("Call id: %s error:%s", callId, JSON.stringify(error));
      return res.status(404).send(error);
    }
  }

  static async get(req, res) {
    const callId = generateUuid();
    console.log("Call %s %s id: %s", req.method, req.url, callId);

    const { id } = req.params;

    try {
      const result = await productService.get(id);
      return res.status(200).send(result);
    } catch (error) {
      console.log("Call id: %s error:%s", callId, JSON.stringify(error));
      return res.status(404).send(error);
    }
  }

  static async getAll(req, res) {
    const callId = generateUuid();
    console.log("Call %s %s id: %s", req.method, req.url, callId);

    try {
      const result = await productService.getAll();
      return res.status(200).send(result);
    } catch (error) {
      console.log("Call id: %s error:%s", callId, JSON.stringify(error));
      return res.status(404).send(error);
    }
  }
}

module.exports = productController;
