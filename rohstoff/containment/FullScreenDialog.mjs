import { App, Component } from '/rohstoff/application.mjs'

export class FullScreenDialog extends Component {

    static #css = `
    dialog.fullscreen {
        border: 0;
        padding: 0;
        font-size: 24rem;
    }

    dialog.fullscreen header {
        display: flex;
        align-items: center;
        height: 56rem;
    }

    dialog.fullscreen header button.close {
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

    dialog.fullscreen header h1 {
        font-family: Regular;
        font-weight: 400;
        font-size: 24rem;
    }

    dialog.fullscreen footer {

    }

    @media 
    (max-height: ${window?.breakpoints?.compact ?? 600}px) and (orientation: landscape),
    (max-width: ${window?.breakpoints?.compact ?? 600}px) and (orientation: portrait) {

        dialog.fullscreen {
            width: 100%;
            height: 100vh;
            max-width: 100%; /* overwrite user agent style! */
            max-height: 100%; /* overwrite user agent style! */
        }

        dialog.fullscreen footer {
            position: absolute;
            top: 0;
            right: 0;
        }
    }


    @media 
    (min-height: ${window?.breakpoints?.compact ?? 600}px) and (orientation: landscape),
    (min-width: ${window?.breakpoints?.compact ?? 600}px) and (orientation: portrait) {

        dialog.fullscreen {
            background-color: green;
            min-width: 280rem;
            max-width: 560rem;
            margin: auto;
        }
    }
    `

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties, "beforeend", `
            <dialog class="fullscreen">
                <header>
                    <button class="close">${window?.i18n?.close ?? "close"}</button>
                    <h1>Title</h1>
                </header>
                fullscreen
                <footer>
                    <button>bla</button>
                </footer>
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
    }

    set title(str) { this.node.firstElementChild.lastElementChild.textContent = str; }

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

        }
    }
}
