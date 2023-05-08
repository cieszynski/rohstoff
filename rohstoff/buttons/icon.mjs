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
        font-family: Icons;
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

    button.icon.toggle:not([aria-checked])::after, 
    button.icon.toggle[aria-checked='false']::after {
        font-family: Icons-Outlined;
    }  

    button.icon.toggle[aria-checked='true']::after {
        font-family: Icons;
    }
    `/* CSS */

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, 'button');

        this.node.type = 'button';
        this.node.classList.add('icon');
        this.node.onclick = (e) => {
            if (this.node.classList.contains('toggle')) {
                this.node.ariaChecked = {
                    'false': 'true',
                    'true': 'false',
                    'undefined': 'false'
                }[this.node.ariaChecked];
            }
            this.onclick;
        }
    }

    set icon(str) { this.node.dataset.icon = str; }

    set title(str) { this.node.title = str; }

    set toggle(bool) {
        this.node.classList.add('toggle');
        this.node.ariaChecked = 'false';
    }

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
        background-color: rgba(var(--color-on-surface), .12);
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

    button.icon.foutlined.toggle[aria-checked='false'] {
        /* background-color: rgba(var(--color-on-surface-variant), 1); */
    }

    button.icon.outlined.toggle[aria-checked='false']::after {
        color: rgba(var(--color-on-surface-variant), 1);
    }

    button.icon.outlined.toggle[aria-checked='true'] {
        background-color: rgba(var(--color-inverse-surface), 1);
        border-color: rgba(var(--color-inverse-surface), 1);
    }

    button.icon.outlined.toggle[aria-checked='true']::after {
        color: rgba(var(--color-on-inverse-surface), 1);
    }
    `/* CSS */

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

    button.icon.filled-tonal.toggle[aria-checked='false'] {
        background-color: rgba(var(--color-surface-container-highest), 1);
    }

    button.icon.filled-tonal.toggle[aria-checked='false']::after {
        color: rgba(var(--color-on-secondary-container), 1);
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

    button.icon.filled.toggle[aria-checked='false'] {
        background-color: rgba(var(--color-surface-container-highest), 1);
    }

    button.icon.filled.toggle[aria-checked='false']::after {
        color: rgba(var(--color-primary), 1);
    }
    `/* CSS */
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties);

        this.node.classList.add('filled');
    }
}