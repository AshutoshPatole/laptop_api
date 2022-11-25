/* 
Endpoint for fetching laptops from db

This endpoint is paginated and offset value is required to fetch next set of documents. By default the value is 1.

This endpoint can also OPTIONALLY take model_number and brand keywords to filter and present the paginated results.

ex: http://localhost:8000/laptop?offset=10&brand=Asus&model=1T5s3GG

*/

import Laptop from "../../models/laptop";
import Url from "url";

const getAllLaptops = async (_req, res) => {
  const queryObject = Url.parse(_req.url, true).query;
  const LAPTOP_LIMIT = 20;

  if (queryObject.brand != undefined) {
    const laptops = await Laptop.find({
      laptop_name: { $regex: new RegExp(queryObject.brand, "i") },
    })
      .skip(queryObject.offset)
      .limit(LAPTOP_LIMIT);
    res.send(laptops);
    return;
  }
  if (queryObject.model != undefined) {
    const laptops = await Laptop.find({
      model_number: { $regex: new RegExp(queryObject.model, "i") },
      part_number: { $regex: new RegExp(queryObject.part, "i") },
    })
      .skip(queryObject.offset)
      .limit(LAPTOP_LIMIT);
    res.send(laptops);
    return;
  }
  const laptops = await Laptop.find({})
    .skip(queryObject.offset)
    .limit(LAPTOP_LIMIT);
  res.send(laptops);
};

export default getAllLaptops;
