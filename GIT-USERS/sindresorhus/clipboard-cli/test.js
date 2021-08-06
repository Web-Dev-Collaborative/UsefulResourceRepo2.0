import test from 'ava';
import execa from 'execa';

test('main', async t => {
	const input = '🦄';
	await execa('./cli.js', {input});

	t.is(await execa.stdout('./cli.js', {
		env: {
			...process.env,
			STDIN: 0
		}
	}), input);
});
