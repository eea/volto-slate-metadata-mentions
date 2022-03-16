import { slateBeforeEach, slateAfterEach } from '../support';

describe('Block Tests: Metadata', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('As editor I can add metadata mentions', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // // Metadata mention
    // cy.setSlateSelection('sleep', 'furiously');
    // cy.clickSlateButton('Metadata');

    // cy.get('.sidebar-container div[id="field-id"]')
    //   .click({ multiple: true })
    //   .type('Publishing Date{enter}');
    // cy.get('.sidebar-container .form .header button:first-of-type').click();

    // // Remove link
    // cy.setSlateSelection('sleep');
    // cy.clickSlateButton('Remove metadata');

    // // Re-add link
    // cy.setSlateSelection('green', 'sleep');
    // cy.clickSlateButton('Metadata');

    // cy.get('.sidebar-container div[id="field-id"]')
    //   .click({ multiple: true })
    //   .type('Summary{enter}');
    // cy.get('.sidebar-container [id="blockform-fieldset-metadata"] textarea')
    //   .click({ multiple: true })
    //   .type('blue cats sleep');
    // cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.contains('Colorless green ideas sleep furiously.');
  });
});
