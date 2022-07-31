let config = {
    'ime_prezime': {
        required: true,
        min_length: 3,
        max_length: 50
    },
    'korisnicko_ime': {
        required: true,
        min_length: 3,
        max_length: 50
    },
    'email': {
        email: true,
        required: true,
        min_length: 5,
        max_length:50
    },
    'broj_telefona': {
        phone: true,
        min_length: 9,
        max_length: 13
    },
    'zip_kod': {
        zip: true,
        min_length: 1,
        max_length: 5
    },
    'lozinka': {
        required: true,
        min_length: 8,
        max_length: 25,
        matching: 'ponovi_lozinku'
    },
    'ponovi_lozinku': {
        required: true,
        min_length: 8,
        max_length: 25,
        matching: 'lozinka'
    }
}

let validator = new Validator(config);