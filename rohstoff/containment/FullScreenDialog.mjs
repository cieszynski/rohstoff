import { App, Component } from '/rohstoff/application.mjs'
import { TextButton } from '/rohstoff/actions/CommonButtons.mjs';

export class FullScreenDialog extends Component {

    static #css = `
    dialog.fullscreen {
        border: 0;
        padding: 0 24rem 16rem 24rem;
    }

    dialog.fullscreen header {
        height: 56rem;
        margin: auto -24rem 24rem -24rem;
        display: flex;
        align-items: center;
        position: relative;
    }

    dialog.fullscreen header button.close {
        position: absolute;
        top: 14rem;
        padding: 0;
        font-size: 0;
    }

    dialog.fullscreen header button.close::after {
        display: inline-block;
        content: "\\e5cd";
        width: 24rem;
        height: 24rem;
        margin: auto 16rem;
        font-family: Icons-Outlined;
        font-weight: 500;
        font-size: 22rem;
        line-height: 1.4;
    }

    dialog.fullscreen footer {
        display: flex;
        align-items: center;
    }

    @media /* Fullscreen */
    (max-height: ${window?.breakpoints?.compact ?? 600}px) and (orientation: landscape),
    (max-width: ${window?.breakpoints?.compact ?? 600}px) and (orientation: portrait) {

        dialog.fullscreen {
            width: 100%;
            height: 100vh;
            max-width: 100%; /* overwrite user agent style! */
            max-height: 100%; /* overwrite user agent style! */
        }

        dialog.fullscreen header h1 {
            margin: auto 24rem auto 56rem;
            font-family: Regular;
            font-weight: 400;
            font-size: 22rem;
            line-height: 1;
        }

        dialog.fullscreen header button.close {
            left: 0;
        }

        dialog.fullscreen footer {
            position: absolute;
            top: 0;
            right: 0;
            height: 56rem;
            padding: 0 16rem;
        }

        dialog.fullscreen footer button:first-of-type {
            display: none;
        }
    }


    @media /* Basic */
    (min-height: ${window?.breakpoints?.compact ?? 600}px) and (orientation: landscape),
    (min-width: ${window?.breakpoints?.compact ?? 600}px) and (orientation: portrait) {

        dialog.fullscreen {
            border-radius: 16rem;
            min-width: 280rem;
            max-width: 560rem;
            margin: auto;
        }

        dialog.fullscreen header {
            
        }



        dialog.fullscreen header button.close {
            right: 0;
        }

        dialog.fullscreen header h1 {
            margin: auto 56rem auto 24rem;
            font-family: Regular;
            font-weight: 400;
            font-size: 24rem;
            line-height: 1;
        }

        dialog.fullscreen footer {
            margin: 24rem -16rem auto auto;
            justify-content: end;
        }
    }
    `

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties, "beforeend", `
            <dialog class="fullscreen">
                <header>
                    <button class="close">${window?.i18n?.close ?? "close"}</button>
                    <h1/>
                </header>
                <div></div>
                <footer></footer>
            </dialog>
        `);

        this.node.firstElementChild.firstElementChild.onclick = (e) => {
            this.hide();
        }

        this.node.onkeydown = (e) => {
            if (e.keyCode === 27) {
                e.preventDefault();
                this.hide();
            }
        }

        this.buttonConfirm = new TextButton({
            label: window?.i18n?.save ?? "save",
            onclick: this.onconfirm
        })

        this.buttonDismiss = new TextButton({
            label: window?.i18n?.cancel ?? "cancel",
            onclick: this.ondismiss
        })
    }

    set child(elem) { this.node.children[1].replaceWith(elem.node); }

    set title(str) { this.node.children[0].lastElementChild.textContent = str; }

    set buttonConfirm(elem) {
        this.node.children[2].insertAdjacentElement("beforeend", elem.node);
    }

    set buttonDismiss(elem) {
        this.node.children[2].insertAdjacentElement("afterbegin", elem.node);
    }

    onconfirm(e) { console.debug(e) }
    ondismiss(e) { console.debug(e) }

    show() {
        this.node.showModal();
        if (App.observer.compact.matches) {
            this.node.animate([
                { transform: "translateY(+100%)" },
                { transform: "translateY(0)" }
            ],
                {
                    easing: "ease-in-out",
                    duration: 300,
                    fill: "forwards"
                })
        } else {

        }
    }

    hide() {
        if (App.observer.compact.matches) {
            this.node.animate([
                { transform: "translateY(0)" },
                { transform: "translateY(+100%)" }
            ],
                {
                    easing: "ease-in-out",
                    duration: 300,
                    fill: "forwards"
                }).finished.then(() => {
                    this.node.close();
                })
        } else {
            this.node.close() /* TODO */
        }
    }
}
