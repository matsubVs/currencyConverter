class CurrencyConverter {
    constructor(form) {
        this.form = form;
        this.formElements = [...this.form.elements];
        this.inputElements = this.formElements.filter(item => item.type === 'text');
        this.radioElements = this.formElements.filter(item => item.type === 'radio');
        this.spanItems = form.querySelectorAll('span');
        this.revertFlag = false;
        this.eventsHandler();
    }

    eventsHandler() {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            this.convert();
        });

        this.form.addEventListener('change', event => {
            const target = event.target;
            if (target.type === "radio" && target.matches('[name=convert]')) {
                this.changeCurrency(target);
            } else if (target.type === "checkbox" && target.matches('[name=revert]')) {
                this.revert();
            }
        });

        this.inputElements.forEach(item => {
            item.addEventListener('input', () => {
                console.log('here');
                item.value = item.value.replace(/[^\d\.]/, '');
            });
        })
    };

    revert() {
        [this.spanItems[0].textContent, this.spanItems[1].textContent] = 
            [this.spanItems[1].textContent, this.spanItems[0].textContent]
        this.revertFlag = !this.revertFlag;
    };

    changeCurrency(radio) {
        if (this.revertFlag) this.spanItems[1].textContent = radio.value;
        else this.spanItems[0].textContent = radio.value;
    }

    convert() {
        const myCurrency = this.form.querySelector(`.${this.inputElements[0].id}`),
            convertCurrency = this.form.querySelector(`.${this.inputElements[1].id}`);
        const body = {
            'from': myCurrency.textContent,
            'to': convertCurrency.textContent,
            'amount': +this.inputElements[0].value
        };  
        
        this.apiRequest(body)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('error');
                };

                return response.json()
            })
            .then(data => this.inputElements[1].value = data.rates[body['to']] * body.amount);
    }

    apiRequest = body => fetch('https://api.exchangeratesapi.io/latest' + '?base=' + body.from);
}

const mainForm = document.querySelector('.main-form');
const converter = new CurrencyConverter(mainForm);