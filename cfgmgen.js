class ConfigMenu extends EventTarget{
    /*
    * A config menu representation.
    */

    constructor (configuring, options){
        super(); //Important
        //configuring is the object we're configuring, options are the object options (I'll get back to that)
        this.__conf = configuring;
        this.__opt = options;
    }

    display (parent){
        //Displays in 'parent' which should obviously be an html element of some kind.
        this.__render(parent, this.__conf, "", this.__opt);
    }

    __render(parent, obj, rootKey, options){
        //Renders a given object's config. Currently very basic.
        for (var key in obj){
            var val = obj[key];

            var fullPath = "";
            if (rootKey !== ''){
                fullPath = rootKey + ".";
            }
            fullPath += key;
            if (typeof (val) === 'object'){
                //Create a submenu. Will have to nick some code from W3Schools to make this look nicer at some point.
                var submenu = document.createElement('div');
                var heading = document.createElement('h4');
                heading.innerText = key;
                submenu.appendChild(heading);
                this.__render(submenu, val, fullPath, options);
                parent.appendChild(submenu);
                continue;
            }
            var inp = document.createElement('input');
            var lbl = document.createElement('label');
            //TODO: Deal with options we get given to handle stuff like names.
            lbl.innerText = key;
            lbl.id = `lbl-${fullPath}`;

            inp.id = `in-${fullPath}`;

            lbl.setAttribute('for', inp.id);
            switch (typeof(val)){
                case 'string':
                    //Set up the event listener.
                    var f = function (us, key, input){ //Need to do this to take a local copy of all these variables because JS is dumb.
                        input.onchange = (e) => {
                            //Edit our backing object.
                            us.__edit(key, input.value);
                        };
                    }
                    f(this, `${fullPath}`, inp);
                    //Set the default value to what it is at the moment.
                    inp.value = val;
                    break;
                case 'number':
                    //Set the type of this input to be a number entry.
                    inp.setAttribute('type', 'number');
                    //Set up the event listener.
                    var f = function (us, key, input){
                        input.onchange = (e) => {
                            //Edit our backing object.
                            us.__edit(key, Number(input.value));
                        };
                    }
                    f(this, `${fullPath}`, inp);
                    //Set the default value to what it is at the moment.
                    inp.value = val;
                    break;
                case 'boolean':
                    //Set the type of this input to be a checkbox.
                    inp.setAttribute('type', 'checkbox');
                    //Set up the event listener.
                    var f = function (us, key, input){
                        input.onchange = (e) => {
                            //Edit our backing object.
                            us.__edit(key, input.checked);
                        };
                    }
                    f(this, `${fullPath}`, inp);
                    //Set the default value to what it is at the moment.
                    inp.checked = val;
                    break;
                default:
                    console.warn('Uncaught value got through.');
                    console.warn(val);
                    continue;
            }
            //Add these objects to the parents, followed by a linebreak.
            parent.appendChild(lbl);
            parent.appendChild(inp);
            parent.appendChild(document.createElement('br'));
            
        }
    }

    __edit(key, value){
        //Edits the object at the given key to be equal to the given value.
        this.__editAt(key.split('.'), value, this.__conf);
        //Dispatch an 'onchange' event.
        this.dispatchEvent(new Event('change'));
    }

    __editAt(key, value, ref){
        //Edits the given object BY REFERENCE. Key is an array of strings.
        if (key.length === 1){
            ref[key[0]] = value;
        }
        else {
            this.__editAt(key.slice(1), value, ref[key[0]]); //Elegant, recursive def.
        }
    }

    //Couple of utility methods:
    getObj(){
        return this.__conf;
    }


}