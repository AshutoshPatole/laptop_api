/* 
Endpoint for filtering laptops by min and max price
*/

import Laptop from "../../models/laptop";

const filterByPrice = async (req, res) => {
  const { min, max } = req.query;
  var laptop;
  if (min == undefined && max == undefined) {
    return res.send("Price range is required (min or max)");
  }
  if (min == undefined) {
    laptop = await Laptop.find({ price: { $lt: max } });
  }
  else if (max == undefined) {
    laptop = await Laptop.find({ price: { $gt: min } });
  } else {
    laptop = await Laptop.find({ price: { $lt: max, $gt: min } });
  }
  return res.send(laptop);
};

export default filterByPrice;
