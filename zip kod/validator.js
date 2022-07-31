class Validator {
    constructor(config){
        this.elementsConfig = config;
        this.errors = {};

        this.generateErrorsObject();
        this.inputListener();
    }

    generateErrorsObject() {
        // za svako polje forme, u 'errors' objektu pravimo niz za to polje gde cemo cuvati greske 
        for(let field in this.elementsConfig) {
            this.errors[field] = [];
        }
    }

    inputListener() {
        // bind povezuje objekat i funkciju
        let inputSelector = this.elementsConfig;
        for(let field in inputSelector) {
            let el = document.querySelector(`input[name="${field}"]`);
            el.addEventListener("input", this.validate.bind(this));
        }
    }

    // e je trenutno polje zato sto je gore kliknuto
    validate(e) {
        // sva polja
        let elFields = this.elementsConfig;
        // trenutno polje
        let field = e.target;
        let fieldName = field.getAttribute('name');
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if(elFields[fieldName].required) {
            if(fieldValue === '') {
                this.errors[fieldName].push('Polje je prazno.');
            }
        }

        if(elFields[fieldName].email) {
            if(!this.validateEmail(fieldValue)) {
                this.errors[fieldName].push('Neispravna e-mail adresa.');
            }
        }

        if(elFields[fieldName].phone) {
            if(!this.validatePhone(fieldValue)) {
                this.errors[fieldName].push('Neispravan broj telefona.');
            }
        }

        if(elFields[fieldName].zip) {
            if(!this.validateZip(fieldValue)) {
                this.errors[fieldName].push('Neispravan ZIP kod.');
            }
        }

        if(fieldValue.length < elFields[fieldName].min_length || fieldValue.length > elFields[fieldName].max_length) {
            this.errors[fieldName].push(`Polje mora imati izmedju ${elFields[fieldName].min_length} i ${elFields[fieldName].max_length} karaktera.`);
        }

        
        if(elFields[fieldName].matching) {
            let matchingEl = document.querySelector(`input[name="${elFields[fieldName].matching}"]`);
            if(fieldValue !== matchingEl.value) {
                this.errors[fieldName].push('Lozinke se ne poklapaju.');
            }

            // fieldName se puni samo ako se lozinke NE poklapaju
            // ako se poklapaju (ako je fieldName.length === 0) nista se ne pise
            if(this.errors[fieldName].length === 0) {
                this.errors[fieldName] = [];
                this.errors[elFields[fieldName].matching] = [];
            }
        }

        this.populateErrors(this.errors);
    }

    populateErrors(errors) {
        for(const elem of document.querySelectorAll('ul')) {
            elem.remove();
        }
        for(let key of Object.keys(errors)) {
            let element = document.querySelector(`input[name="${key}"]`);
            let parentElement = element.parentElement;
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            errors[key].forEach(error => {
                let li = document.createElement('li');
                li.innerText = error;

                errorsElement.appendChild(li);
            })
        }
    }

    validateEmail(email) {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(regexEmail)) {
            return true; 
        } else {
            return false; 
        }
    }

    validatePhone(phone) {
        let isnum = /^\d+$/;
      
        if (phone.match(isnum)) {
            return true;
        } else {
            return false;
        }
    }

    validateZip(zip) {
        let regex = "\\d{5}";
        if(zip.match(regex)) {
            return true;
        } else {
            return false;
        }
    }
}