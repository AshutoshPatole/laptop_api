import Laptop from '../../models/laptop'
import fs from 'fs'

const dataeGenerator = async (req, res) => {
    const laptops = await Laptop.find().limit(50)

    for (let i = 0; i < laptops.length; i++) {
        const cpu_name = laptops[i]['processor_name']
        const cpu_generation = laptops[i]['processor_variant']
        const cpu_clock_speed = laptops[i]['clock_speed']
        const cache = laptops[i]['cache']
        const ram_type = laptops[i]['ram_type']
        const ram_size = laptops[i]['ram']
        const ram_freq = laptops[i]['ram_frequency']

        const data = {
            cpuName: cpu_name,
            cpuGeneration: cpu_generation,
            clockSpeed: cpu_clock_speed,
            cacheSize: cache,
            ramSize: ram_size,
            ramType: ram_type,
            ramFrequency: ram_freq,
        }
        const jsonData = JSON.stringify(data)
        fs.appendFile('data.json', jsonData, (err) => {
            if (err) {
                return console.log(err)
            }
        })
    }
    return res.send('Data genrated')
}

export default dataeGenerator
