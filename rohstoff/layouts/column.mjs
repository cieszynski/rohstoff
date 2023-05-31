import { Container } from '/rohstoff/application.mjs'

export class Column extends Container {

    static #css = `
    div.column {
        display: flex;
        flex-direction: column;
        height: 100%;
        flex: 1;
        overflow-y: auto;
        position: relative;
    }
    ` /* #css */

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties);


        this.node.classList.add('column');
    }

    set gap(num) { this.node.style.gap = `${num}rem`; }
}