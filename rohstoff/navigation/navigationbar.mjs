import {
    Element,
    Component
} from '/rohstoff/application.mjs'

export class NavigationBar extends Component {

    static #css = `
    nav.navigationbar {
        z-index: 0;
        display: flex;
        background-color: rgba(var(--color-surface), 1);
        justify-content: center;
        font-size: 24rem;
        /* NAVIGATION BAR */
        column-gap: 8rem;
        width: 100%;
        height: 80rem;
        padding: 12rem 0 16rem 0;
    }

    @media screen and (min-width: 600px) {
        /* RAIL */
        nav.navigationbar {   
            flex-direction: column;
            row-gap: 12px;
            width: 80px;
            height: 100%;
        }
    }

    @media screen and (min-width: 1240px) {
        /* DRAWER */
        nav.navigationbar { 
            background-color: red;
        }
    }
    ` /* #css */

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, "beforeend", `
            <nav class="navigationbar"></nav>
        `);

        this.node.onchange = this.onchange;
    }

    set items(arr) {
        this.node.replaceChildren(
            ...arr.map(elem => { /* TODO */
                return elem.node.isConnected 
                    ? elem.node.cloneNode(true) 
                    : elem.node;
            })
        );
    }

    onchange(e) { console.debug(e) }
}

export class NavigationItem extends Element {

    static #css = `
    label.navigationitem {
        font-family: Medium;
        font-weight: 500;
        font-size: 12rem;
        line-height: 1;
        position: relative;
        display: block;
        padding: 36rem 0 0 0;
        text-align: center;
        /* BAR */
        width: 100%;
        height: 100%;
    }

    /* up to five items visible */
    label.navigationitem:nth-of-type(n+6) {
        display: none;
    }

    label.navigationitem input {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        appearance: none;
        position: absolute;
    }

    label.navigationitem input::before {
        content: "";
        position: relative;
        border-radius: 16rem;
        display: block;
        height: 32rem;
        margin: auto;
        /* BAR */
        width: 64rem;
    }

    label.navigationitem input::after {
        content: attr(data-icon);
        font-family: Icons-Outlined;
        font-weight: 500;
        font-size: 24rem;
        line-height: 1.3;
        position: relative;
        width: 100%;
        margin: auto;
        text-align: center;
        position: absolute;
        top: 0;
    }
    
    label.navigationitem input:checked::after {
        font-family: Icons;
    }

    @media screen and (min-width: 600px) {
        /* RAIL */
        label.navigationitem {
            width: 80rem;
            height: 56rem;
        }

        label.navigationitem input::before {
            width: 56rem;
        }
    }

    @media screen and (min-width: 1240px) {
        /* DRAWER */

        /* show all items */
        label.navigationitem:nth-of-type(n+6) {
            display: block;
        }
    }

    /* ENABLED */
    label.navigationitem input:checked::before {
        /* Active indicator	Color*/
        background-color: rgba(var(--color-secondary-container), 1);
    }
    
    label.navigationitem input:checked+span {
        /* Text Color (active) */
        color: rgba(var(--color-on-surface), 1);
    }
    
    label.navigationitem input+span {
        /* Text Color (inactive) */
        color: rgba(var(--color-on-surface-variant), 1);
    }
    
    label.navigationitem input:checked::after {
        /* Icon (optional) Color (active) */
        color: rgba(var(--color-on-secondary-container), 1);
    }
    
    label.navigationitem input::after {
        /* Icon (optional) Color (inactive) */
        color: rgba(var(--color-on-surface-variant), 1);
    }
    
    /* HOVERED */
    label.navigationitem input:checked:not(:active):hover::before {
        /* State layer color (active) */
        background-image: linear-gradient(rgba(var(--color-on-surface), .08) 0 100%);
    }
    
    label.navigationitem input:not(:active):hover::before {
        /* State layer color (inactive) */
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .08) 0 100%);
    }
    
    /* FOCUSED / PRESSED */
    label.navigationitem input:checked:focus::before,
    label.navigationitem input:checked:active::before {
        /* State layer color (active) */
        background-image: linear-gradient(rgba(var(--color-on-surface), .12) 0 100%);
    }
    
    label.navigationitem input:focus::before,
    label.navigationitem input:active::before {
        /* State layer color (inactive) */
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .12) 0 100%);
    }
    `/* CSS */

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, 'label', 'input', 'span');
        this.node.firstElementChild.name = 'navigationbar';
        this.node.firstElementChild.type = 'radio';
        this.node.classList.add('navigationitem');
        this.node.firstElementChild.onclick = this.onclick;
    }

    set label(str) { this.node.lastElementChild.textContent = str; }

    set icon(str) { this.node.firstElementChild.dataset.icon = str; }

    set checked(bool) { this.node.firstElementChild.checked = bool; }
    get checked() { return this.node.firstElementChild.checked; }

    onclick(e) { console.debug(e); }
}
