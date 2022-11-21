/* 
Endpoint for fetching laptops based on :
- laptop name
- processor name
-  price

sort by less price first
*/

import Laptop from "../../models/laptop";

const filterBySpec = async (req, res) => {
  const { brand, processor, price } = req.query;
  if (brand == undefined && processor == undefined && price == undefined) {
    return res.send("Required brand, processor and price query");
  }
  try {
    var laptops = await Laptop.find({
      laptop_name: { $regex: brand, $options: "i" },
      processor_name: { $regex: processor, $options: "i" },
      price: { $lte: price },
    }).sort({ price: 1 });
    return res.send(laptops);
  } catch (e) {
    return res.send("Could not filter laptops.");
  }
};

export default filterBySpec;
