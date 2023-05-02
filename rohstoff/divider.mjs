import { Element } from '/rohstoff/application.mjs'

export class Divider extends Element {

    static #css = `
    hr.divider {
        margin: 4rem auto;
        border: 1rem solid rgba(var(--color-outline-variant), 1);
    }
    ` /* #css */

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties, 'hr');

        this.node.classList.add('divider');
    }
}