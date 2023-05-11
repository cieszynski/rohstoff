import { Container } from '/rohstoff/application.mjs'

export class Row extends Container {

    static #css = `
    div.row {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
    }
    ` /* #css */

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties);


        this.node.classList.add('row');
    }

    set gap(num) { this.node.style.rowGap = `${num}rem`; }

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