import Laptop from "../../models/laptop";

const rankingSystem = async (req, res) => {
  const cpu = {
    "Pentium Dual Core": 1,
    "Pentium Silver": 1,
    "Pentium Quad Core": 2,
    "Core i3": 4,
    "Core i5": 6,
    "Core i7": 8,
    "Core i9": 12,
    "Celeron Dual Core": 2,
    "Dual Core": 2,
    "Ryzen 3 Dual Core": 3,
    "Ryzen 3 Quad Core": 4,
    "Ryzen 5 Dual Core": 3,
    "Ryzen 5 Quad Core": 5,
    "Ryzen 5 Hexa Core": 6,
    "Ryzen 7 Dual Core": 4,
    "Ryzen 7 Quad Core": 6,
    "Ryzen 7 Hexa Core": 8,
    "Ryzen 7 Octa Core": 10,
    "Ryzen 9 Octa Core": 12,
  };

  const generation = {
    6: 1,
    "N4500": 1,
    "N5030": 1,
    "N4020": 1,
    7: 2,
    8: 4,
    9: 4,
    10: 6,
    11: 8,
    12: 10,
    3020: 1,
    3250: 2,
    3450: 2,
    3500: 3,
    3700: 4,
    4200: 4,
    4500: 4,
    4600: 5,
    4700: 5,
    4800: 6,
    5200: 3,
    5300: 4,
    5425: 4,
    5500: 5,
    5600: 6,
    5625: 6,
    5700: 7,
    5800: 8,
    5825: 8,
    5900: 9,
    6600: 10,
    6800: 11,
    6900: 12
  };
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
