import { Container } from '/rohstoff/application.mjs'

export class Column extends Container {

    static #css = `
    div.column {
        display: flex;
        flex-direction: column;
        /* height: 100%; */
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

    set padding(num) { this.node.style.padding = `${num}rem`; }
    set paddingTop(num) { this.node.style.paddingTop = `${num}rem`; }
    set paddingLeft(num) { this.node.style.paddingLeft = `${num}rem`; }
    set paddingRight(num) { this.node.style.paddingRight = `${num}rem`; }
    set paddingBottom(num) { this.node.style.paddingBottom = `${num}rem`; }
}