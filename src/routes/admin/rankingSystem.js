import Laptop from "../../models/laptop";

const rankingSystem = async (req, res) => {
  const cpu = {
    "pentium": 2,
    "Core i3": 3,
    "Core i5": 5,
    "Core i7": 7,
    "Core i9": 10,
    "Dual Core": 2,
    "Ryzen 3 Dual Core": 3,
    "Ryzen 3 Quad Core": 4,
    "Ryzen 5 Quad Core": 5,
    "Ryzen 5 Hexa Core": 8,
    "Ryzen 7 Hexa Core": 8,
    "Ryzen 7 Octa Core": 10,
  };

  const generation = {
    "6": 1,
    "7": 1,
    "8": 2,
    "9": 2,
    "10": 3,
    "11": 4,
    "12": 5,
    "3500": 1,
    "4500": 2,
    "4600": 3,
    "5500": 4,
    "5600": 5,
    "3020": 1,
    "3250": 1,
    "4200": 3,
    "5200": 4,
    "5425": 5,
    "3700": 1,
    "4700": 2,
    "4800": 3,
    "5700": 4,
    "5800": 5,
  };
//   console.log(generation["12"])

  var laptops = await Laptop.find({});
  var invalid = []
  for (var i = 0; i < laptops.length; i++) {

    var cpu_name = laptops[i]["processor_name"];
    var cpu_brand = laptops[i]["processor_brand"];
    var cpu_generation = laptops[i]["processor_variant"];
    var total_score = 0;
    var gen;

    if (cpu_generation !== undefined) {
      if (cpu_brand == "Intel") {
        gen = cpu_generation.substring(0, 2);
        total_score = cpu[cpu_name] + generation[gen];
      } else {
        gen = cpu_generation.substring(0, 4);
        total_score = cpu[cpu_name] + generation[gen];
      }
    }

    if(Number.isNaN(total_score) || total_score == undefined){
        invalid.push("invalid")
        console.log(`score NAN: ${laptops[i]['_id']}`);
        total_score = 0;
    }

    // console.log(total_score);
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

  res.send(invalid.length);
};

export default rankingSystem;
