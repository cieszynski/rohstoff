import { Element } from '/rohstoff/application.mjs'

export class SegmentedButton extends Element {

    static #css = `
    fieldset.segmented {
        border: none;
        display: flex;
        max-width: 450rem;
        /* margin: auto; */
    }
    
    fieldset.segmented legend {
        visibility: hidden;
        position: absolute;
    }
    
    fieldset.segmented label {
        font-family: Medium;
        font-weight: 500;
        font-size: 14rem;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 10rem 12rem;
        float: left;
        min-width: 1%;
        text-align: center;
        flex: 1;
        margin: 4rem 0 4rem -1rem;
    }
    
    fieldset.segmented label span {
        color: rgba(var(--color-on-surface), 1);
    }
    
    fieldset.segmented label input:checked+span {
        color: rgba(var(--color-on-secondary-container), 1);
    }
    
    fieldset.segmented.icon-only label span {
        visibility: hidden;
        position: absolute;
    }
    
    fieldset.segmented label:first-of-type {
        margin-left: 4rem;
    }
    
    fieldset.segmented label:last-of-type {
        margin-right: 4rem;
        float: none;
    }
    
    fieldset.segmented label input {
        appearance: none;
    }
    
    fieldset.segmented label input::before {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        content: "";
        border: 1rem solid rgba(var(--color-outline), 1);
        z-index: -1;
    }
    
    fieldset.segmented label input:checked::before {
        background-color: rgba(var(--color-secondary-container), 1);
    }
    
    fieldset.segmented label:first-of-type input::before {
        border-radius: 20rem 0 0 20rem;
    }
    
    fieldset.segmented label:last-of-type input::before {
        border-radius: 0 20rem 20rem 0;
        border-right: 1rem solid rgba(var(--color-outline), 1);
    }
    
    fieldset.segmented label input::after {
        color: rgba(var(--color-on-surface), 1);
        font-family: Icons-Outlined;
        font-weight: 500;
        font-size: 18rem;
        line-height: 1;
        content: attr(data-icon);
        padding: 0 .25em 0 0;
        vertical-align: text-bottom;
    }
    
    fieldset.segmented label input:checked::after {
        color: rgba(var(--color-on-secondary-container), 1);
        content: "\\e5ca";
        /* checked */
    }
    
    /* DISABLED */
    fieldset.segmented label input:disabled::before {
        border: 1rem solid rgba(var(--color-outline), .12);
    }
    
    fieldset.segmented label input:disabled+span,
    fieldset.segmented label input:disabled::after {
        color: rgba(var(--color-on-surface), .38);
    }
    
    /* HOVERED */
    fieldset.segmented label:hover input:not(:disabled,:active)::before {
        background-image: linear-gradient(rgba(var(--color-on-surface), .08) 0 100%);
    }
    
    fieldset.segmented label:hover input:not(:disabled,:active):checked::before {
        background-image: linear-gradient(rgba(var(--color-on-secondary-container), .08) 0 100%);
    }
    
    /* FOCUSED */
    fieldset.segmented label input::not(:disabled)active::before,
    fieldset.segmented label input:focus::before {
        background-image: linear-gradient(rgba(var(--color-on-surface), .12) 0 100%);
    }
    
    fieldset.segmented label input::not(:disabled)active:checked::before,
    fieldset.segmented label input:focus:checked::before {
        background-image: linear-gradient(rgba(var(--color-on-secondary-container), .12) 0 100%);
    }
    `/* CSS */

    static #ref = 0;
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, 'fieldset', 'legend');

        this.node.classList.add('segmented');

        SegmentedButton.#ref += 1;
    }

    set description(str) { this.node.firstElementChild.textContent = str; }

    set segments(arr) {
        this.node.replaceChildren(
            this.node.firstElementChild,
            ...arr.map(elem => {
                elem.node.firstElementChild.type = 'radio';
                elem.node.firstElementChild.name = `segmented${SegmentedButton.#ref}`;
                return elem.node;
            })
        );
    }

    set multiSelection(bool) {
        this.node.querySelectorAll('input').forEach(node => {
            node.type = {
                true: 'checkbox',
                false: 'radio'
            }[bool];
        })
    }
}

export class ButtonSegment extends Element {

    constructor(properties) {
        super(properties, 'label', 'input', 'span');

        this.node.firstElementChild.type = 'checkbox'
        this.node.firstElementChild.onclick = this.onclick
    }

    set icon(str) { this.node.firstElementChild.dataset.icon = str; }

    set label(str) { this.node.lastElementChild.textContent = str; }

    set disabled(bool) { this.node.firstElementChild.disabled = bool; }

    onclick(e) { console.log(e) }
}