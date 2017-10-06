let errs = []

validator = () => {
    errs = []
}

validator.prototype.isEmpty = (value, message) => {
    if (value === undefined || !value || value.length == 0) {
        errs.push({ message: message })
    }
}

validator.prototype.minLen = (value, min, message) => {
    if (value === undefined || !value || value.length == 0) {
        errs.push({ message: message })
    }
}