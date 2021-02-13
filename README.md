#mchess

An expo web and mobile app for playing chess variants, their combinations, and formats of variants.

## Setup
TODO: Add more detailed installation instructions
1. Make sure npm and yarn have been installed on your machine
2. `yarn install`

## Start
`yarn web` or `yarn ios`

## Testing
`yarn test` or `yarn test <test_name_fragment>`

#### Test writing helpers
To use of the test writing helper comments:
1. Search for `TEST WRITING HELPER COMMENT` and uncomment each of these lines
2. Start a new game from the variant select screen
3. Do the moves/presses of the situation you want to test
4. Copy the logs into an `it` block of a test file
5. Remove the file/line references (hint: `ctrl + D` on `.ts:`)
6. Complete comments and remove excessive expects about allowable moves
7. Add expectations specific to the scenario you're testing
8. Revert the changes to the files with the `TEST WRITING HELPER COMMENT` lines, restoring them to commented single-lines


## Design

#### Interruption points and rules
TODO: info about adding a new interruption point
The constant `ruleOrderPerInterruptionPoint` determines execution order for rules at the mentioned interruption point.
1. Found in the file `CompactRules.ts`
2. The order rules are written in is the order they will be executed in.
3. Rules are referenced by their name, `theRest` referes to all the rules not mentioned in the list.
4. If an interuption point is not listed below then the rules will have default ordering for that interruption point.

#### Events
TODO

#### Game master, game provider, game, and online game master
TODO