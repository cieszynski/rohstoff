import {
    App,
    Element,
    Component
} from '/rohstoff/application.mjs'

export class NavigationBar extends Component {

    static #css = `
    nav.navigationbar {
        position: relative;
    }

    nav.navigationbar div {
        display: grid;
        background-color: rgba(var(--color-surface), 1);
    }

    /* NAVIGATION BAR */
    @media screen and ${App.mediaQueryCompact} {

        nav.navigationbar {
            width: 100%;
            height: 80rem;
        }

        nav.navigationbar div {
            margin: auto;
            height: 100%;
            grid-auto-flow: column;
            grid-auto-columns: 1fr;
            gap: 8rem;
            max-width: fit-content;
            padding: 12rem 0 16rem 0;
        }
    }

    /* NAVIGATION RAIL */
    @media screen and ${App.mediaQueryNotCompact} {

        nav.navigationbar {
            position: relative;
            width: 80rem;
            height: 100%;
        }

/*         nav.navigationbar:not(.menu) {
            display: flex;
        } */

        nav.navigationbar div {
            margin: auto;
            width: 80rem;
            padding: 12rem;
            grid-auto-flow: row;
            grid-auto-rows: fit-content(56rem);
            transition: width .3s;
            height: 100%;
        }

/*         nav.navigationbar:not(.menu) div {
            height: fit-content;
        } */
    }

    /* NAVIGATION RAIL to DRAWER */
    @media screen and ${App.mediaQueryMedium} {

/*         nav.navigationbar.menu div {
            border-radius: 0;
            box-shadow: 0;
            transition: border-radius .3s, box-shadow .3s;
        } */
        
        nav.navigationbar.menu.opened div,
        nav.navigationbar.menu.closing div {
            z-index: 10;
            border-radius: 0 16rem 16rem 0;
            width: 360rem;
            box-shadow: -63.5rem 0 0 64rem rgba(var(--color-scrim), .32); /* HACK! for round corner */
        }

        nav.navigationbar.menu.opened div >*,
        nav.navigationbar.menu.closed div >* {
            transition: opacity .3s .15s;
            opacity: 1;
        }

        nav.navigationbar.menu.opening div >*,
        nav.navigationbar.menu.closing div >* {
            opacity: 0;
        }

        /* MENU ICON optional */
        nav.navigationbar.menu div::before {
            color: rgba(var(--color-on-surface-variant), 1);
            font-family: Icons-Outlined;
            content: "\\e5d2";
            font-weight: 500;
            font-size: 24rem;
            line-height: 1.3;
            width: 24rem;
            height: 24rem;
            position: relative;
            top: 0rem;
            left: 16rem;
            margin-bottom: 16px;
            opacity: 1;
            transition: opacity .3s;
        }

        nav.navigationbar.menu.opened div::before,
        nav.navigationbar.menu.closing div::before {
            opacity: 0;
        }

        /* SCRIM */
        nav.navigationbar::after {
            pointer-events: none;
            content: "";
            transition: background-color .3s, left .3s;
            background-color: rgba(var(--color-scrim), 0);
            position: fixed;
            height: 100%;
            left: 80rem;
            width: 100%;
            top: 0;
        }
    
        nav.navigationbar.opened::after,
        nav.navigationbar.closing::after {
            pointer-events: all;
            background-color: rgba(var(--color-scrim), .32);
            left: 360rem;
            width: 100%;
        }        
    }

    /* NAVIGATION DRAWER */
    @media screen and ${App.mediaQueryExpanded} {

        nav.navigationbar {
            width: 360rem;
            height: 100%;
        }

        nav.navigationbar div {
            position: relative;
            margin: 0;
            width: 360rem;
            height: 100%;
        }
    }`

    static {
        super.initonce(this.#css)
    }

    constructor(properties) {
        super(properties, "beforeend", '<nav class="navigationbar closed"><div/></nav>');

        this.node.onchange = this.onchange;

        this.node.onclick = (e) => {
            if (!this.node.classList.contains('menu')
                || (this.node.classList.contains('closed')
                    && ((e.clientX < 28 || e.clientX > 52)
                        || (e.clientY < 16 || e.clientY > 40))
                    )
                || (!this.onclick(e))) {
                return;
            }

            if (this.node.classList.replace('opened', 'closing')) {
                setTimeout(() => {
                    this.node.classList.replace('closing', 'closed')
                }, 100)
            } else if (this.node.classList.replace('closed', 'opening')) {
                setTimeout(() => {
                    this.node.classList.replace('opening', 'opened')
                }, 100)
            }
        }
    }

    set items(arr) {
        this.node.firstElementChild.replaceChildren(...arr.map(elem => {
            /* TODO */
            return elem.node.isConnected ? elem.node.cloneNode(true) : elem.node;
        }));
    }

    set withMenu(bool) {
        this.node.classList.toggle('menu', bool);
    }

    onclick(e) {
        console.debug(e);
        return true;
    }

    onchange(e) {
        console.debug(e)
    }
}

export class NavigationItem extends Element {

    static #css = ` 
    label.navigation {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        font-family: Medium;
        font-weight: 500;
        font-size: 12rem;
        line-height: 1;
        text-align: center;
        transition: flex-direction .3s .3s;
    }

    /* LABEL */
    label.navigation span {
        color: rgba(var(--color-on-surface-variant), 1);
        pointer-events: none;
        position: relative;
        flex: 1;
    }

    label.navigation input:checked + span {
        color: rgba(var(--color-on-surface), 1)
    }

    /* BADGE */
    label.navigation span[data-badge]::after {
        content: "";
        position: absolute;
        width: 6rem;
        height: 6rem;
        border-radius: 3rem;
        background-color: rgba(var(--color-error), 1);
    }

    label.navigation span[data-badge-large]::after {
        content: attr(data-badge-large);
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 16rem;
        height: 16rem;
        border-radius: 8rem;
        color: rgba(var(--color-on-error), 1);
        background-color: rgba(var(--color-error), 1);
        padding: 0 4rem;
    }

    label.navigation span[data-badge]::after,
    label.navigation span[data-badge-large]::after {
        /* position */
        left: calc(50% + 6rem);
        top: -32rem;
    }

    label.navigation input {
        appearance: none;
    }

    /* CONTAINER */
    label.navigation input::before {
        content: "";
        border-radius: 16rem;
        position: absolute;
        top: 0;
    }

    label.navigation input:hover::before {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .08) 0 100%);
    }

    label.navigation input:active::before,
    label.navigation input:focus::before {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .12) 0 100%);
    }

    label.navigation input:checked::before {
        background-color: rgba(var(--color-secondary-container), 1);
    }

    label.navigation input:checked:hover::before {
        background-image: linear-gradient(rgba(var(--color-on-surface), .08) 0 100%);
    }

    label.navigation input:checked::active::before,
    label.navigation input:checked::focus::before {
        background-image: linear-gradient(rgba(var(--color-on-surface-variant), .12) 0 100%);
    }

    /* ICON */
    label.navigation input::after {
        color: rgba(var(--color-on-surface-variant), 1);
        position: relative;
        display: inline-block;
        content: attr(data-icon);
        font-family: Icons-Outlined;
        font-weight: 500;
        font-size: 24rem;
        line-height: 1.3;
        width: 24rem;
        margin: 0 20rem;
    }

    label.navigation input:checked::after {
        color: rgba(var(--color-on-secondary-container), 1);
        font-family: Icons;
    }

    /* NAVIGATION BAR */
    @media screen and ${App.mediaQueryCompact} {

        label.navigation {
            min-width: 64rem;
        }

        label.navigation span {
            margin-top: 4rem;
        }

        label.navigation input::before {
            left: calc(50% - 32rem);
            width: 64rem;
            height: 32rem;
        }
    }

    /* NAVIGATION RAIL */
    @media screen and ${App.mediaQueryNotCompact}  {
        label.navigation {
            height: 56rem;
        }
        label.navigation input::before {
            left: 0;
            width: 56rem;
            height: 32rem;
        }

        label.navigation span {
            width: 56rem;
        }

        label.navigation input::after {
            margin: 0 16rem 4rem 16rem;
        }
    }

    /* NAVIGATION RAIL to DRAWER */
    @media screen and ${App.mediaQueryMedium}  {
        .menu.opened label.navigation {
            flex-direction: row;
            align-items: center;
            text-align: left;
        }
        
        .menu.opened label.navigation input::after {
            margin: 12rem;
        }

        .menu.opened label.navigation span[data-badge]::after {
            left: auto;
            right: 12rem;
            top: 0;
        }

        .menu.opened label.navigation span[data-badge-large]::after {
            color: rgba(var(--color-on-secondary-container), 1);
            background-color: transparent;
            left: auto;
            right: 12rem;
            top: -2rem;
        }

        .menu.opened label.navigation input::before {
            width: 336rem;
            max-width: 100%;
            height: 56rem;
            border-radius: 28rem;
        }
    }

    /* NAVIGATION DRAWER */
    @media screen and ${App.mediaQueryExpanded}  {

        label.navigation {
            flex-direction: row;
            align-items: center;
            text-align: left;

        }
        
        label.navigation input::after {
            margin: 12rem;
        }

        label.navigation span[data-badge]::after {
            left: auto;
            right: 12rem;
            top: 0;
        }

        label.navigation span[data-badge-large]::after {
            color: rgba(var(--color-on-secondary-container), 1);
            background-color: transparent;
            left: auto;
            right: 12rem;
            top: -2rem;
        }

        label.navigation input::before {
            width: 336rem;
            max-width: 100%;
            height: 56rem;
            border-radius: 28rem;
        }
    }`

    static {
        super.initonce(this.#css)
    }

    constructor(properties) {
        super(properties, 'label', 'input', 'span');
        this.node.firstElementChild.name = 'navigationitem';
        this.node.firstElementChild.type = 'radio';
        this.node.classList.add('navigation');
        this.node.firstElementChild.onclick = this.onclick;
    }

    set label(str) {
        this.node.lastElementChild.textContent = str;
    }

    set icon(str) {
        this.node.firstElementChild.dataset.icon = str;
    }

    set checked(bool) {
        this.node.firstElementChild.checked = bool;
    }

    get checked() {
        return this.node.firstElementChild.checked;
    }

    set badge(value) {
        console.assert(typeof value == 'string'
            || typeof value == 'number'
            || typeof value == 'boolean'
        );

        if (value) switch (typeof value) {
            case 'boolean':
                this.node.lastElementChild.dataset.badge = value;
                break;
            case 'string':
            case 'number':
                this.node.lastElementChild.dataset.badgeLarge = value;
                break;
        } else {
            delete this.node.lastElementChild.dataset.badge;
            delete this.node.lastElementChild.dataset.badgeLarge;
        }
    }

    onclick(e) {
        console.debug(e);
    }
}

export class NavigationDivider extends Element {

    static #css = `
    hr.navigationdivider {        
        border: 1rem solid rgba(var(--color-outline-variant), 1);
        margin: 4rem 12rem;
        height: 1rem;
        opacity:1;
    }

    @media screen and ${App.mediaQueryCompact}  {
        hr.navigationdivider { 
            display: none;
        }
    }

    @media screen and ${App.mediaQueryMedium}  {
        .menu.closed div hr.navigationdivider {
            opacity: 0; 
        }
    }

    `

    static {
        super.initonce(this.#css)
    }

    constructor(properties) {
        super(properties, "hr");

        this.node.classList.add('navigationdivider');
    }
}