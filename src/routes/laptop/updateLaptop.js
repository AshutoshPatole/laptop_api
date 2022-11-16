/* 
Endpoint for patching a laptop

PATCH: http://localhost:8000/laptop/laptopID
body: {laptop}
*/

import SERVER from "../../constants/message";
import STATUS_CODES from "../../constants/statusCode";
import Laptop from "../../models/laptop";

const updateLaptop = async (req, res) => {
    if (req.params.laptopID == null) {
        return res.json({
            message: "Laptop ID cannot be null"
        });
    }
    const lap = await Laptop.findById(req.params.laptopID);
    if (!lap) return res.status(STATUS_CODES.NOT_FOUND).json({
        message: SERVER.CONTENT_NOT_FOUND
    });

    lap.set({

        img: req.body.img,
        price: req.body.price,
        laptop_name: req.body.laptop_name,
        sales_package: req.body.sales_package,
        model_number: req.body.model_number,
        part_number: req.body.part_number,
        model_name: req.body.model_name,
        color: req.body.color,
        type: req.body.type,
        suitable_for: req.body.suitable_for,
        battery_cell: req.body.battery_cell,
        ms_office_provided: req.body.ms_office_provided,
        processor_brand: req.body.processor_brand,
        processor_name: req.body.processor_name,
        ssd: req.body.ssd,
        ssd_capacity: req.body.ssd_capacity,
        ram: req.body.ram,
        ram_type: req.body.ram_type,
        processor_variant: req.body.processor_variant,
        clock_speed: req.body.clock_speed,
        graphic_processor: req.body.graphic_processor,
        number_of_cores: req.body.number_of_cores,
        os_architecture: req.body.os_architecture,
        operating_system: req.body.operating_system,
        supported_operating_system: req.body.supported_operating_system,
        usb_port: req.body.usb_port,
        hdmi_port: req.body.hdmi_port,
        multi_card_slot: req.body.multi_card_slot,
        touchscreen: req.body.touchscreen,
        screen_size: req.body.screen_size,
        screen_resolution: req.body.screen_resolution,
        screen_type: req.body.screen_size,
        speakers: req.body.speakers,
        internal_mic: req.body.internal_mic,
        wireless_lan: req.body.wireless_lan,
        bluetooth: req.body.bluetooth,
        ethernet: req.body.ethernet,
        dimensions: req.body.dimensions,
        weight: req.body.weight,
        disk_drive: req.body.disk_drive,
        web_camera: req.body.web_camera,
        finger_print_sensor: req.body.finger_print_sensor,
        keyboard: req.body.keyboard,
        backlit_keyboard: req.body.backlit_keyboard,
        pointer_device: req.body.pointer_device,
        included_software: req.body.included_software,
        warranty_summary: req.body.warranty_summary,
        warranty_service_type: req.body.warranty_service_type,
        covered_in_warranty: req.body.covered_in_warranty,
        not_covered_in_warranty: req.body.not_covered_in_warranty,
        domestic_warranty: req.body.domestic_warranty,
    });

    await lap.save();
    res.status(STATUS_CODES.OK).json({
        message: SERVER.CONTENT_MODIFIED_SUCCESSFULLY
    });
};

export default updateLaptop;