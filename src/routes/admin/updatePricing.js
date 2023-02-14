/* 
Endpoint for bulk updating the laptop price in db.
*/

import readJSONFile from '../../helper/read_json'
import Laptop from '../../models/laptop'
import path from 'path'

const updatePricing = async (req, res) => {
    // Read the newly extracted file with updated pricing.
    const currentDate = new Date().toISOString().slice(0, 10)

    readJSONFile(
        path.join(__dirname, '../../uploads', currentDate + '.json'),
        async function (err, json) {
            if (err) {
                throw err
            }
            let laptop_name
            let model_number
            let color
            let price

            for (let i = 0; i < json.length; i++) {
                console.log(`Updating ${json[i]['laptop_name']}`)
                laptop_name = json[i]['laptop_name']
                model_number = json[i]['model_number']
                color = json[i]['color']
                price = json[i]['price']
                // iterate through the list and find if the laptop is present
                await Laptop.findOne({
                    laptop_name: laptop_name,
                    model_number: model_number,
                    color: color,
                })
                try {
                    // Update the price field alone
                    await Laptop.updateOne(
                        {
                            laptop_name: laptop_name,
                            model_number: model_number,
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
