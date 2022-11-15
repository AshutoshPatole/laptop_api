import readJSONFile from "../../helper/read_json";
import Laptop from "../../models/laptop";

const bulkInsert = async (req, res) => {
  readJSONFile("./2022-11-15-page21.json", async (err, json) => {
    if (err) {
      throw err;
    }

    for (var i = 0; i < json.length; i++) {
      var model_number = json[i]["model_number"];
      var part_number = json[i]["part_number"];
      var color = json[i]["color"];
      var isDupFound = await Laptop.find({
        model_number: model_number,
        part_number: part_number,
        color: color,
      }).count();
      if (isDupFound >= 1) {
        console.log(`${model_number} was found more than ${isDupFound} times`);
      } else {
        try {
          var new_lap = await Laptop(json[i]);
          new_lap.save()
        } catch (e) {
          throw e;
        }
      }
    }
    return res.send("Bulk upload complete");
  });
};

export default bulkInsert;
