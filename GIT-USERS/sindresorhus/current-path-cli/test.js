import test from 'ava';
import execa from 'execa';

test(async t => {
	t.truthy(await execa.stdout('./cli.js', {cwd: __dirname}));
});
