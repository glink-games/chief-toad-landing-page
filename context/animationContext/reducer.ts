/* eslint-disable no-case-declarations */
import { ANIMATION } from '../actionType';
import { IAppContextState } from '.';

export interface IAction {
  type: typeof ANIMATION;
  value: any;
}

const AnimationReducer = (
  state: IAppContextState,
  action: IAction
): IAppContextState => {
  switch (action.type) {
    case ANIMATION:
      return {
        ...state,
        animationTriggered: true,
      };
    default:
      return state;
  }
};

export default AnimationReducer;
