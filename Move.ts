import { Action, IAction } from '@civ-clone/core-unit/Action';
import { Moved, IMovedRegistry } from '@civ-clone/core-unit/Rules/Moved';
import {
  MovementCost,
  IMovementCostRegistry,
} from '@civ-clone/core-unit/Rules/MovementCost';
import {
  ValidateMove,
  IValidateMoveRegistry,
} from '@civ-clone/core-unit/Rules/ValidateMove';

export interface IMove extends IAction {
  movementCost(): number;
  validate(): boolean;
}

export class Move extends Action implements IMove {
  perform(): boolean {
    if (!this.validate()) {
      return false;
    }

    this.unit().setTile(this.to());
    (this.ruleRegistry() as IMovedRegistry).process(
      Moved,
      this.unit(),
      this as Action
    );

    return true;
  }

  movementCost(): number {
    const [
      moveCost,
    ]: number[] = (this.ruleRegistry() as IMovementCostRegistry)
      .process(MovementCost, this.unit(), this as Action)
      .sort((a: number, b: number): number => a - b);

    return moveCost;
  }

  validate(): boolean {
    const [
      valid,
    ]: boolean[] = (this.ruleRegistry() as IValidateMoveRegistry).process(
      ValidateMove,
      this.unit(),
      this.movementCost()
    );

    return valid;
  }
}

export default Move;
