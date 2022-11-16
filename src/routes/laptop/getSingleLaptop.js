/* 
Endpoint for getting single laptop from db

ex: GET: http://localhost:8000/laptop/laptopID
*/

import Laptop from "../../models/laptop"

const fetchSingleLaptop = async (req, res) => {
    try {
        let laptopID = req.params.laptopID;
        const existingLaptop = await Laptop.findById(laptopID);
        return res.send(existingLaptop);
    }
    catch (e) {
        return res.json({
            message: "Could not find laptop error"
        });
    }
};
export default fetchSingleLaptop;