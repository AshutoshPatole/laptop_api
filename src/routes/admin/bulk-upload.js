/*
Endpoint to insert bulk laptop json file to the database

WIP: HOLD this endpoint since it is not working as expected
*/

import readJSONFile from '../../helper/read_json'
import Laptop from '../../models/laptop'

const bulkInsert = async (_req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10)
    readJSONFile(
        path.join(
            __dirname,
            '../../uploads/new',
            currentDate + '-newLaptops.json'
        ),
        async (err, json) => {
            if (err) {
                throw err
            }
            //  Read all laptops one by one from the json
            for (let i = 0; i < json.length; i++) {
                const model_number = json[i]['model_number']
                const part_number = json[i]['part_number']
                const color = json[i]['color']
                let invalid_laptops = 0
                // find if a laptop is already present in the db with same model_number, part_numer and color
                // and get the count
                const isDupFound = await Laptop.find({
                    model_number: model_number,
                    part_number: part_number,
                    color: color,
                }).count()
                // if count is > 1 then just print
                if (isDupFound >= 1) {
                    // console.log(`${model_number} was found more than ${isDupFound} times`);
                    invalid_laptops += 1
                } else {
                    // if laptop does not exists then save it in db
                    try {
                        const new_lap = await Laptop(json[i])
                        new_lap.save()
                    } catch (e) {
                        throw e
                    }
                }
            }
            return res.json({
                message: 'All laptops uploaded',
                total_count: json.length,
                invalid_count: invalid_laptops,
            })
        }
    )
}

export default bulkInsert
