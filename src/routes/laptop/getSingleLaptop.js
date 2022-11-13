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