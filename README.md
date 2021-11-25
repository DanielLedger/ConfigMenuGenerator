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
You can also specify defaults for a section using the key `<section key>_goptions`.

Note that it is inheriting (so d_options will override the global classes, in the below example).

Example:
`
    {
        _goptions: {
            classes: ['w3-input']
        },
        a_goptions: {
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
            displayName: 'Option 3',
            disabled: true
        }
    }
`

### Global options.

These work on all possible forms of input, and also section containers:

- classes: The list of HTML classes inputs should have. Either a space-delimited string or an array of strings.
- labelClasses: The list of HTML classes labels should have. Same as above.
- displayName: The name to display when showing the option, instead of the key's name. Doesn't inherit (as that'd be dumb).

### Global input options.

These work on all forms of input, but not section containers:

- disabled: Should the control be read-only/disabled? Note that this is purely asthetic and can be trivially bypassed, so validate this
            serverside as well.

### String input options.

These only work on inputs of type string:

- options: What are the allowed options for a given input. Note that this is purely asthetic: a clever user can easily bypass
           this, so it MUST be validated serverside as well. This automatically converts the input to a `select` field. Won't inherit.
- type: If options is not defined, controls what type of input is expected. Can be anything from the following:
    - color
    - date
    - datetime-local
    - hidden
    - email
    - password
    - search
    - tel
    - time
    - url

    Note that validation MUST always be done serverside as well, this is purely for asthetics.

### Number input options.

These options only work on inputs of type number:

- exact: Should we use an exact input or a range slider? Note that if this is false (i.e. using a range slider) min and max must be specified.
- min: The lowest value permitted. As always, validate this serverside since bypassing it is trivial.
- max: The highest value permitted. As above, validate this.
- step: The step permitted. As you may expect, this also must be validated serverside.