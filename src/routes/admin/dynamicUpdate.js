/* 
Endpoint for bulk updating the laptop price in db.
*/

import readJSONFile from '../../helper/read_json'
import Laptop from '../../models/laptop'

const update = async (_req, res) => {
    // Read the newly extracted file with updated pricing.
    readJSONFile('./csvjson.json', async function (err, json) {
        if (err) {
            throw err
        }

        for (var i = 0; i < json.length; i++) {
            // iterate through the list and find if the laptop is present

            try {
                await Laptop.findByIdAndUpdate(
                    {
                        _id: json[i]['_id'],
                    },
                    {
                        $set: {
                            screen_size: json[i]['screen_size'],
                            screen_resolution: json[i]['screen_resolution'],
                        },
                    }
                )
            } catch (err) {
                console.log(err)
            }
        }
        res.json({
            message: 'updated',
        })
    })
}
export default update
