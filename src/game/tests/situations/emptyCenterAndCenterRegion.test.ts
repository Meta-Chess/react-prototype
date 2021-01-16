import { toLocation } from "utilities";
import { GameMaster } from "game/GameMaster";
import { mockRenderer } from "../helpers/mockRenderer";
import { calculateGameOptions } from "components/RootStackNavigator/VariantSelectScreen/ScreenStateFunctions/calculateGameOptions";

describe("With empty center", () => {
  it("center pawns only have one allowable move on a standard board", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({}, ["emptyCenter"]),
        mockRenderer
      )
    );

    // White center pawns
    gameMaster.onPress(toLocation({ rank: 2, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 2, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);

    // Black center pawns
    gameMaster.onPress(toLocation({ rank: 7, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 7, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
  });
  it("center pawn has no allowable move on a hex board", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({}, ["emptyCenter", "hex"]),
        mockRenderer
      )
    );

    // White center pawn
    gameMaster.onPress(toLocation({ rank: 9, file: 6 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);

    // Black center pawn
    gameMaster.onPress(toLocation({ rank: 13, file: 6 }));
    expect(gameMaster.allowableMoves.length).toEqual(0);
  });
  it("center pawns only have one allowable move on a toroidal board", () => {
    const gameMaster = new GameMaster(
      ...GameMaster.processConstructorInputs(
        calculateGameOptions({}, ["emptyCenter", "toroidal"]),
        mockRenderer
      )
    );

    // White center pawns
    gameMaster.onPress(toLocation({ rank: 3, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 3, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 5, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 5, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);

    // Black center pawns
    gameMaster.onPress(toLocation({ rank: 10, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 10, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 12, file: 4 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
    gameMaster.onPress(toLocation({ rank: 12, file: 5 }));
    expect(gameMaster.allowableMoves.length).toEqual(1);
  });
});
