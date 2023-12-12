import { slateBeforeEach, slateAfterEach } from '../support/e2e';

function setSlateTextSelection(textToSelect) {
  cy.get('.slate-editor [contenteditable=true] p span span span').then(
    ($el) => {
      const el = $el[0];
      const text = el.textContent;
      const start = text.indexOf(textToSelect);
      const end = start + textToSelect.length;

      cy.window().then((window) => {
        const selection = window.getSelection();
        const range = window.document.createRange();
        range.setStart(el.firstChild, start);
        range.setEnd(el.firstChild, end);
        selection.removeAllRanges();
        selection.addRange(range);
        selection.extend(el.firstChild, end);
      });
    },
  );
}

describe('Block Tests: Metadata', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('As editor I can add metadata mentions', function () {
    cy.get('.slate-editor [contenteditable=true]')
      .focus()
      .click()
      .wait(1000)
      .type('Colorless green ideas sleep furiously.');

    // Select the text 'green ideas'
    setSlateTextSelection('green ideas');
    cy.clickSlateButton('Metadata');

    cy.get('.sidebar-container div[id="field-metadata"]').type(
      'Publishing Date{enter}',
    );
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Remove link
    cy.contains('green ideas').click();
    cy.clickSlateButton('Remove metadata');

    // Re-add link
    cy.wait(1000);

    // Select the text 'green ideas' again
    setSlateTextSelection('green ideas');
    cy.clickSlateButton('Metadata');

    cy.get('.sidebar-container div[id="field-metadata"]').type(
      'Summary{enter}',
    );
    cy.get(
      '.sidebar-container [id="blockform-fieldset-metadata"] [id="field-description"]',
    ).type('blue cats');
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.contains('Colorless blue cats sleep furiously.');
  });
});
