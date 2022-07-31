let config = {
    'ime': {
        required: true,
        min_length: 3,
        max_length: 50
    },
    'prezime': {
        required: true,
        min_length: 3,
        max_length: 50
    },
    'telefon': {
        phone: true,
        required: true,
        min_length: 9,
        max_length: 13
    },
    'email': {
        email: true,
        required: true,
        min_length: 5,
        max_length: 50
    },
    'ulica': {
        required: true,
        min_length: 3,
        max_length: 50
    },
    'brojUlice': {
        required: true,
        min_length: 1,
        max_length: 10
    },
    'sprat': {
        min_length: 1,
        max_length: 10
    },
    'stan': {
        min_length: 1,
        max_length: 25
    },
    'grad': {
        required: true,
        min_length: 3,
        max_length: 25
    },
    'postanskiBroj': {
        zip: true,
        required: true,
        min_length: 1,
        max_length: 5
    }
}

let validator = new Validator(config);