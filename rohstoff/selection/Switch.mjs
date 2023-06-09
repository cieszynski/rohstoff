import { Element } from '/rohstoff/application.mjs'

export class Switch extends Element {

    /* 
        iconChecked: "\ue876",
        iconUnchecked: "\ue5cd"
    */
    static #css = `
    label.switch {
        display: flex;
        flex-direction: row-reverse;
        gap: 16rem;
        align-items: center;
        margin: 4rem auto;
        position: relative;
        width: 100%;
    }

    label.switch span {
        color: rgba(var(--color-on-surface), 1);
       /*  font-family: Roboto; */
        display: block;
        flex: 1;
    }

    label.switch span span:first-of-type {
     /*    font-weight: 500;
        font-size: 14rem; */
    }

    label.switch span span:last-of-type {
  /*       font: var(--typescale-body-small);
        letter-spacing: .4rem; */
    }

    label.switch input {
        appearance: none;
        position: relative;
        width: 52rem;
        height: 32rem;
        border-radius: 16rem;
        border-width: 2rem;
        border-style: solid;
        border-color: rgba(var(--color-outline), 1);
        background-color: rgba(var(--color-surface-container-highest), 1);
        transition: 
            border-color 0s .15s,
            background-color 0s .15s;
    }

    label.switch input:checked {
        border-color: rgba(var(--color-primary), 1);
        background-color: rgba(var(--color-primary), 1);
        transition: 
            border-color 0s .15s,
            background-color 0s .15s;
    }

    label.switch input::before {
        content: "";
    }

    label.switch input:checked::before {
        
    }

    label.switch input::after {
        font-family: Icons;
        font-weight: 900;
        font-size: 16rem;
        content: attr(data-icon-unchecked);
        color: rgba(var(--color-surface-container-highest), 1);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 28rem;
        height: 28rem;
        border-radius: 14rem;
        border-color: rgba(var(--color-surface-container-highest), 1);
        border-style: solid;
        border-width: 6rem;
        background-color: rgba(var(--color-outline), 1);
        transform-origin: center;
        transform: translate3d(0, 0, 0);
        transition: 
            content 0s .15s,
            color 0s .15s,
            background-color 0s .15s,
            transform .15s .15s,
            border-width .15s .3s,
            width .15s,
            height .15s,
            left .15s,
            top .15s;
    }

    label.switch input.icon::after {
        border-width: 4rem;
    }

    label.switch input:active::after {
        border-width: 0;
        transition: border-width .15s;
    }

    label.switch input:checked::after {
        content: attr(data-icon-checked);
        color: rgba(var(--color-on-primary-container), 1);
        transition: 
            content 0s .15s,
            color 0s .15s,
            background-color 0s .15s,
            transform .15s .15s,
            border-width .15s,
            width .15s .3s,
            height .15s .3s,
            left .15s .3s,
            top .15s .3s;
        background-color: rgba(var(--color-on-primary), 1);
        transform: translate3d(20rem, 0, 0);
        border-width: 0;
        width: 24rem;
        height: 24rem;
        left: 2rem;
        top: 2rem;
    }

    label.switch input:checked:active::after {
        top: 0;
        left: 0;
        width: 28rem;
        height: 28rem;
        transition: 
            width .15s,
            height .15s,
            left .15s,
            top .15s;
    }

    /* DISABLED */
    label.switch input:disabled+span {
        color: rgba(var(--color-on-surface), .38);
    }
    `

    static { super.initonce(this.#css) }

    constructor(properties) {

        //super(properties, 'label', 'input', ['span', 'span', 'span']);
        properties.html = {
            element: 'label',
            className: 'switch',
            innerHTML: `
                <input type="checkbox"/>
                <span>
                    <span class="typeface-plain typescale-label-large"></span>
                    <span class="typeface-plain typescale-body-small"></span>
                </span>`
        }

        /* TODO:
            super(properties, {
                nodeName: 'label',
                className: 'switch other',
                innerHTML: `
                <input type="checkbox"/>
                <span>
                ...
                </span>
                `
            }
        */
        super(properties, 'label');

        this.node.firstElementChild.onclick = (e) => {
            this.onclick.call(this, e);
        }
    }

    set checked(bool) { this.node.firstElementChild.checked = bool; }

    set iconChecked(str) { this.node.firstElementChild.dataset.iconChecked = str; }

    set iconUnchecked(str) {
        this.node.firstElementChild.dataset.iconUnchecked = str;
        this.node.firstElementChild.classList.toggle('icon', Boolean(str))
    }

    set label(str) { this.node.lastElementChild.firstElementChild.textContent = str; }

    set sublabel(str) { this.node.lastElementChild.lastElementChild.textContent = str; }

    onclick(e) { console.debug(e) }
}