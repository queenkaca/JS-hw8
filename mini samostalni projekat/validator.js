class Validator {
    constructor(config) {
        this.elementsConfig = config;
        this.errors = {};

        this.generateErrorsObject();
        this.inputListener();
    }

    generateErrorsObject() {
        for(let field in this.elementsConfig){
            this.errors[field] = [];
        }
    }

    inputListener() {
        let inputSelector = this.elementsConfig;
        for(let field in inputSelector) {
            let el = document.querySelector(`input[name="${field}"]`);
            el.addEventListener('input', this.validate.bind(this));
        }
    }

    validate(e) {
        let elFields = this.elementsConfig;
        let field = e.target;
        let fieldName = field.getAttribute('name');
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if(elFields[fieldName].required) {
            if(fieldValue === '') {
                this.errors[fieldName].push('Polje je prazno.');
            }
        }

        if(elFields[fieldName].phone) {
            if(!this.phoneValidation(fieldValue)) {
                this.errors[fieldName].push('Neispravan broj telefona.');
            }
        }

        if(elFields[fieldName].email) {
            if(!this.emailValidation(fieldValue)) {
                this.errors[fieldName].push('Neispravna email adresa.');
            }
        }

        if(elFields[fieldName].zip) {
            if(!this.zipValidation(fieldValue)) {
                this.errors[fieldName].push('Neispravan postanski broj.');
            }
        }

        if(fieldValue.length < elFields[fieldName].min_length || fieldValue.length > elFields[fieldName].max_length) {
            this.errors[fieldName].push(`Broj karaktera mora biti izmedju ${elFields[fieldName].min_length} i ${elFields[fieldName].max_length} karaktera.`);
        }

        this.populateErrors(this.errors);
    }

    populateErrors(errors) {
        for(const elem of document.querySelectorAll('ul')){
            elem.remove();
        }

        for(let key of Object.keys(errors)) {
            let element = document.querySelector(`input[name="${key}"]`);
            let parentElement = element.parentElement;
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            errors[key].forEach((e) => {
                let li = document.createElement('li');
                li.innerText = e;
                errorsElement.appendChild(li);
            })
        }
    }

    phoneValidation(phone) {
        let isnum = /^\d+$/;
      
        if (phone.match(isnum)) {
            return true;
        } else {
            return false;
        }
    }

    emailValidation(email) {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(regexEmail)) {
            return true; 
        } else {
            return false; 
        }
    }

    zipValidation(zip) {
        let regex = "\\d{5}";
        if(zip.match(regex)) {
            return true;
        } else {
            return false;
        }
    }
}