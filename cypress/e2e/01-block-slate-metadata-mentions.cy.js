import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Block Tests: Metadata', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('As editor I can add metadata mentions', function () {
    cy.get('.slate-editor [contenteditable=true]')
      .focus()
      .click()
      .wait(1000)
      .type('Colorless green ideas sleep furiously.{selectall}');

    cy.clickSlateButton('Metadata');
    cy.contains('Colorless green ideas sleep furiously.');

    cy.get('.sidebar-container div[id="field-metadata"]').type(
      'Publishing Date{enter}',
    );
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Remove link
    cy.get('.slate-editor [contenteditable=true]').type('{selectall}');
    cy.clickSlateButton('Remove metadata');

    cy.get('.slate-editor [contenteditable=true]').type('{selectall}');
    cy.clickSlateButton('Metadata');

    cy.get('.sidebar-container div[id="field-metadata"]').type(
      'Summary{enter}',
    );
    cy.get(
      '.sidebar-container [id="blockform-fieldset-metadata"] [id="field-description"]',
    ).type('Colorless blue cats sleep furiously.');
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.contains('Colorless blue cats sleep furiously.');
  });
});
