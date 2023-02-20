/*
Admin endpoint for updating score of laptops in bulk

Scores are in src/constants/scores.js

This endpoint fetches all laptops and assigns it score based on its cpu, memory, storage, networking and entertainment properties.
*/

// ! TODO: Portaibility, Graphics sore and Post Sales support is remaining.

import Laptop from '../../models/laptop'
import {
    bluetooth,
    cache,
    cpu,
    generation,
    graphicsCards,
    ram,
    ramFrequency,
    ramGeneration,
    screenResolution,
    screenSize,
    ssd,
    ssdCapacity,
    wifi,
} from '../../constants/scores'

import fs from 'fs'

const rankingSystem = async (_req, res) => {
    // fetch all laptops first
    const laptops = await Laptop.find()

    // iterate through all laptops
    for (let i = 0; i < laptops.length; i++) {
        const brandName = laptops[i]['laptopName'].split(' ')[0]

        if (brandName.toLowerCase() === 'apple') {
            // console.log(`found apple. skipping...`);
            continue
        }

        const cpuTotalScore = cpuScore(laptops[i])
        const memoryTotalScore = memoryScore(laptops[i])
        const storageTotalScore = storageScore(laptops[i])
        const connectivityTotalScore = connectivityScore(laptops[i])
        const multimediaTotalScore = multimediaScore(laptops[i])
        const graphicsTotalScore = graphicsScore(laptops[i])

        const totalScore =
            cpuTotalScore +
            memoryTotalScore +
            storageTotalScore +
            connectivityTotalScore +
            multimediaTotalScore +
            graphicsTotalScore

        // let connective = laptops[i]['graphic_processor']
        // console.log(connective + '=' + mem_type)
        // if (connective !== undefined) {
        //     fs.appendFile('graphics.txt', connective + '\r\n', (err) => {
        //         if (err) {
        //             return console.log(err)
        //         }
        //     })
        // }

        // try to update the doc with new field
        try {
            await Laptop.findByIdAndUpdate(
                laptops[i]['id'],
                {
                    $set: {
                        cpuScore: cpuTotalScore,
                        memoryScore: memoryTotalScore,
                        storageScore: storageTotalScore,
                        totalScore: totalScore,
                        connectivityScore: connectivityTotalScore,
                        multimediaScore: multimediaTotalScore,
                        brandName: brandName,
                        graphicsScore: graphicsTotalScore,
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

const cpuScore = (laptop) => {
    // variables that matches with the keys of cpu and generation map defined in scores.js
    const processorName = laptop['processorName']
    const processorBrand = laptop['processorBrand']
    const processorVariant = laptop['processorVariant']
    let score = 0
    let gen

    // check if generation is undefined cuz few laptops in the db does not have this field
    if (processorVariant !== undefined) {
        // condition cuz Intel and AMD have totally different generations
        // Intel has processor variants as 10..., 11..., 12... or 8... for 10th, 11th, 12th and 8th generation respectively
        // AMD has *3.., *5.. and *7.. for its Ryzen 3, Ryzen 5 and Ryzen 7 etc.

        if (processorBrand == 'Intel') {
            gen = processorVariant.substring(0, 1)
            // if generation first character lies between 6-9 i.e 6th gen to 9th gen then match the key
            if (gen <= 9 && gen >= 6) {
                score = cpu[processorName] + generation[gen]
            } else {
                // else take first 2 characters i.e 10, 11 and 12 and then match the key
                const newGen = processorVariant.substring(0, 2)
                score = cpu[processorName] + generation[newGen]
            }
        } else {
            // Ryzen CPU are easy to find just take first 4 characters and map them
            gen = processorVariant.substring(0, 4)
            score = cpu[processorName] + generation[gen]
        }
    }

    // score on cpu cache
    const cpuCache = laptop['cache']
    if (cpuCache !== undefined) {
        score += cache[cpuCache]
    }

    // If none of the criteria match then score becomes NaN hence check to find
    // and provide default value of processor alone not generation
    if (Number.isNaN(score) || score == undefined) {
        score = cpu[processorName]

        // if processor is also not matched then defaults to zero
        if (Number.isNaN(score) || score == undefined) {
            score = 0
        }
    }

    return score
}

const memoryScore = (laptop) => {
    const ramType = laptop['ramType']
    const ramSize = laptop['ram']
    const ramFreq = laptop['ramFrequency']
    let score = 0

    if (ramType !== undefined) {
        score += ramGeneration[ramType]
    }

    if (ramSize !== undefined) {
        score += ram[ramSize]
    }

    if (ramFreq !== undefined) {
        score += ramFrequency[ramFreq]
    }

    return score
}

const storageScore = (laptop) => {
    let isSSD = laptop['ssd']
    let ssdSize = laptop['ssdCapacity']
    let score = 0

    if (isSSD === undefined && ssdSize === undefined) {
        isSSD = 'No'
        ssdSize = 64
    }
    if (isSSD !== undefined) {
        score += ssd[isSSD]
    }
    if (ssdSize !== undefined) {
        let size
        if (ssdSize.includes('TB')) {
            ssdSize = ssdSize.split('TB')[0]
            size = ssdSize * 1024
        } else {
            size = ssdSize.split('GB')[0]
        }
        score += ssdCapacity[parseInt(size)]
    }

    return score
}

const connectivityScore = (laptop) => {
    let wifiName = laptop['wirelessLan']
    let bluetoothVersion = laptop['bluetooth']
    let score = 0
    if (wifiName !== undefined && bluetoothVersion !== undefined) {
        const w = wifi[wifiName]
        const b = bluetooth[bluetoothVersion]
        if (w === undefined) {
            wifiName = 'Wi-Fi 5(802.11ac)'
        }
        if (b === undefined) {
            bluetoothVersion = '4.2'
        }
        score += wifi[wifiName]
        score += bluetooth[bluetoothVersion]
    }

    return score
}

const multimediaScore = (laptop) => {
    const size = laptop['screenSize']
    const resolution = laptop['screenResolution']
    let score = 0
    if (size !== undefined && resolution !== undefined) {
        const s = screenSize[size]
        const r = screenResolution[resolution]
        if (s !== undefined) {
            score += screenSize[size]
        }
        if (r !== undefined) {
            score += screenResolution[resolution]
        }
    }

    return score
}

const graphicsScore = (laptop) => {
    const graphics = laptop['graphicProcessor'].toLowerCase()
    console.log(graphicsCards[graphics])

    return graphicsCards[graphics] || 0
}

export default rankingSystem
