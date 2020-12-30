class CurrencyConverter {
    constructor(form) {
        this.form = form;
        this.formElements = [...this.form.elements];
        this.inputElements = this.formElements.filter(item => item.type === 'text');
        this.radioElements = this.formElements.filter(item => item.type === 'radio');
    }

    init() {
        this.eventsHandler();
    };

    eventsHandler() {

    };

    revert() {

    };

    checkVallet() {

    };

    convert() {

    };

    apiRequest() {

    };
}

const mainForm = document.querySelector('.main-form');
const converter = new CurrencyConverter(mainForm);
converter.init();