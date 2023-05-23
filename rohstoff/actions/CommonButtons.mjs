import { Element } from '/rohstoff/application.mjs'

class Button extends Element {

    static #css = `
    button.common.elevated,
    button.common.filled,
    button.common.filled-tonal,
    button.common.outlined,
    button.common.text {
        font: 500 14rem/1 Medium;
        padding: 10rem 24rem 10rem 0rem;
        /* margin: 4rem; */
        border-radius: 20rem;
        height: 40rem;
        width: fit-content;
        min-width: 48rem;
    }

    button.common.elevated::before,
    button.common.filled::before,
    button.common.filled-tonal::before,
    button.common.outlined::before,
    button.common.text::before {
        font: 500 18rem/1 Icons;
        padding: 11rem 8rem 11rem 16rem;
        vertical-align: text-bottom;
        content: attr(data-icon);
    } /* CSS */
    `

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, "button")

        this.node.type = 'button';
        this.node.onclick = this.onclick
    }

    set label(str) { this.node.textContent = str; }

    set disabled(bool) { this.node.disabled = bool; }

    set icon(str) { this.node.dataset.icon = str; }

    set responsive(bool) {
        this.node.style.width = {
            true: '100%',
            false: 'fit-content'
        }[bool];
    }

    onclick(e) { console.log(e) }
}

export class TextButton extends Button {

    static #css = `
    button.common.text {
        color: rgba(var(--color-primary), 1);
    }
    
    button.common.text:not(:disabled):active,
    button.common.text:focus {
        background-image: linear-gradient(rgba(var(--color-primary), .12),
                rgba(var(--color-primary), .12));
    }
    
    button.common.text:not(:disabled):hover {
        background-image: linear-gradient(rgba(var(--color-primary), .08),
                rgba(var(--color-primary), .08));
    }
    
    button.common.text:disabled {
        color: rgba(var(--color-on-surface), .38);
    }
    `
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, "button")

        this.node.classList.add('common', 'text');
    }
}

export class OutlinedButton extends Button {

    static #css = `
    button.common.outlined {
        color: rgba(var(--color-primary), 1);
        border: 1rem solid rgba(var(--color-outline), 1);
    }
    
    button.common.outlined:not(:disabled):hover {
        background-image: linear-gradient(rgba(var(--color-primary), .08),
                rgba(var(--color-primary), .08));
    }
    
    button.common.outlined:not(:disabled):active,
    button.common.outlined:focus {
        background-image: linear-gradient(rgba(var(--color-primary), .12),
                rgba(var(--color-primary), .12));
    }
    
    button.common.outlined:disabled {
        color: rgba(var(--color-on-surface), .38);
        border: 1rem solid rgba(var(--color-on-surface), .12);
    }
    `
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, "button")

        this.node.classList.add('common', 'outlined');
    }
}

export class FilledTonalButton extends Button {

    static #css = `
    button.common.filled-tonal {
        color: rgba(var(--color-on-secondary-container), 1);
        background-color: rgba(var(--color-secondary-container), 1);
    }
    
    button.common.filled-tonal:not(:disabled):hover {
        box-shadow: var(--elevation-level);
        background-image: linear-gradient(rgba(var(--color-on-secondary-container), .08),
                rgba(var(--color-on-secondary-container), .08));
    }
    
    button.common.filled-tonal:not(:disabled):active,
    button.common.filled-tonal:focus {
        box-shadow: none;
        background-image: linear-gradient(rgba(var(--color-on-secondary-container), .12),
                rgba(var(--color-on-secondary-container), .12));
    }
    
    button.common.filled-tonal:disabled {
        color: rgba(var(--color-on-surface), .38);
        background-color: rgba(var(--color-on-surface), .12);
    }
    `
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, "button")

        this.node.classList.add('common', 'filled-tonal');
    }
}

export class FilledButton extends Button {

    static #css = `
    button.common.filled {
        color: rgba(var(--color-on-primary), 1);
        background-color: rgba(var(--color-primary), 1);
    }
    
    button.common.filled:not(:disabled):hover {
        box-shadow: var(--elevation-level2);
        background-image: linear-gradient(rgba(var(--color-on-primary), .08),
                rgba(var(--color-on-primary), .08));
    }
    
    button.common.filled:not(:disabled):active,
    button.common.filled:focus {
        box-shadow: var(--elevation-level1);
        background-image: linear-gradient(rgba(var(--color--on-primary), .12),
                rgba(var(--color--on-primary), .12));
    }
    
    button.common.filled:disabled {
        color: rgba(var(--color-on-surface), .38);
        background-color: rgba(var(--color-on-surface), .12);
    }
    `
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, "button")

        this.node.classList.add('common', 'filled');
    }
}

export class ElevatedButton extends Button {

    static #css = `
    button.common.elevated {
        color: rgba(var(--color-primary), 1);
        background-color: rgba(var(--color-surface), 1);
        box-shadow: 0 1rem 8rem -5rem rgba(var(--color-shadow), 1);
    }
    
    button.common.elevated:not(:disabled, :active):hover {
        box-shadow: 0 2rem 8rem -5rem rgba(var(--color-shadow), 1);
        background-image: linear-gradient(rgba(var(--color-primary), .08) 0 100%);
    }
    
    button.common.elevated:not(:disabled):active,
    button.common.elevated:focus {
        box-shadow: 0 1rem 8rem -5rem rgba(var(--color-shadow), 1);
        background-image: linear-gradient(rgba(var(--color-primary), .12),
                rgba(var(--color-primary), .12));
    }
    
    button.common.elevated:disabled {
        color: rgba(var(--color-on-surface), .38);
        background-color: rgba(var(--color-primary), .12);
        box-shadow: none;
    }
    `
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, "button")

        this.node.classList.add('common', 'elevated');
    }
}