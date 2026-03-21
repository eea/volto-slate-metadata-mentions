import { slateBeforeEach, slateAfterEach } from '../support/e2e';

const API_PATH = Cypress.env('API_PATH') || 'http://localhost:8080/Plone';
const AUTH = {
  user: 'admin',
  pass: 'admin',
};

const setMetadataMentionBlocks = () =>
  cy.request({
    method: 'PATCH',
    url: `${API_PATH}/cypress/my-page`,
    headers: {
      Accept: 'application/json',
    },
    auth: AUTH,
    body: {
      description: 'blue cats sleep',
      blocks: {
        title: {
          '@type': 'title',
        },
        slate: {
          '@type': 'slate',
          plaintext: 'Colorless blue cats sleep furiously.',
          value: [
            {
              type: 'p',
              children: [
                { text: 'Colorless ' },
                {
                  type: 'mention',
                  data: {
                    metadata: 'description',
                    widget: 'string',
                    description: 'blue cats sleep',
                  },
                  children: [{ text: 'green ideas sleep' }],
                },
                { text: ' furiously.' },
              ],
            },
          ],
        },
      },
      blocks_layout: {
        items: ['title', 'slate'],
      },
    },
  });

const getVisibleSlateToolbarButton = (title) =>
  cy
    .get('.slate-inline-toolbar')
    .filter(':visible')
    .last()
    .find(`.button-wrapper a[title="${title}"]`)
    .last();

const openMetadataPopup = () => {
  getVisibleSlateToolbarButton('Metadata').trigger('mousedown', {
    force: true,
  });
  cy.wait(300);
  cy.get('body').then(($body) => {
    const editButton = $body.find(
      '.slate-inline-toolbar:visible .button-wrapper a[title="Edit metadata"]',
    );

    if (editButton.length) {
      cy.wrap(editButton.last()).trigger('mousedown', { force: true });
    }
  });
  cy.contains('Metadata entry').should('exist');
};

describe('Block Tests: Metadata', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('allows adding, removing, and re-adding metadata mentions in the editor', () => {
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.')
      .type('{selectAll}')
      .dblclick();

    cy.setSlateCursor('Colorless').dblclick();
    cy.setSlateSelection('Colorless', 'green');
    openMetadataPopup();

    cy.get('#field-metadata').click();
    cy.focused().type('Publishing Date{enter}', { force: true });
    cy.contains('Metadata entry').parent().find('button').first().click();

    cy.setSlateSelection('Colorless', 'green');
    cy.clickSlateButton('Remove metadata');

    cy.setSlateCursor('Colorless').dblclick();
    cy.setSlateSelection('green', 'sleep');
    openMetadataPopup();

    cy.get('#field-metadata').click();
    cy.focused().type('Summary{enter}', { force: true });
    cy.get('#blockform-fieldset-metadata #field-description').type(
      'blue cats sleep',
    );
    cy.contains('Metadata entry').parent().find('button').first().click();

    cy.toolbarSave();
    cy.contains('Colorless blue cats sleep furiously.');
  });

  it('renders saved metadata mentions', () => {
    setMetadataMentionBlocks();
    cy.visit('/cypress/my-page');
    cy.waitForResourceToLoad('my-page');

    cy.contains('Colorless blue cats sleep furiously.');
  });

  it('renders metadata mention node in editor', () => {
    setMetadataMentionBlocks();
    cy.visit('/cypress/my-page/edit');

    cy.get('.block.title h1').should('exist');
    cy.get('.block.slate').should('exist');
    cy.get('#toolbar-save').click();
    cy.url().should('include', '/cypress/my-page');
  });
});
