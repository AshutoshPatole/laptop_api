const cpu = {
    'Athlon Dual Core': 2,
    'Pentium Dual Core': 2,
    'Pentium Silver': 2,
    'Pentium Quad Core': 3,
    'Core i3': 4,
    'Core i5': 6,
    'Core i7': 8,
    'Core i9': 12,
    'Celeron Dual Core': 2,
    'Dual Core': 2,
    'Ryzen 3 Dual Core': 3,
    'Ryzen 3 Quad Core': 4,
    'Ryzen 5 Dual Core': 3,
    'Ryzen 5 Quad Core': 5,
    'Ryzen 5 Hexa Core': 6,
    'Ryzen 7 Dual Core': 4,
    'Ryzen 7 Quad Core': 6,
    'Ryzen 7 Hexa Core': 8,
    'Ryzen 7 Octa Core': 10,
    'Ryzen 9 Octa Core': 12,
}

const generation = {
    6: 2,
    N4500: 1,
    N5030: 1,
    N4020: 1,
    7: 3,
    8: 5,
    9: 6,
    10: 8,
    11: 10,
    12: 12,
    3020: 1,
    3250: 2,
    3450: 2,
    3500: 3,
    3700: 4,
    4200: 4,
    4500: 4,
    4600: 5,
    4700: 5,
    4800: 6,
    5200: 3,
    5300: 4,
    5425: 4,
    5500: 5,
    5600: 6,
    5625: 6,
    5700: 7,
    5800: 8,
    5825: 8,
    5900: 9,
    6600: 10,
    6800: 11,
    6900: 12,
}

const ram = {
    2: 1,
    4: 2,
    6: 4,
    8: 6,
    12: 8,
    16: 10,
    32: 12,
    64: 15,
}

const ram_frequency = {
    900: 0,
    1515: 0,
    1525: 0,
    2133: 1,
    2400: 2,
    2666: 3,
    2933: 3,
    3198: 3,
    3200: 3,
    3733: 3,
    4266: 3,
    4267: 3,
    4268: 3,
    4800: 3,
    5400: 3,
}

const cache = {
    4: 1,
    5: 1,
    6: 2,
    8: 2,
    9: 2,
    10: 3,
    11: 3,
    12: 3,
    16: 4,
    18: 4,
    19: 4,
    20: 5,
    24: 5,
    32: 5,
}

const ram_generation = {
    LPDDR3: 2,
    DDR3: 2,
    LPDDR4: 3,
    LPDDR4X: 3.5,
    DDR4: 4,
    LPDDR5: 4,
    LPDDR5X: 4.5,
    DDR5: 5,
}

const ssd = {
    Yes: 5,
    No: 2,
}

const ssd_capacity = {
    64: 2,
    128: 3,
    256: 6,
    512: 8,
    1024: 9,
    2048: 10,
    '1TB': 10,
    '2TB': 10,
    '1 TB': 10,
    '2 TB': 10,
}

const wifi = {
    'Wi-Fi 6(802.11ax) 2x2': 5,
    'Wi-Fi 6(802.11ax)': 4,
    'Wi-Fi 5(802.11ac) 2x2': 4,
    'Wi-Fi 5(802.11ac)': 3,
    'Wi-Fi (802.11a/b/g/n)': 2.5,
}

const bluetooth = {
    6: 5,
    5.2: 5,
    5.1: 4,
    5: 3,
    4.2: 3,
    4.1: 2,
    4: 2,
}

const screen_size = {
    '39.62 cm (15.6 inch)': 2,
    '35.56 cm (14 inch)': 2,
    '39.62 cm (15.6 Inch)': 2,
    '35.56 cm (14 Inch)': 2,
    '33.78 cm (13.3 inch)': 2,
    '39.62 cm (15.6 inches)': 2,
    '40.64 cm (16 Inch)': 2,
    '43.94 cm (17.3 Inch)': 2,
    '33.78 cm (13.3 Inch)': 2,
    '35.56 cm (14 inches)': 2,
    '40.64 cm (16 inch)': 2,
    '34.04 cm (13.4 Inch)': 2,
    '43.94 cm (17.3 inch)': 2,
    '38.0 cm (14.96 Inch)': 2,
    '40.89 cm (16.1 Inch)': 2,
    '34.04 cm (13.4 inch)': 2,
    '35.81 cm (14.1 inch)': 2,
    '29.46 cm (11.6 Inch)': 2,
    '29.46 cm (11.6 inch)': 2,
    '40.89 cm (16.1 inch)': 2,
    '33.02 cm (13 inch)': 2,
    '35.81 cm (14.1 Inch)': 2,
    '38.1 cm (15 inch)': 2,
    '34.29 cm (13.5 inch)': 2,
    '36.83 cm (14.5 inch)': 2,
    '25.65 cm (10.1 inch)': 2,
    '30.48 cm (12 inch)': 2,
    '33.78 cm (13.3 inches)': 2,
    '34.04 cm (13.4 inches)': 2,
    '35.56 cm (14 Inches)': 2,
    '36.12 cm (14.22 inch)': 2,
    '37.85 cm (14.9 Inch)': 2,
    '38.0 cm (14.96 cm)': 2,
    '38.0 cm (14.96 inch)': 2,
    '38.86 cm (15.3 Inch)': 2,
    '39.62 cm (15.6 mm)': 2,
    '42.16 cm (16.6 inch)': 2,
    '88.9 cm (35 cm)': 2,
}

export {
    cpu,
    generation,
    cache,
    ram,
    ram_frequency,
    ram_generation,
    ssd,
    ssd_capacity,
    wifi,
    bluetooth,
}
