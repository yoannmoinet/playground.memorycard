# playground.memorycard

A plugin for Playground to allow persistence.

## Installation

Either

```node
npm install --save playground.memorycard
```

or

```node
bower install --save playground.memorycard
```

## Usage

It is an easy access to LocalStorage.

It will load defaults from `data/defaults.json` if needed and add them to the localStorage if they're not yet defined.

The plugin is accessible via `app.memorycard`

```javascript
var memory = app.memorycard;
```

### getAll()

Will return all data stored as an Object.

```javascript
memory.getAll();
```

### save(key, value, overwrite)

Will store the data under 'key' you can also pass an Object, to batch store data.

By default it doesn't overwrite the data.

```javascript
memory.save('test', 'a test string', true);
memory.save('test', {'can': 'be an object'}, true); // Will be JSON.stringify
memory.save({'test1': 'first', 'test2': 'second'}, true); // Will store 'test1' and 'test2'
```

### load(key)

Will return the data stored under 'key' or all if no argument is passed.

```javascript
memory.load('test'); // {"can": "be an object"} is JSON.parse
memory.load(); // memory.getAll();
```

### wipe(key)

Will erase the data under 'key' or all if no argument is passed.

```javascript
memory.wipe('test');
memory.wipe();
```