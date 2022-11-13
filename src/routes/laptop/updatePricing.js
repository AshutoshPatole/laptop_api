import readJSONFile from "../../helper/read_json";
import Laptop from "../../models/laptop";

const updatePricing = async (req, res) => {
  readJSONFile("./page.json", async function (err, json) {
    if (err) {
      throw err;
    }
    var laptop_name;
    var model_number;
    var color;
    var price;

    for (var i = 0; i < json.length; i++) {
      console.log(`Updating ${json[i]["laptop_name"]}`);
      laptop_name = json[i]["laptop_name"];
      model_number = json[i]["model_number"];
      color = json[i]["color"];
      price = json[i]['price'];

      await Laptop.findOne({
        laptop_name: laptop_name,
        model_number: model_number,
        color: color,
      });
      try {
        await Laptop.updateOne(
          {
            laptop_name: laptop_name,
            model_number: model_number,
            color: color,
          },
          { $set: { price: price } }
        );
      } catch (err) {
        console.log(err);
      }
    }
    console.log("Updated");

    res.json({
      msg: "updated",
    });
  });
};
export default updatePricing;
