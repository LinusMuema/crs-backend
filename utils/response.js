exports.error = (res, code, err) => res.status(code).json({message: err})
