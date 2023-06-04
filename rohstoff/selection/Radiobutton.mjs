import { Element } from '/rohstoff/application.mjs'

export class Radiobutton extends Element {

    /* 
    e837    Radio button checked 
    e836    Radio button unchecked 
    */
    static #css = `
    label.radiobutton {
        width: 100%;
        height: 40rem;
        margin: 4rem auto;
        position: relative;
        display: flex;
    }

    label.radiobutton span {
        display: inline-flex;
        align-items: center;
        font-family: Medium;
        font-weight: 500;
        font-size: 14rem;
        flex: 1;
        color: rgba(var(--color-on-surface), 1);
    }

    label.radiobutton input {
        appearance: none;
    }

    label.radiobutton input::before {
        content: "";
        display: inline-block;
        width: 40rem;
        height: 40rem;
        border-radius: 20rem;
    }

    label.radiobutton input::after {
        color: rgba(var(--color-on-surface-variant), 1);
        position: absolute;
        top: 0;
        left: 0;
        width: 40rem;
        height: 40rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-family: Icons;
        font-weight: 900;
        font-size: 18rem;
        content: "\\e836";
    }

    label.radiobutton input:checked::after {
        color: rgba(var(--color-primary), 1);
        content: "\\e837";
    }

    /* DISABLED (+CHECKED)*/
    label.radiobutton input:disabled::after {
        color: rgba(var(--color-on-surface), .38);
    }

    label.radiobutton input:disabled+span {
        color: rgba(var(--color-on-surface), .38);
    }

    /* HOVERED, UNSELECTED */
    label.radiobutton input:hover:not(:disabled, :required)::before {
        background-color: rgba(var(--color-on-surface), .08);
    }

    /* HOVERED, SELECTED */
    label.radiobutton input:checked:hover:not(:disabled, :required)::before {
        background-color: rgba(var(--color-primary), .08);
    }

    /* FOCUS/ACTIVE, UNSELECTED */
    label.radiobutton input:active:not(:disabled, :required)::before,
    label.radiobutton input:focus:not(:disabled, :required)::before {
        background-color: rgba(var(--color-on-surface), .12);
    }

    /* FOCUS/ACTIVE, SELECTED */
    label.radiobutton input:checked:active:not(:disabled, :required)::before,
    label.radiobutton input:checked:focus:not(:disabled, :required)::before {
        background-color: rgba(var(--color-primary), .12);
    }
    `

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties, 'label', 'input', 'span');

        this.node.classList.add('radiobutton');
        this.node.firstElementChild.type = 'radio'
        this.node.firstElementChild.onclick = (e) => {
            this.onclick.call(this, e);
        }
    }

    set group(str) { this.node.firstElementChild.name = str; }

    set label(str) { this.node.lastElementChild.textContent = str; }

    set required(bool) { this.node.firstElementChild.required = bool; }

    set disabled(bool) { this.node.firstElementChild.disabled = bool; }

    get valueMissing() { return this.node.firstElementChild.validity.valueMissing; }

    set indeterminate(bool) { this.node.firstElementChild.indeterminate = bool; }
    get indeterminate() { return this.node.firstElementChild.indeterminate; }

    set checked(bool) { this.node.firstElementChild.checked = bool; }
    get checked() { return this.node.firstElementChild.checked; }

    onclick(e) { console.debug(e) }
}