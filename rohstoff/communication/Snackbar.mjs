import { App, Element } from '/rohstoff/application.mjs'

export class Snackbar extends Element {

    static #css = `
    dialog.snackbar {
        position: fixed;
        bottom: 16rem;
        width: fit-content;
        max-width: 90vw;
        margin: auto;
        display: flex;
        gap: 16rem;
        border: 0;
        border-radius: 4rem;
        color: rgba(var(--color-on-inverse-surface), 1);
        background-color: rgba(var(--color-inverse-surface), 1);
        font-family: Medium;
        font-weight: 400;
        font-size: 14rem;
        line-height: 1.5;
        z-index: 1000;
        padding: 16rem;
        opacity: 0;
    }

    dialog.snackbar p {
        flex: 1;
    }

    dialog.snackbar button {
        color: rgba(var(--color-inverse-primary), 1);
        font-family: Medium;
        font-weight: 500;
        font-size: 14rem;
        line-height: 1.5;
        padding: 0;
    }
    `
    static { super.initonce(this.#css) }

    constructor(properties) {
        properties.action = properties.action || "OK"
        super(properties, 'dialog', 'p', 'button');

        this.node.className = 'snackbar'
        this.node.lastElementChild.onclick = (e) => {
            this.onclick(e);
        }
    }

    set text(str) { this.node.firstElementChild.textContent = str; }

    set action(str) { this.node.lastElementChild.textContent = str; }

    onclick(e) { this.hide(); }

    show(ms = 4000) {
        if (this.node.open) { return; }

        // placing the snackbar always at
        // the bottom of the container
        /* TODO: What about FAB? */
        const reposition = (e) => {
            this.node.style.bottom
                = `${window.innerHeight - this.node.parentNode.offsetHeight + 16}rem`;
        }

        App.observer.orientation.addEventListener("change", reposition);

        setTimeout(() => {
            App.observer.orientation.removeEventListener("change", reposition);
            this.hide();
        }, ms)

        reposition()

        this.node.show();
        this.node.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            easing: "ease-out",
            duration: 400,
            fill: "forwards"
        })
    }

    hide() {
        if (!this.node.open) { return; }
        this.node.getAnimations().forEach(animation => {
            animation.cancel();
        });

        this.node.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            easing: "ease-out",
            duration: 400,
            fill: "forwards"
        }).finished.then(() => {
            this.node.close()
        });
    }
} 
