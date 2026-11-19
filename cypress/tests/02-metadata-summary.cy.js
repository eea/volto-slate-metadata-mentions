import { slateBeforeEach, slateAfterEach } from '../support/e2e';
import {
  addMetadataMention,
  getMentionNodes,
  setDescriptionMetadataValue,
} from '../support/metadata';

const createSummaryMention = (value = 'Mentioned summary') => {
  cy.getSlateEditorAndType('Alpha beta gamma delta.');
  addMetadataMention({
    cursorText: 'Alpha',
    selectionStart: 'gamma',
    metadataLabel: 'Summary',
    setValue: () => setDescriptionMetadataValue(value),
  });
};

describe('Block Tests: Metadata summary', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('renders summary metadata mentions after save', () => {
    createSummaryMention();

    cy.toolbarSave();
    cy.get('#page-document').should('contain.text', 'Mentioned summary');
  });

  it('stores summary metadata mention data in the slate JSON', () => {
    createSummaryMention();

    cy.toolbarSave();
    getMentionNodes().then((mentions) => {
      expect(mentions).to.have.length(1);
      expect(mentions[0].data).to.deep.equal({
        description: 'Mentioned summary',
        metadata: 'description',
        widget: 'description',
      });
    });
  });
});
