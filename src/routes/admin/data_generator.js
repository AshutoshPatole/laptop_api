import Laptop from '../../models/laptop'
import fs from 'fs'

const dataeGenerator = async (req, res) => {
    let laptops = await Laptop.find().limit(50)

    for (let i = 0; i < laptops.length; i++) {
        let cpu_name = laptops[i]['processor_name']
        let cpu_generation = laptops[i]['processor_variant']
        let cpu_clock_speed = laptops[i]['clock_speed']
        let cache = laptops[i]['cache']
        let ram_type = laptops[i]['ram_type']
        let ram_size = laptops[i]['ram']
        let ram_freq = laptops[i]['ram_frequency']

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
