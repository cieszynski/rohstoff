import { Element } from '/rohstoff/application.mjs'

export class IconButton extends Element {

    static #css = `
    button.icon {
        width: 40rem;
        height: 40rem;
        border-radius: 20rem;
        margin: 4rem;
        font-size: 0;
    }
    
    button.icon::after {
        color: rgba(var(--color-on-surface-variant), 1);
        line-height: 1.6;
        font-family: Icons-Outlined;
        font-weight: 500;
        font-size: 24rem;
        content: attr(data-icon);
    }
    
    button.icon:disabled::after {
        color: rgba(var(--color-on-surface), .38);
    }
    
    button.icon:not(:disabled, :active):hover {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .08) 0 100%);
    }
    
    button.icon:not(:disabled):active,
    button.icon:focus {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .12) 0 100%);
    }
    `/* CSS */

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, 'button');

        this.node.type = 'button';
        this.node.classList.add('icon');
        this.node.onclick = this.onclick;
    }

    set disabled(bool) { this.node.disabled = bool; }

    set icon(str) { this.node.dataset.icon = str; }

    set label(str) { this.node.textContent = str; }

    onclick(e) { console.log(e) }
}

export class ToggleIconButton extends Element {

    static #css = `
    label.icon {
        width: 40rem;
        height: 40rem;
        border-radius: 20rem;
        margin: 4rem;
        font-size: 0;
    }
    
    label.icon input {
        appearance: none;
        width: 100%;
        height: 100%;
        text-align: center;
        border-radius: 20rem;
    }
    
    /* ICON */
    label.icon input::after {
        color: rgba(var(--color-on-surface-variant), 1);
        font-family: Icons-Outlined;
        content: attr(data-icon);
        line-height: 1.6;
        font-weight: 500;
        font-size: 24rem;
    }

    /* ICON checked */
    label.icon input:checked::after {
        color: rgba(var(--color-primary), 1);
        font-family: Icons;
    }
    
    /* ICON disabled */
    label.icon input:disabled::after {
        color: rgba(var(--color-on-surface), .38);
    }
    
    /* CONTAINER hover */
    label.icon input:not(:disabled, :active):hover {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .08) 0 100%);
    }
    
    /* CONTAINER checked hover */
    label.icon input:checked:not(:disabled, :active):hover {
        background-image: linear-gradient(rgba(var(--color-primary), .08) 0 100%);
    }
    
    /* CONTAINER active, focus */
    label.icon input:not(:disabled):active,
    label.icon input:focus {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .12) 0 100%);
    }
    
    /* CONTAINER checked active, focus */
    label.icon input:checked:not(:disabled):active,
    label.icon input:checked:focus {
        background-image: linear-gradient(rgba(var(--color-primary), .12) 0 100%);
    }
    
    label.icon span {
        font-size: 0;
    }
    `/* CSS */

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, 'label', 'input', 'span');

        this.node.firstElementChild.type = 'checkbox'
        this.node.firstElementChild.onclick = this.onclick;
        this.node.classList.add('icon');
    }

    set disabled(bool) { this.node.firstElementChild.disabled = bool; }

    set label(str) { this.node.lastElementChild.textContent = str; }

    set icon(str) { this.node.firstElementChild.dataset.icon = str; }

    set checked (bool) { this.node.firstElementChild.checked = bool; }
    get checked () { return this.node.firstElementChild.checked; }

    onclick(e) { console.log(e) }
}

export class OutlinedIconButton extends IconButton {

    static #css = `
    button.icon.outlined {
        border: 1rem solid rgba(var(--color-outline), 1);
    }
    
    button.icon.outlined::after {
        color: rgba(var(--color-on-surface-variant), 1);
    }
    
    button.icon.outlined:disabled {
        border: 1rem solid rgba(var(--color-on-surface), .12);
    }
    
    button.icon.outlined:disabled::after {
        color: rgba(var(--color-on-surface), .38);
    }
    
    button.icon.outlined:not(:disabled, :active):hover {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .08) 0 100%);
    }
    
    button.icon.outlined:not(:disabled, :active):hover::after  {
        color: rgba(var(--color-on-surface-variant), 1);
    }
    
    button.icon.outlined:not(:disabled, :active):active, 
    button.icon.outlined:not(:disabled, :active):focus {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .12) 0 100%);
    }
    
    button.icon.outlined:not(:disabled, :active):active::after, 
    button.icon.outlined:not(:disabled, :active):focus::after  {
        color: rgba(var(--color-on-surface-variant), 1);
    }
    `/* CSS */

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties);

        this.node.classList.add('outlined');
    }
}

export class ToggleOutlinedIconButton extends ToggleIconButton {

    static #css = `
    /* ICON */
    label.icon.outlined input::after {
        color: rgba(var(--color-on-surface-variant), 1);
    }

    /* ICON checked */
    label.icon.outlined input:checked::after {
        color: rgba(var(--color-on-inverse-surface), 1);
    }

    /* ICON disabled */
    label.icon.outlined input:disabled::after {
        color: rgba(var(--color-on-surface), .38);
    }

    /* CONTAINER */
    label.icon.outlined input {
        border: 1rem solid rgba(var(--color-outline), 1);
    }

    /* CONTAINER checked */
    label.icon.outlined input:checked {
        background-color: rgba(var(--color-inverse-surface), 1);
        border: 0;
    }

    /* CONTAINER hover */
    label.icon.outlined input:not(:disabled, :active):hover {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .08) 0 100%);
    }

    /* CONTAINER checked hover */
    label.icon.outlined input:checked:not(:disabled, :active):hover {
        background-image: linear-gradient(rgba(var(--color-on-inverse-surface), .08) 0 100%);
    }

    /* CONTAINER active, focus */
    label.icon.outlined input:active,
    label.icon.outlined input:focus {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .12) 0 100%);
    }

    /* CONTAINER checked active, focus */
    label.icon.outlined input:checked:active,
    label.icon.outlined input:checked:focus {
        background-image: linear-gradient(rgba(var(--color-on-inverse-surface), .12) 0 100%);
    }

    /* CONTAINER disabled */
    label.icon.outlined input:disabled {
        background-color: transparent;
        border: 1rem solid rgba(var(--color-on-surface), .12);
    }

    /* CONTAINER disabled checked */
    label.icon.outlined input:disabled:checked {
        background-color: rgba(var(--color-on-surface), .12);
        border: 0;
    }
    ` /* CSS */

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties);

        this.node.classList.add('outlined');
    }
}

export class FilledTonalIconButton extends IconButton {

    static #css = `
    button.icon.filled-tonal {
        background-color: rgba(var(--color-secondary-container), 1);
    }
    
    button.icon.filled-tonal::after {
        color: rgba(var(--color-on-secondary-container), 1);
    }
    
    button.icon.filled-tonal:disabled {
        background-color: rgba(var(--color-on-surface), .12);
    }
    
    button.icon.filled-tonal:disabled::after {
        color: rgba(var(--color-on-surface), .38);
    }
    
    button.icon.filled-tonal:not(:disabled, :active):hover {
        background-image: linear-gradient(rgba(var(--color-on-secondary-container), .08) 0 100%);
    }
    
    button.icon.filled-tonal:not(:disabled, :active):hover::after  {
        color: rgba(var(--color-on-secondary-container), 1);
    }
    
    button.icon.filled-tonal:not(:disabled, :active):active, 
    button.icon.filled-tonal:not(:disabled, :active):focus {
        background-image: linear-gradient(rgba(var(--color-on-secondary-container), .12) 0 100%);
    }
    
    button.icon.filled-tonal:not(:disabled, :active):active::after, 
    button.icon.filled-tonal:not(:disabled, :active):focus::after  {
        color: rgba(var(--color-on-secondary-container), 1);
    }
    `/* CSS */

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties);

        this.node.classList.add('filled-tonal');
    }
}


export class ToggleFilledTonalIconButton extends ToggleIconButton {

    static #css = `
    /* ICON */
    label.icon.filled-tonal input::after {
        color: rgba(var(--color-on-surface-variant), 1);
    }
    
    /* ICON checked */
    label.icon.filled-tonal input:checked::after {
        color: rgba(var(--color-on-secondary-container), 1);
    }
    
    /* ICON disabled */
    label.icon.filled-tonal input:disabled::after {
        color: rgba(var(--color-on-surface), .38);
    }
    
    /* CONTAINER */
    label.icon.filled-tonal input {
        background-color: rgba(var(--color-surface-container-highest), 1);
    }
    
    /* CONTAINER checked */
    label.icon.filled-tonal input:checked {
        background-color: rgba(var(--color-secondary-container), 1);
    }
    
    /* CONTAINER hover */
    label.icon.filled-tonal input:not(:disabled):hover {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .08) 0 100%);
    }
    
    /* CONTAINER checked hover */
    label.icon.filled-tonal input:checked:not(:disabled):hover {
        background-image: linear-gradient(rgba(var(--color-on-secondary-container), .08) 0 100%);
    }
    
    /* CONTAINER active, focus */
    label.icon.filled-tonal input:not(:disabled):active,
    label.icon.filled-tonal input:not(:disabled):focus {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .12) 0 100%);
    }
    
    /* CONTAINER checked active, focus */
    label.icon.filled-tonal input:checked:not(:disabled):active,
    label.icon.filled-tonal input:checked:not(:disabled):focus {
        background-image: linear-gradient(rgba(var(--color-on-secondary-container), .12) 0 100%);
    }
    
    /* CONTAINER disabled */
    /* CONTAINER disabled checked */
    label.icon.filled-tonal input:disabled {
        background-color: rgba(var(--color-on-surface), .12);
    }
    `/* CSS */

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties);

        this.node.classList.add('filled-tonal');
    }
}

export class FilledIconButton extends IconButton {

    static #css = `
    button.icon.filled {
        background-color: rgba(var(--color-primary), 1);
    }
    
    button.icon.filled::after {
        color: rgba(var(--color-on-primary), 1);
    }
    
    button.icon.filled:disabled {
        background-color: rgba(var(--color-on-surface), .12);
    }
    
    button.icon.filled:disabled::after {
        color: rgba(var(--color-on-surface), .38);
    }
    
    button.icon.filled:not(:disabled, :active):hover {
        background-image: linear-gradient(rgba(var(--color-on-primary), .08) 0 100%);
    }
    
    button.icon.filled:not(:disabled, :active):hover::after  {
        color: rgba(var(--color-on-primary), 1);
    }
    
    button.icon.filled:not(:disabled, :active):active, 
    button.icon.filled:not(:disabled, :active):focus {
        background-image: linear-gradient(rgba(var(--color-on-primary), .12) 0 100%);
    }
    
    button.icon.filled:not(:disabled, :active):active::after, 
    button.icon.filled:not(:disabled, :active):focus::after  {
        color: rgba(var(--color-on-primary), 1);
    }
    `/* CSS */
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties);

        this.node.classList.add('filled');
    }
}

export class ToggleFilledIconButton extends ToggleIconButton {

    static #css = `
    /* ICON */
    label.icon.filled input::after {
        color: rgba(var(--color-primary), 1);
    }
    
    /* ICON checked */
    label.icon.filled input:checked::after {
        color: rgba(var(--color-on-primary), 1);
    }
    
    /* ICON disabled */
    label.icon.filled input:disabled::after {
        color: rgba(var(--color-on-surface), .38);
    }
    
    /* CONTAINER */
    label.icon.filled input {
        background-color: rgba(var(--color-surface-container-highest), 1);
    }
    
    /* CONTAINER checked */
    label.icon.filled input:checked:not(:disabled) {
        background-color: rgba(var(--color-primary), 1);
    }
    
    /* CONTAINER hover */
    label.icon.filled input:not(:disabled):hover {
        background-image: linear-gradient(rgba(var(--color-primary), .08) 0 100%);
    }
    
    /* CONTAINER checked hover */
    label.icon.filled input:checked:not(:disabled):hover {
        background-image: linear-gradient(rgba(var(--color-on-primary), .08) 0 100%);
    }
    
    /* CONTAINER active, focus */
    label.icon.filled input:not(:disabled):active,
    label.icon.filled input:not(:disabled):focus {
        background-image: linear-gradient(rgba(var(--color-primary), .12) 0 100%);
    }
    
    /* CONTAINER checked active, focus */
    label.icon.filled input:checked:not(:disabled):active,
    label.icon.filled input:checked:not(:disabled):focus {
        background-image: linear-gradient(rgba(var(--color-on-primary), .12) 0 100%);
    }
    
    /* CONTAINER disabled */
    /* CONTAINER disabled checked */
    label.icon.filled input:disabled {
        background-color: rgba(var(--color-on-surface), .12);
    }
    `/* CSS */
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties);

        this.node.classList.add('filled');
    }
}