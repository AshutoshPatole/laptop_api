/* 
Admin endpoint for updating score of laptops in bulk

Scores are in src/constants/scores.js

This endpoint fetches all laptops and assigns it score based on its cpu, memory, storage, networking and entertainment properties.

WIP: Only CPU is scored as of now.

*/

import Laptop from "../../models/laptop";
import { cache, cpu, generation } from "../../constants/scores";

const rankingSystem = async (req, res) => {
  // fetch all laptops first
  var laptops = await Laptop.find({});

  // iterate through all laptops
  for (var i = 0; i < laptops.length; i++) {

    // variables that matches with the keys of cpu and generation map defined in scores.js
    var cpu_name = laptops[i]["processor_name"];
    var cpu_brand = laptops[i]["processor_brand"];
    var cpu_generation = laptops[i]["processor_variant"];
    var total_score = 0;
    var gen;

    // check if generation is undefined cuz few laptops in the db does not have this field
    if (cpu_generation !== undefined) {

      // condition cuz Intel and AMD have totally different generations
      // Intel has processor variants as 10..., 11..., 12... or 8... for 10th, 11th, 12th and 8th generation respectively
      // AMD has *3.., *5.. and *7.. for its Ryzen 3, Ryzen 5 and Ryzen 7 etc.

      if (cpu_brand == "Intel") {
        gen = cpu_generation.substring(0, 1);
        // if generation first character lies between 6-9 i.e 6th gen to 9th gen then match the key
        if (gen <= 9 && gen >= 6) {
          total_score = cpu[cpu_name] + generation[gen];
        } else {
          // else take first 2 characters i.e 10, 11 and 12 and then match the key
          var new_gen = cpu_generation.substring(0, 2);
          total_score = cpu[cpu_name] + generation[new_gen];
        }
      } else {
        // Ryzen CPU are easy to find just take first 4 characters and map them
        gen = cpu_generation.substring(0, 4);
        total_score = cpu[cpu_name] + generation[gen];
      }
    }

    // score on cpu cache
    var cpu_cache = laptops[i]['cache'];
    if(cpu_cache !== undefined){
      total_score += cache[cpu_cache]
    }

    // If none of the criteria match then total_score becomes NaN hence check to find
    // and provide default value of processor alone not generation
    if (Number.isNaN(total_score) || total_score == undefined) {
      total_score = cpu[cpu_name];
    }


    // try to update the doc with new field
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
  return res.json({
    "msg": "Updated"
  })
};

export default rankingSystem;
