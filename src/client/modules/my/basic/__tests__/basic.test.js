import { createElement } from 'lwc';
import Basic from 'my/basic';
import { afterEach, beforeEach, describe, it } from '@jest/globals';

describe('ccm-popover', () => {
    const title = 'this is a title';

    const element = createElement('ccm-basic', {
        is: Basic
    });

    beforeEach(() => {
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    element.title = title;

    it('title anchor has value of title attribute', () => {
        const titleAnchor = element.shadowRoot.querySelector('h3 a');
        expect(titleAnchor).toHaveProperty('title', title);
    });
});
