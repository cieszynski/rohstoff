import { Container } from '/rohstoff/application.mjs'

export class Row extends Container {

    static #css = `
    div.row {
        display: flex;
        flex-direction: row;
        height: fit-content;
    }
    ` /* #css */

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties);


        this.node.classList.add('row');
    }

    set gap(num) { this.node.style.gap = `${num}rem`; }

    set align(obj) { Object.assign(this.align, obj) }

    get align() {
        return Object.defineProperties(this, {
            verticaly: {
                set: (str) => {
                    this.node.style.justifyContent = {
                        'start': 'start',
                        'end': 'end',
                        'center': 'center'
                    }[str];
                }
            },
            horizontaly: {
                set: (str) => {
                    this.node.style.alignItems = {
                        'start': 'start',
                        'end': 'end',
                        'center': 'center'
                    }[str];
                }
            }
        });
    }
}