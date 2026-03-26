export const CONTENT_PATH = 'cypress/my-page';

export const getVisibleSlateToolbarButton = (title) =>
  cy
    .get('.slate-inline-toolbar')
    .filter(':visible')
    .last()
    .find(`.button-wrapper a[title="${title}"]`)
    .last();

export const openMetadataPopup = () => {
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

export const confirmMetadataPopup = () => {
  cy.contains('Metadata entry').parent().find('button').first().click();
};

export const chooseMetadataField = (label) => {
  cy.get('#field-metadata').click();
  cy.focused().type(`${label}{enter}`, { force: true });
};

export const setDescriptionMetadataValue = (value) => {
  cy.get('#blockform-fieldset-metadata #field-description').clear().type(value);
};

export const setContributorsMetadataValue = (value) => {
  cy.get('#blockform-fieldset-metadata #field-contributors').click();
  cy.focused().type(`${value}{enter}`, { force: true });
};

export const addMetadataMention = ({
  cursorText,
  selectionStart,
  selectionEnd,
  metadataLabel,
  setValue,
}) => {
  cy.setSlateCursor(cursorText).dblclick();
  cy.setSlateSelection(selectionStart, selectionEnd);
  openMetadataPopup();
  chooseMetadataField(metadataLabel);

  if (setValue) {
    setValue();
  }

  confirmMetadataPopup();
};

export const openDocumentInEditMode = () => {
  cy.navigate(`/${CONTENT_PATH}/edit`);
  cy.url().should('include', `/${CONTENT_PATH}/edit`);
  cy.get('.block.title h1').should('exist');
};

export const getSlateBlock = (path = CONTENT_PATH) => {
  return cy.readContent(path).then((content) => {
    return Object.values(content.blocks).find(
      (block) => block['@type'] === 'slate',
    );
  });
};

export const getMentionNodes = (path = CONTENT_PATH) => {
  return getSlateBlock(path).then((block) => {
    return block.value[0].children.filter((node) => node.type === 'mention');
  });
};
