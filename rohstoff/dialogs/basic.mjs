import { Component } from '/rohstoff/application.mjs'
import { TextButton } from '/rohstoff/buttons/common.mjs'

export class BasicDialog extends Component {

    static #css = `
    dialog.basic {
        margin: calc(50vh - var(--dialog-basic-scroll-height) / 2) auto auto auto;
        background-color: rgba(var(--color-surface-container-high), 1);
        color: rgba(var(--color-on-surface-variant), 1);
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
        background-color: rgba(var(--color-surface-container-high), 1);
        pointer-events: none;
        font-size: 24rem;
    }

    dialog.basic[open]::before {
        animation: linearFadeIn .4s .15s forwards;
    }

    dialog.basic::backdrop { background: none; }

    dialog.basic h1 { 
        line-height: 32rem;
        color: rgba(var(--color-on-surface), 1);
        font-family: "Regular";
        font-weight: 400;
        font-size: 24rem;
    }

    dialog.basic h1::before {
        text-align: center;
        content: attr(data-icon);
        display: block;
        font-family: "Icons-Outlined";
        font-size: 24rem;
        color: rgba(var(--color-secondary), 1);
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
                <child></child>
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

    set icon(str) { this.node.firstElementChild.dataset.icon = str; }

    set child(elem) { this.node.children[1].replaceWith(elem.node); }

    show() {
        this.onbeforeshow(this);
        this.node.showModal();
        if (!this.node.style.maxHeight) { /* Firefox Mobile Hack! */
            this.node.style.maxHeight = `${this.node.scrollHeight}rem`
        }
        this.node.style.setProperty('--dialog-basic-scroll-height', `${this.node.scrollHeight}rem`);
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
                height: "var(--dialog-basic-scroll-height)",
                transform: "translateY(0rem)",
                opacity: 1
            }
        ], {
            easing: "ease-out",
            duration: 400,
            fill: "forwards"
        }).finished.then(() => {
            this.onshow(this)
        });
    }

    onbeforeshow(elem) { }
    onshow(elem) { }

    hide() {
        this.onbeforehide(this);
        this.node.animate([
            {
                transform: "translateY(0rem)",
                height: "var(--dialog-basic-scroll-height)",
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
            this.onhide(this);
            this.node.close();
        })
    }

    onbeforehide(elem) { }
    onhide(elem) { }
}