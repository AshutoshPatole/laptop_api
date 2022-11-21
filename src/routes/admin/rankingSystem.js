import Laptop from "../../models/laptop";
import { cpu, generation } from "../../constants/scores";

const rankingSystem = async (req, res) => {
  var laptops = await Laptop.find({});
  var invalid = [];
  for (var i = 0; i < laptops.length; i++) {
    var cpu_name = laptops[i]["processor_name"];
    var cpu_brand = laptops[i]["processor_brand"];
    var cpu_generation = laptops[i]["processor_variant"];
    var total_score = 0;
    var gen;

    if (cpu_generation !== undefined) {
      if (cpu_brand == "Intel") {
        gen = cpu_generation.substring(0, 1);
        if (gen <= 9 && gen >= 6) {
          total_score = cpu[cpu_name] + generation[gen];
        } else {
          var new_gen = cpu_generation.substring(0, 2);
          total_score = cpu[cpu_name] + generation[new_gen];
        }
      } else {
        gen = cpu_generation.substring(0, 4);
        total_score = cpu[cpu_name] + generation[gen];
      }
    }

    if (Number.isNaN(total_score) || total_score == undefined) {
      invalid.push("invalid");
      console.log(`score NAN: ${laptops[i]["_id"]}`);
      total_score = cpu[cpu_name];
    }

    try {
      await Laptop.findByIdAndUpdate(
        laptops[i]["id"],
        {
          $set: { cpu_score: total_score },
        },
        { new: true }
      );
    } catch (e) {
      throw e;
    }
  }
  // TODO: Fix intel cpu generation score count logic: total 115 laptops affected
  res.send(`Invalid Count ${invalid.length}`);
};

export default rankingSystem;
