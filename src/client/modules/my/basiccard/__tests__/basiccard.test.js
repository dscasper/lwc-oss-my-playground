import { createElement } from 'lwc';
import BasicCard from 'my/basiccard';
import { afterEach, describe, expect, it } from '@jest/globals';

describe('my-basiccard', () => {

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays greeting', () => {
        // Create element
        const element = createElement('my-basiccard', {
            is: BasicCard
        });
        document.body.appendChild(element);


        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('div');
        expect(div).toBeTruthy();
        expect(div.textContent).toBe('Hello, World!');
    });


});
