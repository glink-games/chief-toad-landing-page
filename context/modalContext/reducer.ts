/* eslint-disable no-case-declarations */
import {
  OPEN_MINTING_MODAL,
  CLOSE_MINTING_MODAL,
  OPEN_WELCOME_MODAL,
  CLOSE_WELCOME_MODAL,
} from '../actionType';
import { IAppContextState } from '.';

export interface IAction {
  type:
    | typeof OPEN_MINTING_MODAL
    | typeof CLOSE_MINTING_MODAL
    | typeof OPEN_WELCOME_MODAL
    | typeof CLOSE_WELCOME_MODAL;
  value: any;
}

const ModalReducer = (
  state: IAppContextState,
  action: IAction
): IAppContextState => {
  switch (action.type) {
    case OPEN_MINTING_MODAL:
      return {
        ...state,
        toggleMintingModal: true,
      };
    case CLOSE_MINTING_MODAL:
      return {
        ...state,
        toggleMintingModal: false,
      };
    case OPEN_WELCOME_MODAL:
      return {
        ...state,
        toggleWelcomeModal: true,
      };
    case CLOSE_WELCOME_MODAL:
      return {
        ...state,
        toggleWelcomeModal: false,
      };
    default:
      return state;
  }
};

export default ModalReducer;
