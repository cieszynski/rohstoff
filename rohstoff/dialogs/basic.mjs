import { Component } from '/rohstoff/application.mjs'
import { TextButton } from '/rohstoff/buttons/common.mjs'

export class BasicDialog extends Component {

    static #css = `
    dialog.basic {
        margin: calc(50vh - var(--scrollHeight) / 2) auto auto auto;
        min-width: 280rem;
        max-width: 560rem;
        padding: 24rem;
        border: 0;
        border-radius: 28rem;
        overflow: hidden;
    }

    dialog.basic::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        pointer-events: none;
        font-size: 24rem;
    }

    dialog.basic[open]::before {
        animation: linearFadeIn .4s .15s forwards;
    }

    dialog.basic::backdrop { background: none; }

    dialog.basic h1 { 
        line-height: 32rem;
        color: var(--color-on-surface);
        font-family: "Regular";
        font-weight: 400;
        font-size: 24rem;
    }
    
    dialog.basic footer { 
        display: flex;
        justify-content: end;
    }
    ` /* #css */

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties, "beforeend", `
            <dialog class="basic">
                <h1></h1>
                <footer>
                </footer>
            </dialog>
        `);

        this.node.onkeydown = (e) => {
            if (e.keyCode === 27) {
                e.preventDefault();
                this.hide();
            }
        }
    }

    set buttonConfirm(elem) {
        console.assert(elem instanceof TextButton);
        this.node
            .lastElementChild
            .insertAdjacentElement("beforeend", elem.node);
    }

    set buttonDismiss(elem) {
        console.assert(elem instanceof TextButton);
        this.node
            .lastElementChild
            .insertAdjacentElement("afterbegin", elem.node);
    }

    set title(str) { this.node.firstElementChild.textContent = str; }

    show() {
        this.node.showModal();
        if (!this.node.style.maxHeight) { /* Firefox Mobile Hack! */
            this.node.style.maxHeight = `${this.node.scrollHeight}rem`
        }
        this.node.style.setProperty('--scrollHeight', `${this.node.scrollHeight}rem`);
        this.node.animate([
            {
                boxShadow: "0 0 0 100vmax rgba(0,0,0,0)",
                transform: "translateY(-56rem)",
                height: "56rem",
                opacity: 0
            },
            {
                boxShadow: "0 0 0 100vmax rgba(0,0,0,.32)",
                transform: "translateY(-10rem)",
                height: "56rem",
                opacity: .7,
                offset: .3
            },
            {
                boxShadow: "0 0 0 100vmax rgba(0,0,0,.32)",
                height: "var(--scrollHeight)",
                transform: "translateY(0rem)",
                opacity: 1
            }
        ], {
            easing: "ease-out",
            duration: 400,
            fill: "forwards"
        });
    }

    hide() {
        this.node.animate([
            {
                transform: "translateY(0rem)",
                height: "var(--scrollHeight)",
                opacity: 1
            },
            {
                transform: "translateY(-56rem)",
                height: "56rem",
                opacity: 0
            }
        ], {
            easing: "ease-in",
            duration: 300,
            fill: "backwards"
        }).finished.then(() => {
            this.node.close();
        })
    }
}