import STATUS_CODE from '../../constants/statusCode'
import Joi from 'joi'

const laptopValidate = (req, res, next) => {
    const lapSchema = Joi.object({
        img: Joi.string().required(),
        price: Joi.number().required(),
        laptop_name: Joi.string().required(),
        sales_package: Joi.string().required(),
        model_number: Joi.string().required(),
        part_number: Joi.string().required(),
        model_name: Joi.string().required(),
        color: Joi.string().required(),
        type: Joi.string().required(),
        suitable_for: Joi.string().required(),
        battery_cell: Joi.string().required(),
        ms_office_provided: Joi.string().required(),
        processor_brand: Joi.string().required(),
        processor_name: Joi.string().required(),
        ssd: Joi.string().required(),
        ssd_capacity: Joi.string().required(),
        ram: Joi.string().required(),
        ram_type: Joi.string().required(),
        processor_variant: Joi.string().required(),
        clock_speed: Joi.string().required(),
        graphic_processor: Joi.string().required(),
        number_of_cores: Joi.string().required(),
        os_architecture: Joi.string().required(),
        operating_system: Joi.string().required(),
        supported_operating_system: Joi.string().required(),
        usb_port: Joi.string().required(),
        hdmi_port: Joi.string().required(),
        multi_card_slot: Joi.string().required(),
        touchscreen: Joi.string().required(),
        screen_size: Joi.string().required(),
        screen_resolution: Joi.string().required(),
        screen_type: Joi.string().required(),
        speakers: Joi.string().required(),
        internal_mic: Joi.string().required(),
        wireless_lan: Joi.string().required(),
        bluetooth: Joi.string().required(),
        ethernet: Joi.string().required(),
        dimensions: Joi.string().required(),
        weight: Joi.string().required(),
        disk_drive: Joi.string().required(),
        web_camera: Joi.string().required(),
        finger_print_sensor: Joi.string().required(),
        keyboard: Joi.string().required(),
        backlit_keyboard: Joi.string().required(),
        pointer_device: Joi.string().required(),
        included_software: Joi.string().required(),
        warranty_summary: Joi.string().required(),
        warranty_service_type: Joi.string().required(),
        covered_in_warranty: Joi.string().required(),
        not_covered_in_warranty: Joi.string().required(),
        domestic_warranty: Joi.string().required(),
    })

    const { error, value } = lapSchema.validate(req.body)
    console.log(req.body)
    if (error) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
            message: error.details[0].message,
        })
    }
    req.body = value
    next()
}

export default laptopValidate
