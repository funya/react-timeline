'use strict';
import { ALLOW_BATCH_SELECTION, CLEAR_BATCH } from '../actions/types';


export default function batchSelectionState(state = false, action = null) {
  switch (action.type) {

    case ALLOW_BATCH_SELECTION:
      // console.log(`Action <${action.type}> executed with payload `, action.payload);
      return action.payload === undefined
        ? !state
        : action.payload;

    case CLEAR_BATCH:
      // console.log(`Action <${action.type}> executed with empty payload.`);
      state = false;

    default:
      // console.log(`Action <${action.type}> unrecognized. Falling back to original state.`);
      return state;
  }
};
