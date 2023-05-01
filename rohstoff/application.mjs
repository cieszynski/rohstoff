
export class Component {
    constructor(properties, position, html) {
        console.assert(["afterbegin", "beforeend"].includes(position));

        document.body.insertAdjacentHTML(
            position,
            html
        );

        this.node = {
            "afterbegin": document.body.firstElementChild,
            "beforeend": document.body.lastElementChild
        }[position]

        Object.assign(this, properties);
        Object.freeze(this);
    }

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

    set child(elem) { this.node.firstElementChild.replaceWith(elem.node); }
}

export class Element {

    constructor(properties, ...elements) {
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

        Object.assign(this, properties);
        Object.freeze(this);
    }

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
        --color-secondary-container: var(--color-light-secondary-container, 232, 222, 248);
        --color-surface: var(--color-light-surface, 255, 251, 254);
        --color-on-primary: var(--color-light-on-primary, 255, 255, 255);
        --color-on-secondary-container: var(--color-light-on-secondary-container, 30, 25, 43);
        --color-on-surface: var(--color-light-on-surface, 28, 27, 31);
        --color-outline: var(--color-light-outline, 121, 116, 126);
        --color-surface-container-highest: var(--color-light-surface-container-highest, 230, 225, 229);
        --color-shadow: 0, 0, 0;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --color-primary: var(--color-dark-primary, 208, 188, 255);
            --color-secondary-container: var(--color-dark-secondary-container, 74, 68, 88);
            --color-surface: var(--color-dark-surface, 28, 27, 31);
            --color-on-primary: var(--color-dark-on-primary, 55, 30, 115);
            --color-on-secondary-container: var(--color-dark-on-secondary-container, 232, 222, 248);
            --color-on-surface: var(--color-dark-on-surface, 230, 225, 229);
            --color-outline: var(--color-dark-outline, 147, 143, 153);
            --color-surface-container-highest: var(--color-dark-surface-container-highest, 73, 69, 79);
            --color-shadow: 0, 0, 0;
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

    html {
        font-size: 6.25%;
    }
    ` /* #css */

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties, "afterbegin", `<main><div/></main>`)
    }
}