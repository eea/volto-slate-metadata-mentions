import { slateBeforeEach, slateAfterEach } from '../support/e2e';
import {
  addMetadataMention,
  getMentionNodes,
  openDocumentInEditMode,
  setContributorsMetadataValue,
  setDescriptionMetadataValue,
} from '../support/metadata';

const createContributorsMention = (value = 'John Doe') => {
  cy.getSlateEditorAndType('Alpha beta gamma delta.');
  addMetadataMention({
    cursorText: 'Alpha',
    selectionStart: 'beta',
    metadataLabel: 'Contributors',
    setValue: () => setContributorsMetadataValue(value),
  });
};

describe('Block Tests: Existing metadata mentions', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('updates an existing mention when changing its metadata type', () => {
    createContributorsMention();

    cy.toolbarSave();
    openDocumentInEditMode();

    addMetadataMention({
      cursorText: 'Alpha',
      selectionStart: 'beta',
      metadataLabel: 'Summary',
      setValue: () => setDescriptionMetadataValue('Updated summary'),
    });

    cy.toolbarSave();
    cy.get('#page-document').should('contain.text', 'Updated summary');
    cy.get('#page-document').should('not.contain.text', 'John Doe');

    getMentionNodes().then((mentions) => {
      expect(mentions).to.have.length(1);
      expect(mentions[0].data).to.deep.equal({
        description: 'Updated summary',
        metadata: 'description',
        widget: 'description',
      });
    });
  });

  it('restores the original text when removing a saved metadata mention', () => {
    createContributorsMention();

    cy.toolbarSave();
    openDocumentInEditMode();

    cy.setSlateCursor('Alpha').dblclick();
    cy.setSlateSelection('beta');
    cy.clickSlateButton('Remove metadata');

    cy.toolbarSave();
    cy.get('#page-document').should('contain.text', 'Alpha beta gamma delta.');

    getMentionNodes().then((mentions) => {
      expect(mentions).to.have.length(0);
    });
  });
});
