function checkId(req) {
  if (req.decoded.data != req.params.id) {
    return false
  }
  return true
}

module.exports = {
  checkId
}