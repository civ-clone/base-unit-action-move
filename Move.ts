import { Moved, IMovedRegistry } from '@civ-clone/core-unit/Rules/Moved';
import {
  MovementCost,
  IMovementCostRegistry,
} from '@civ-clone/core-unit/Rules/MovementCost';
import {
  ValidateMove,
  IValidateMoveRegistry,
} from '@civ-clone/core-unit/Rules/ValidateMove';
import Action from '@civ-clone/core-unit/Action';

export class Move extends Action {
  perform(): boolean {
    const [
        moveCost,
      ]: number[] = (this.ruleRegistry() as IMovementCostRegistry)
        .process(MovementCost, this.unit(), this)
        .sort((a: number, b: number): number => a - b),
      [
        valid,
      ]: boolean[] = (this.ruleRegistry() as IValidateMoveRegistry).process(
        ValidateMove,
        this.unit(),
        moveCost
      );

    if (!valid) {
      return false;
    }

    this.unit().setTile(this.to());
    (this.ruleRegistry() as IMovedRegistry).process(Moved, this.unit(), this);

    return true;
  }
}

export default Move;
