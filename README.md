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
This works recursively also (so in the above example, options for 'b' would be at `a_b_options`).
You can also specify global defaults using the key `_options`.

Note that it is inheriting (so d_options will override the global classes, in the below example).

Example:
`
    {
        _options: {
            classes: ['w3-input']
        },
        a_options: {
            displayName: 'Option 1'
        },
        a_b_options: {
            displayName: 'Option 2'
        },
        d_options: {
            displayName: 'Option 4',
            classes: ['w3-check']
        },
        c_options: {
            displayName: 'Option 3'
        }
    }
`

### Global options.

These work on all possible forms of input:

- classes: The list of HTML classes inputs should have. Either a space-delimited string or an array of strings.
- displayName: The name to display when showing the option, instead of the key's name. Doesn't inherit (as that'd be dumb).