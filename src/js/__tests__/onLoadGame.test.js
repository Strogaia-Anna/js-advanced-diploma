import GameStateService from "../GameStateService";
import GameController from "../GameController";
import GamePlay from "../GamePlay";
import GameState from "../GameState";
jest.mock("../GameStateService");
jest.mock("../GamePlay");

beforeEach(() => {
    jest.resetAllMocks();
})

test('should load data', () => {
    const stateService = new GameStateService(null);
    const gamePlay = new GamePlay();
    stateService.load.mockReturnValue('{"positionedCharacters": []}')

    const gameCtrl = new GameController(gamePlay, stateService);
    gameCtrl.gameState = new GameState(8, [{characters: []}, {characters: []}], [[], []], 0);
    gameCtrl.onLoadGame();
    expect(gameCtrl.gameState).toEqual( {"boardSize": undefined, "level": undefined, "positionedCharacters": [], "turn": undefined});
});

test('should be mistake', () => {
    const stateService = new GameStateService(null);
    GamePlay.showError.mockImplementation(() => {});
    const gamePlay = new GamePlay();
    
    stateService.load.mockImplementation(() => {
        throw new Error('Invalid state');
    })

    const gameCtrl = new GameController(gamePlay, stateService);
    gameCtrl.gameState = new GameState(8, [{characters: []}, {characters: []}], [[], []], 0);
    gameCtrl.onLoadGame();
    expect(GamePlay.showError).toHaveBeenCalledWith('Invalid state');
});
