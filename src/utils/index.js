function checkId(req, res) {
  if (!req.body.id) {
    return res.status(404).status("User doesn't exist bruh.");
  }
}

module.exports = {
  checkId
}