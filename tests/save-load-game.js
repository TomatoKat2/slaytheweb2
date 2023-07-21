// @ts-ignore
import test from 'ava'
import actions from '../src/game/actions.js'
import {encodeState, decodeState} from '../src/ui/save-load.js'
// import {saveGame, loadGame} from '../src/ui/save-load.js'

// Each test gets a fresh dungeon with a dungeon and cards.
test.beforeEach((t) => {
	let state = actions.createNewGame()
	state = actions.setDungeon(state)
	state = actions.addStarterDeck(state)
	t.context = {state}
})

test('can encode game state', (t) => {
	const {state} = t.context
	const x = encodeState(state)
	t.is(typeof x, 'string')
})

test('can decode game state', (t) => {
	const {state} = t.context
	// Encode it
	const encoded = encodeState(state)
	// Decode again
	const decoded = decodeState(encoded)
	// Verify that we have what we need
	t.is(typeof decoded, 'object')

	t.is(typeof state.deck[0].upgrade, 'function')
	t.is(typeof decoded.deck[0].upgrade, 'function', 'cards still have upgrade() method)')

	const a = state.dungeon.graph[0][0]
	const b = decoded.dungeon.graph[0][0]
	// console.log(a)
	// console.log(b)
	t.truthy(a.edges.size > 0)
	t.truthy(b.edges.size > 0, 'node has "edges"')
})

