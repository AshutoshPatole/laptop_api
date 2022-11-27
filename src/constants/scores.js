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
