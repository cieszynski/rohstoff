import { Element } from '/rohstoff/application.mjs'

export class LinearProgressIndicator extends Element {

    static #css = `
    @keyframes indeterminate-progress-linear {
        0% { background-position-x: -900%; }
        100% { background-position-x: 990%; }
    }

    progress.linear:not([hidden]) {
        display: block;
        appearance: none;
        border: 0;
        width: 100%;
        height: 2rem;
        padding: 2rem;
        margin: 0 0 8rem 0;
        background-repeat: no-repeat;
        background-color: rgba(var(--color-surface-container-highest), 1);
        background-image: linear-gradient(rgba(var(--color-primary), 1) 0 0);
    }

    progress.linear:indeterminate {
        animation: 2s ease-in-out indeterminate-progress-linear infinite;
    }
    ` /* #css */

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties, 'progress');

        this.node.classList.add('linear');
    }

    set value(num) {
        console.assert(num === undefined || (num >= 0 && num <= 1), 'progress value not 0..1');

        if (num !== undefined) {
            this.node.value = num;
            this.node.textContent =
                this.node.style.backgroundSize = `${(num * 100).toFixed()}%`;
        } else {
            this.node.textContent = "";
            this.node.style.backgroundSize = '90%';
            this.node.removeAttribute('value');
        }
    }

    get value() { return this.node.value; }

    set visible(bool) { this.node.hidden = !bool; }
}