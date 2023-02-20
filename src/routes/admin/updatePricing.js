/*
Endpoint for bulk updating the laptop price in db.

POST: http://localhost:8000/admin/upload-pricing-file
This requires a *.json file appended in the body and the <input> field type in html should be named as "file"
*/

import readJSONFile from '../../helper/read_json'
import Laptop from '../../models/laptop'
import path from 'path'

const updatePricing = async (req, res) => {
    // Read the newly extracted file with updated pricing.
    const currentDate = new Date().toISOString().slice(0, 10)

    readJSONFile(
        path.join(
            __dirname,
            '../../uploads',
            currentDate + '-updatePricing.json'
        ),
        async function (err, json) {
            if (err) {
                throw err
            }
            let laptopName
            let modelNumber
            let color
            let price

            for (let i = 0; i < json.length; i++) {
                console.log(`Updating ${json[i]['laptopName']}`)
                laptopName = json[i]['laptopName']
                modelNumber = json[i]['modelNumber']
                color = json[i]['color']
                price = json[i]['price']
                // iterate through the list and find if the laptop is present
                await Laptop.findOne({
                    laptopName: laptopName,
                    modelNumber: modelNumber,
                    color: color,
                })
                try {
                    // Update the price field alone
                    await Laptop.updateOne(
                        {
                            laptopName: laptopName,
                            modelNumber: modelNumber,
                            color: color,
                        },
                        { $set: { price: price } }
                    )
                } catch (err) {
                    console.log(err)
                }
            }
            res.json({
                message: 'Price updated',
            })
        }
    )
}
export default updatePricing
