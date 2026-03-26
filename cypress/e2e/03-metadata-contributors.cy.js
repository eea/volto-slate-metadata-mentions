import { slateBeforeEach, slateAfterEach } from '../support/e2e';
import {
  addMetadataMention,
  getMentionNodes,
  setContributorsMetadataValue,
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

describe('Block Tests: Metadata contributors', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('renders contributors metadata mentions after save', () => {
    createContributorsMention();

    cy.toolbarSave();
    cy.get('#page-document').should('contain.text', 'John Doe');
  });

  it('stores contributors metadata mention data in the slate JSON', () => {
    createContributorsMention();

    cy.toolbarSave();
    getMentionNodes().then((mentions) => {
      expect(mentions).to.have.length(1);
      expect(mentions[0].data).to.deep.equal({
        contributors: ['John Doe'],
        metadata: 'contributors',
        widget: 'array',
      });
    });
  });
});
