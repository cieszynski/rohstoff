import { Container } from '/rohstoff/application.mjs'

export class Column extends Container {

    static #css = `
    div.column {
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    ` /* #css */

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties);


        this.node.classList.add('column');
    }
}