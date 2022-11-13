import Laptop from "../../models/laptop";

const getDuplicates = async (_req, res) => {
  const laptops = await Laptop.aggregate([
    { $group: { _id:{ model_number: "$model_number", laptop_name: "$laptop_name", part_number: "$part_number", processor_name: "$processor_name", price: "$price" }, count: { $sum: 1 } } },
    { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
  ]).sort({"count": -1});
  res.send(laptops);
};

export default getDuplicates;
