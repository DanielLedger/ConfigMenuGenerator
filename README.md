# Config auto-generator

The name explains what it does. Using it is pretty trivial too:

0) Include it in your page:
`<script src='cfgmgen.js'>`
1) Obtain a javascript object you want to edit:
`var obj = {a: {b: 5}, c: 'test', d: true};`
2) Initialise the configuration (options are mentioned later):
`var cfg = new ConfigMenu(obj, opt);`
3) Listen to it's onchange event. Note that unlike normal this is sync, not async.
`cfg.addEventListener('change', () => {/\*whatever\*/});`
4) Display it!
`cfg.display(document.getElementById('config'));`

## Options

The options are fed in with another javascript object, and are structured as follows.

Each possible option in the other object has a key in the options object which is `<key>_options`.
This works recursively also (so in the above example, options for 'b' would be at `a.b_options`).
You can also specify global defaults using the key `_options`.

### Global options.

These work on all possible forms of input:

- classes: The list of HTML classes inputs should have. Either a space-delimited string or an array of strings.
- displayName: The name to display when showing the option, instead of the key's name. 