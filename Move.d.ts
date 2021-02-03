import { Action, IAction } from '@civ-clone/core-unit/Action';
export interface IMove extends IAction {
  movementCost(): number;
  validate(): boolean;
}
export declare class Move extends Action implements IMove {
  perform(): boolean;
  movementCost(): number;
  validate(): boolean;
}
export default Move;
