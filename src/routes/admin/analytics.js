/*
this route is for analytics purposes alone. Not needed to include in the app as of now
*/

import Laptop from '../../models/laptop'

const analytics = async (_req, res) => {
    const total_laptops = await Laptop.find({}).countDocuments()
    let unknown_processor = total_laptops

    const brand_analytics = await Laptop.aggregate([
        { $group: { _id: '$brand_name', count: { $sum: 1 } } },
        { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
    ]).sort({ count: -1 })

    const processors = await Laptop.aggregate([
        { $group: { _id: '$processor_brand', count: { $sum: 1 } } },
        { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
    ]).sort({ count: -1 })

    const processor_analytics = await Laptop.aggregate([
        { $group: { _id: '$processor_name', count: { $sum: 1 } } },
        { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
    ]).sort({ count: -1 })

    for (let i = 0; i < processor_analytics.length; i++) {
        unknown_processor -= processor_analytics[i]['count']
    }
    const unscored_processor_list = await Laptop.aggregate([
        { $project: { _id: 1, laptop_name: 1, price: 1, cpu_score: 1 } },
        { $match: { cpu_score: 0 } },
    ])

    const unscored_memory_list = await Laptop.aggregate([
        { $project: { _id: 1, laptop_name: 1, price: 1, memory_score: 1 } },
        { $match: { cpu_score: 0 } },
    ])
    const unscored_storage_list = await Laptop.aggregate([
        { $project: { _id: 1, laptop_name: 1, price: 1, storage_score: 1 } },
        { $match: { cpu_score: 0 } },
    ])
    const unscored_total_list = await Laptop.aggregate([
        { $project: { _id: 1, laptop_name: 1, price: 1, total_score: 1 } },
        { $match: { cpu_score: 0 } },
    ])
    const unscored_processor_count = unscored_processor_list.length

    res.json({
        total: total_laptops,
        brand_analytics: brand_analytics,
        processors: processors,
        processor_analytics: processor_analytics,
        unknown_processor: unknown_processor,
        unscored_processor_count: unscored_processor_count,
        unscored_memory_list: unscored_memory_list,
        unscored_total_list: unscored_total_list,
        unscored_storage_list: unscored_storage_list,
    })
}

export default analytics
