import Laptop from "../../models/laptop";
import Url from "url";

const getAllLaptops = async (_req, res) => {
  const queryObject = await Url.parse(_req.url, true).query;
  console.log(queryObject.offset);

  if (queryObject.brand != undefined) {
    const laptops = await Laptop.find({
      laptop_name: { $regex: new RegExp(queryObject.brand, "i") },
    })
      .skip(queryObject.offset)
      .limit(10);
    const LaptopTotal = await Laptop.find({
      laptop_name: { $regex: new RegExp(queryObject.brand, "i") },
    }).count(true);
    res.send({ laptops, LaptopTotal });
    return;
  }
  if (queryObject.model != undefined) {
    const laptops = await Laptop.find({
      model_number: { $regex: new RegExp(queryObject.model, "i") },
    })
      .skip(queryObject.offset)
      .limit(10);
    const LaptopTotal = await Laptop.find({
      model_number: { $regex: new RegExp(queryObject.model, "i") },
    }).count(true);
    res.send({ laptops, LaptopTotal });
    return;
  }
  const laptops = await Laptop.find({}).skip(queryObject.offset).limit(10);
  const LaptopTotal = await Laptop.find({}).count();
  res.send({ laptops, LaptopTotal });
};

export default getAllLaptops;
