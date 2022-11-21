import Laptop from "../../models/laptop";

const rankingSystem = async (req, res) => {
  const cpu = {
    "Pentium Dual Core": 1,
    "Pentium Silver Core": 1,
    "Pentium Quad Core": 2,
    "Core i3": 3,
    "Core i5": 5,
    "Core i7": 7,
    "Core i9": 10,
    "Celeron Dual Core": 2,
    "Dual Core": 2,
    "Ryzen 3 Dual Core": 3,
    "Ryzen 3 Quad Core": 4,
    "Ryzen 5 Quad Core": 5,
    "Ryzen 5 Hexa Core": 8,
    "Ryzen 7 Hexa Core": 8,
    "Ryzen 7 Octa Core": 10,
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
    3500: 1,
    3450: 1,
    4500: 2,
    4600: 3,
    5500: 5,
    5600: 6,
    5625: 5,
    3020: 2,
    3250: 3,
    4200: 4,
    5200: 4,
    5425: 5,
    3700: 4,
    4700: 4,
    4800: 5,
    5700: 7,
    5800: 8,
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
      total_score = 0;
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
  // TODO: Fix intel cpu generation score count logic: total 168 laptops affected
  res.send(`Invalid Count ${invalid.length}`);
};

export default rankingSystem;
