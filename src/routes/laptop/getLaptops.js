/* 
Endpoint for fetching laptops from db

This endpoint is paginated and offset value is required to fetch next set of documents. By default the value is 1.

This endpoint can also OPTIONALLY take model_number and brand keywords to filter and present the paginated results.

ex: http://localhost:8000/laptop?offset=10&brand=Asus&model=1T5s3GG

*/

import Laptop from "../../models/laptop";
import Url from "url";

const getAllLaptops = async (_req, res) => {
  const queryObject = await Url.parse(_req.url, true).query;

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
      part_number: { $regex: new RegExp(queryObject.part, "i") },  
    })
      .skip(queryObject.offset)
      .limit(10);
    const laptopTotal = await Laptop.find({
      model_number: { $regex: new RegExp(queryObject.model, "i") },
      part_number: { $regex: new RegExp(queryObject.part, "i") },
    }).count(true);
    res.send({ laptops, laptopTotal });
    return;
  }
  const laptops = await Laptop.find({}).skip(queryObject.offset).limit(10);
  const laptopTotal = await Laptop.find({}).count();
  res.send({ laptops, laptopTotal });
};

export default getAllLaptops;
