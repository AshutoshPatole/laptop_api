/* 
Admin endpoint for updating score of laptops in bulk

Scores are in src/constants/scores.js

This endpoint fetches all laptops and assigns it score based on its cpu, memory, storage, networking and entertainment properties.

WIP: Only CPU, RAM and Storage is scored as of now.
    TODO: Connectivity, Multimedia, Portaibility and Post Sales support is remaining.

*/

import Laptop from '../../models/laptop'
import {
    cache,
    cpu,
    generation,
    ram,
    ram_frequency,
    ram_generation,
    ssd,
    ssd_capacity,
} from '../../constants/scores'

const rankingSystem = async (_req, res) => {
    // fetch all laptops first
    var laptops = await Laptop.find()

    // iterate through all laptops
    for (var i = 0; i < laptops.length; i++) {
        var brand_name = laptops[i]['laptop_name'].split(' ')[0]

        if (brand_name.toLowerCase() === 'apple') {
            // console.log(`found apple. skipping...`);
            continue
        }

        var cpu_total_score = cpu_score(laptops[i])
        var memory_total_score = memory_score(laptops[i])
        var storage_total_score = storage_score(laptops[i])

        var total_score =
            cpu_total_score + memory_total_score + storage_total_score
        // console.log(laptops[i]['_id']);
        // console.log(`cpu: ${cpu_total_score}\nmemory: ${memory_total_score}\nstorage: ${storage_total_score}\ntotal: ${total_score}`);

        // try to update the doc with new field
        try {
            await Laptop.findByIdAndUpdate(
                laptops[i]['id'],
                {
                    $set: {
                        cpu_score: cpu_total_score,
                        memory_score: memory_total_score,
                        storage_score: storage_total_score,
                        total_score: total_score,
                        brand_name: brand_name,
                    },
                },
                { new: true }
            )
        } catch (e) {
            throw e
        }
    }
    return res.json({
        message: 'Scores Updated',
    })
}

const cpu_score = (laptop) => {
    // variables that matches with the keys of cpu and generation map defined in scores.js
    var cpu_name = laptop['processor_name']
    var cpu_brand = laptop['processor_brand']
    var cpu_generation = laptop['processor_variant']
    var score = 0
    var gen

    // check if generation is undefined cuz few laptops in the db does not have this field
    if (cpu_generation !== undefined) {
        // condition cuz Intel and AMD have totally different generations
        // Intel has processor variants as 10..., 11..., 12... or 8... for 10th, 11th, 12th and 8th generation respectively
        // AMD has *3.., *5.. and *7.. for its Ryzen 3, Ryzen 5 and Ryzen 7 etc.

        if (cpu_brand == 'Intel') {
            gen = cpu_generation.substring(0, 1)
            // if generation first character lies between 6-9 i.e 6th gen to 9th gen then match the key
            if (gen <= 9 && gen >= 6) {
                score = cpu[cpu_name] + generation[gen]
            } else {
                // else take first 2 characters i.e 10, 11 and 12 and then match the key
                var new_gen = cpu_generation.substring(0, 2)
                score = cpu[cpu_name] + generation[new_gen]
            }
        } else {
            // Ryzen CPU are easy to find just take first 4 characters and map them
            gen = cpu_generation.substring(0, 4)
            score = cpu[cpu_name] + generation[gen]
        }
    }

    // score on cpu cache
    var cpu_cache = laptop['cache']
    if (cpu_cache !== undefined) {
        score += cache[cpu_cache]
    }

    // If none of the criteria match then score becomes NaN hence check to find
    // and provide default value of processor alone not generation
    if (Number.isNaN(score) || score == undefined) {
        score = cpu[cpu_name]

        // if processor is also not matched then defaults to zero
        if (Number.isNaN(score) || score == undefined) {
            score = 0
        }
    }

    return score
}

const memory_score = (laptop) => {
    var ram_type = laptop['ram_type']
    var ram_size = laptop['ram']
    var ram_freq = laptop['ram_frequency']
    var score = 0

    if (ram_type !== undefined) {
        score += ram_generation[ram_type]
    }

    if (ram_size !== undefined) {
        score += ram[ram_size]
    }

    if (ram_freq !== undefined) {
        score += ram_frequency[ram_freq]
    }

    return score
}

const storage_score = (laptop) => {
    var isSSD = laptop['ssd']
    var ssd_size = laptop['ssd_capacity']
    var score = 0

    if (isSSD === undefined && ssd_size === undefined) {
        isSSD = 'No'
        ssd_size = 64
    }
    if (isSSD !== undefined) {
        score += ssd[isSSD]
    }
    if (ssd_size !== undefined) {
        var size
        if (ssd_size.includes('TB')) {
            ssd_size = ssd_size.split('TB')[0]
            size = ssd_size * 1024
        } else {
            size = ssd_size.split('GB')[0]
        }
        score += ssd_capacity[parseInt(size)]
    }

    return score
}

export default rankingSystem
