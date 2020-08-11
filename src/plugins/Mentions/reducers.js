import { EDITOR } from './constants';

const initialState = {};

export function mention_editor(state = initialState, action = {}) {
  switch (action.type) {
    case EDITOR:
      return {
        ...state,
        show: action.show,
      };
    default:
      return state;
  }
}
