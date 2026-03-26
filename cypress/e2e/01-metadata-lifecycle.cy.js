import { slateBeforeEach, slateAfterEach } from '../support/e2e';
import {
  addMetadataMention,
  setDescriptionMetadataValue,
} from '../support/metadata';

describe('Block Tests: Metadata lifecycle', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('allows adding, removing, and re-adding metadata mentions in the editor', () => {
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.')
      .type('{selectAll}')
      .dblclick();

    addMetadataMention({
      cursorText: 'Colorless',
      selectionStart: 'Colorless',
      selectionEnd: 'green',
      metadataLabel: 'Publishing Date',
    });

    cy.setSlateSelection('Colorless', 'green');
    cy.clickSlateButton('Remove metadata');

    addMetadataMention({
      cursorText: 'Colorless',
      selectionStart: 'green',
      selectionEnd: 'sleep',
      metadataLabel: 'Summary',
      setValue: () => setDescriptionMetadataValue('blue cats sleep'),
    });

    cy.toolbarSave();
    cy.contains('Colorless blue cats sleep furiously.');
  });
});
