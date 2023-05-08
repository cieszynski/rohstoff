
class Base {

    static initonce(css = "") {
        (new CSSStyleSheet())
            .replace(css)
            .then((sheet) => {
                document.adoptedStyleSheets[
                    document.adoptedStyleSheets.length
                ] = sheet;
            });
    }

    set id(str) { this.node.id = str }
}

export class Component extends Base {
    constructor(properties, position, html) {
        super();
        console.assert(["afterbegin", "beforeend"].includes(position));

        document.body.insertAdjacentHTML(
            position,
            html
        );

        this.node = {
            "afterbegin": document.body.firstElementChild,
            "beforeend": document.body.lastElementChild
        }[position]

        //Object.assign(this, properties);
        Object
            .entries(properties)
            .sort(([, x], [, y]) => { 
                return Array.isArray(x) 
                    ? -1 
                    : Array.isArray(y) 
                        ? 1 
                        : 0; 
            }).forEach(([key, value])=>{
            this[key] = value;
        });
        Object.freeze(this);
    }

/*     static initonce(css = "") {
        (new CSSStyleSheet())
            .replace(css)
            .then((sheet) => {
                document.adoptedStyleSheets[
                    document.adoptedStyleSheets.length
                ] = sheet;
            });
    }

    set id(str) { this.node.id = str } */

    set child(elem) { this.node.firstElementChild.replaceWith(elem.node); }
}

export class Element extends Base {

    constructor(properties={}, ...elements) {
        super();

        const create = (...elements) => {
            let node = null;

            elements.forEach((name, idx) => {
                if (Array.isArray(name)) {
                    node.appendChild(create(...name));
                } else {
                    let elem = document.createElement(name);
                    if (node) {
                        node.appendChild(elem);
                    } else {
                        node = elem;
                    }
                }

            })

            return node;
        }

        this.node = create(...elements);

        //Object.assign(this, properties);
        Object
            .entries(properties)
            .sort(([, x], [, y]) => { 
                return Array.isArray(x) 
                    ? -1 
                    : Array.isArray(y) 
                        ? 1 
                        : 0; 
            }).forEach(([key, value])=>{
            this[key] = value;
        });
        Object.freeze(this);
    }

/*     static initonce(css = "") {
        (new CSSStyleSheet())
            .replace(css)
            .then((sheet) => {
                document.adoptedStyleSheets[
                    document.adoptedStyleSheets.length
                ] = sheet;
            });
    }

    set id(str) { this.node.id = str } */
}

export class Container extends Base {

    constructor(properties, nodename='div') {
        super();

        this.node = document.createElement(nodename);

        //Object.assign(this, properties);
        Object
            .entries(properties)
            .sort(([, x], [, y]) => { 
                return Array.isArray(x) 
                    ? -1 
                    : Array.isArray(y) 
                        ? 1 
                        : 0; 
            }).forEach(([key, value])=>{
            this[key] = value;
        });
        Object.freeze(this);
    }

    set id(str) { this.node.id = str }

    set children(arr) { 
        this.node.replaceChildren(
            ...arr.map(elem => elem.node)
        );
    }
}

export class App extends Component {

    static #css = `
    *,
    *::before,
    *::after {
        margin: 0;
        box-sizing: border-box;
        user-select: none;
    }

    *:focus { outline: none; }

    :root {
        --color-primary: var(--color-light-primary, 103, 80, 164);
        --color-primary-container: var(--color-light-primary-container, 234, 221, 255);
        --color-secondary: var(--color-light-secondary, 98, 91, 113);
        --color-secondary-container: var(--color-light-secondary-container, 232, 222, 248);
        --color-tertiary: var(--color-light-tertiary, 125, 82, 96);
        --color-tertiary-container: var(--color-light-tertiary-container, 255, 216, 228);
        --color-surface: var(--color-light-surface, 255, 251, 254);
        --color-surface-variant: var(--color-light-surface-variant, 231,224,236);
        --color-surface-container-lowest: var(--color-light-surface-container-lowest, 255, 255, 255);
        --color-surface-container-low: var(--color-light-surface-container-low, 247, 242, 247);
        --color-surface-container: var(--color-light-surface-container, 241, 236, 241);
        --color-surface-container-high: var(--color-light-surface-container-high, 236, 231, 235);
        --color-surface-container-highest: var(--color-light-surface-container-highest, 230, 225, 229);
        --color-background: var(--color-light-background, 255, 251, 254);
        --color-error: var(--color-light-error, 179, 38, 30);
        --color-error-container: var(--color-light-error-container, 249, 222, 220);
        --color-on-primary: var(--color-light-on-primary, 255, 255, 255);
        --color-on-primary-container: var(--color-light-on-primary-container, 33, 0, 94);
        --color-on-secondary: var(--color-light-on-secondary, 255, 255, 255);
        --color-on-secondary-container: var(--color-light-on-secondary-container, 30, 25, 43);
        --color-on-tertiary: var(--color-light-on-tertiary, 255, 255, 255);
        --color-on-tertiary-container: var(--color-light-on-tertiary-container, 55, 11, 30);
        --color-on-surface: var(--color-light-on-surface, 28, 27, 31);
        --color-on-surface-variant: var(--color-light-on-surface-variant, 73, 69, 78);
        --color-on-inverse-surface: var(--color-light-on-inverse-surface, 244, 239, 244);
        --color-on-error: var(--color-light-on-error, 255, 255, 255);
        --color-on-error-container: var(--color-light-on-error-container, 65, 14, 11);
        --color-on-background: var(--color-light-on-background, 28, 27, 31);
        --color-outline: var(--color-light-outline, 121, 116, 126);
        --color-outline-variant: var(--color-light-outline-variant, 196, 199, 197);
        --color-shadow: var(--color-light-shadow, 0, 0, 0);
        --color-surface-tint: var(--color-light-surface-tint, 103, 80, 164);
        --color-inverse-surface: var(--color-light-inverse-surface, 49, 48, 51);
        --color-inverse-primary: var(--color-light-inverse-primary, 208, 188, 255);
        --color-scrim: var(--color-light-scrim, 0, 0, 0);
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --color-primary: var(--color-dark-primary, 208, 188, 255);
            --color-primary-container: var(--color-dark-primary-container, 79, 55, 139);
            --color-secondary: var(--color-dark-secondary, 204, 194, 220);
            --color-secondary-container: var(--color-dark-secondary-container, 74, 68, 88);
            --color-tertiary: var(--color-dark-tertiary, 239, 184, 200);
            --color-tertiary-container: var(--color-dark-tertiary-container, 99, 59, 72);
            --color-surface: var(--color-dark-surface, 28, 27, 31);
            --color-surface-variant: var(--color-dark-surface-variant, 73,69,79);
            --color-surface-container-lowest: var(--color-dark-surface-container-lowest, 15, 14, 17);
            --color-surface-container-low: var(--color-dark-surface-container-low, 28, 27, 30);
            --color-surface-container: var(--color-surface-dark-container, 33, 31, 35);
            --color-surface-container-high: var(--color-dark-surface-container-high, 43, 41, 45);
            --color-surface-container-highest: var(--color-dark-surface-container-highest, 73, 69, 79);
            --color-background: var(--color-dark-background, 28, 27, 31);
            --color-error: var(--color-dark-error, 242, 184, 181);
            --color-error-container: var(--color-dark-error-container, 140, 29, 24);
            --color-on-primary: var(--color-dark-on-primary, 55, 30, 115);
            --color-on-primary-container: var(--color-dark-on-primary-container, 234, 221, 255);
            --color-on-secondary: var(--color-dark-secondary, 51, 45, 65);
            --color-on-secondary-container: var(--color-dark-on-secondary-container, 232, 222, 248);
            --color-on-tertiary: var(--color-dark-on-tertiary, 73, 37, 50);
            --color-on-tertiary-container: var(--color-dark-on-tertiary-container, 255, 216, 228);
            --color-on-surface: var(--color-dark-on-surface, 230, 225, 229);
            --color-on-surface-variant: var(--color-dark-on-surface-variant, 202, 196, 208);
            --color-on-inverse-surface: var(--color-dark-on-inverse-surface, 49, 48, 51);
            --color-on-error: var(--color-dark-on-error, 96, 20, 16);
            --color-on-error-container: var(--color-dark-on-error-container, 249, 222, 220);
            --color-on-background: var(--color-dark-on-background, 230, 225, 229);
            --color-outline: var(--color-dark-outline, 147, 143, 153);
            --color-outline-variant: var(--color-dark-outline-variant, 68, 71, 70);
            --color-shadow: var(--color-dark-shadow, 0, 0, 0);
            --color-surface-tint: var(--color-dark-surface-tint, 208, 188, 255);
            --color-inverse-surface: var(--color-dark-inverse-surface, 230, 225, 229);
            --color-inverse-primary: var(--color-dark-inverse-primary, 103, 80, 164);
            --color-scrim: var(--color-dark-scrim, 0, 0, 0);
        }
    }

    @keyframes linearFadeIn {
        0% { opacity: 1 }
        100% { opacity: 0 }
    }

    body, html/* , main */ {
        background-color: rgba(var(--color-surface), 1);
        position: relative;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
    }

    button {
        border: none;
        background: none;
    }

    html {
        font-size: 6.25%;
    }

    main {
        height: 100%;
    }
    ` /* #css */

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties, "afterbegin", `<main><div/></main>`)
    }
}