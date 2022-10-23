"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Move = void 0;
const Action_1 = require("@civ-clone/core-unit/Action");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const MovementCost_1 = require("@civ-clone/core-unit/Rules/MovementCost");
const ValidateMove_1 = require("@civ-clone/core-unit/Rules/ValidateMove");
class Move extends Action_1.Action {
    perform() {
        if (!this.validate()) {
            return false;
        }
        this.unit().setTile(this.to());
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
        return true;
    }
    movementCost() {
        const [moveCost] = this.ruleRegistry()
            .process(MovementCost_1.default, this.unit(), this)
            .sort((a, b) => a - b);
        return moveCost;
    }
    validate() {
        const [valid] = this.ruleRegistry().process(ValidateMove_1.default, this.unit(), this.movementCost());
        return valid;
    }
}
exports.Move = Move;
exports.default = Move;
//# sourceMappingURL=Move.js.map