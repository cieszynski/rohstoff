import { Element } from '/rohstoff/application.mjs'

export class Checkbox extends Element {

    /* 
    e909    indeterminate
    e834    checked
    e835    unchecked
    */
    static #css = `
    label.checkbox {
        display: flex;
        position: relative;
        align-items: center;
        font-family: Medium;
        font-weight: 500;
        font-size: 14rem;
        width: 100%;
        margin: 4rem auto;
    }

    label.checkbox span {
        color: rgba(var(--color-on-surface), 1);
    }

    label.checkbox input {
        appearance: none;
    }

    label.checkbox input::before {
        content: "";
        display: block;
        width: 40rem;
        height: 40rem;
        border-radius: 20rem;
    }

    label.checkbox input::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 40rem;
        height: 40rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-family: Icons;
        font-weight: 500;
        font-size: 22rem;
        content: "\\e835";
    }

    label.checkbox input:indeterminate::after {
        content: "\\e909";
        color: rgba(var(--color-primary), 1);
    }

    label.checkbox input:checked::after {
        content: "\\e834";
        color: rgba(var(--color-primary), 1);
    }

    label.checkbox input:required:not(:checked,:disabled)::after,
    label.checkbox input:required:not(:checked,:disabled)+span {
        color: rgba(var(--color-error), 1);
    }

    label.checkbox input:disabled+span {
        color: rgba(var(--color-on-surface), .38);
    }

    label.checkbox input:disabled::after,
    label.checkbox input:disabled:checked::after,
    label.checkbox input:disabled:indeterminate::after  {
        color: rgba(var(--color-on-surface), .38);
    }

    /* HOVERED, UNSELECTED */
    label.checkbox input:hover:not(:disabled,:invalid)::before {
        background-color: rgba(var(--color-on-surface), .08);
    }

    /* HOVERED, SELECTED */
    label.checkbox input:checked:hover:not(:disabled,:invalid)::before {
        background-color: rgba(var(--color-primary), .08);
    }

    /* HOVERED, ERROR */
    label.checkbox input:hover:not(:disabled,:valid)::before {
        background-color: rgba(var(--color-error), .08);
    }

    /* FOCUS/ACTIVE, UNSELECTED */
    label.checkbox input:active:not(:disabled,:invalid)::before,
    label.checkbox input:focus:not(:disabled,:invalid)::before {
        background-color: rgba(var(--color-on-surface), .12);
    }

    /* FOCUS/ACTIVE, SELECTED */
    label.checkbox input:checked:active:not(:disabled,:invalid)::before, 
    label.checkbox input:checked:focus:not(:disabled,:invalid)::before {
        background-color: rgba(var(--color-primary), .12);
    }

    /* FOCUS/ACTIVE, ERROR */
    label.checkbox input:active:not(:disabled,:valid)::before,
    label.checkbox input:focus:not(:disabled,:valid)::before {
        background-color: rgba(var(--color-error), .12);
    }
    `

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties, 'label', 'input', 'span');

        this.node.classList.add('checkbox');
        this.node.firstElementChild.type = 'checkbox'
        this.node.firstElementChild.onclick = (e) => {
            this.onclick.call(this, e);
        }
    }

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