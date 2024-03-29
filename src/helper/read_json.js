import fs from 'fs'
function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
        if (err) {
            callback(err)
            return
        }
        try {
            callback(null, JSON.parse(data))
        } catch (exception) {
            callback(exception)
        }
    })
}

export default readJSONFile
