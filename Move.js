"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const MovementCost_1 = require("@civ-clone/core-unit/Rules/MovementCost");
const ValidateMove_1 = require("@civ-clone/core-unit/Rules/ValidateMove");
const Action_1 = require("@civ-clone/core-unit/Action");
class Move extends Action_1.default {
    perform() {
        const [moveCost,] = this.ruleRegistry()
            .process(MovementCost_1.MovementCost, this.unit(), this)
            .sort((a, b) => a - b), [valid,] = this.ruleRegistry().process(ValidateMove_1.ValidateMove, this.unit(), moveCost);
        if (!valid) {
            return false;
        }
        this.unit().setTile(this.to());
        this.ruleRegistry().process(Moved_1.Moved, this.unit(), this);
        return true;
    }
}
exports.Move = Move;
exports.default = Move;
//# sourceMappingURL=Move.js.map