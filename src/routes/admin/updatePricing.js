/* 
Endpoint for bulk updating the laptop price in db.
*/

import readJSONFile from '../../helper/read_json'
import Laptop from '../../models/laptop'

const updatePricing = async (req, res) => {
    // Read the newly extracted file with updated pricing.
    readJSONFile('./2022-11-15-page0.json', async function (err, json) {
        if (err) {
            throw err
        }
        var laptop_name
        var model_number
        var color
        var price

        for (var i = 0; i < json.length; i++) {
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
    })
}
export default updatePricing
