<!--- Code generated by @the-/script-doc. DO NOT EDIT. -->

<a name="module_@the-/spell"></a>

## @the-/spell
Spell checker

**Version**: 15.6.12  
**License**: MIT  

* [@the-/spell](#module_@the-/spell)
    * [.TheSpell](#module_@the-/spell.TheSpell)
        * [new TheSpell([config])](#new_module_@the-/spell.TheSpell_new)
        * [.check(pattern, [options])](#module_@the-/spell.TheSpell+check) ⇒ <code>Promise.&lt;Array&gt;</code>
    * [.Array](#module_@the-/spell.Array) : <code>Array.&lt;string&gt;</code>
    * [.helpers](#module_@the-/spell.helpers) : <code>object</code>
    * [.create(...args)](#module_@the-/spell.create) ⇒ <code>TheSpell</code>
    * [.default()](#module_@the-/spell.default)

<a name="module_@the-/spell.TheSpell"></a>

### spell.TheSpell
**Kind**: static class of [<code>@the-/spell</code>](#module_@the-/spell)  

* [.TheSpell](#module_@the-/spell.TheSpell)
    * [new TheSpell([config])](#new_module_@the-/spell.TheSpell_new)
    * [.check(pattern, [options])](#module_@the-/spell.TheSpell+check) ⇒ <code>Promise.&lt;Array&gt;</code>

<a name="new_module_@the-/spell.TheSpell_new"></a>

#### new TheSpell([config])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>Object</code> | <code>{}</code> | Spelling config |

<a name="module_@the-/spell.TheSpell+check"></a>

#### theSpell.check(pattern, [options]) ⇒ <code>Promise.&lt;Array&gt;</code>
Check files

**Kind**: instance method of [<code>TheSpell</code>](#module_@the-/spell.TheSpell)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pattern | <code>string</code> |  | File name patterns |
| [options] | <code>Object</code> | <code>{}</code> | Optional settings |

<a name="module_@the-/spell.Array"></a>

### spell.Array : <code>Array.&lt;string&gt;</code>
Pre defined words

**Kind**: static property of [<code>@the-/spell</code>](#module_@the-/spell)  
<a name="module_@the-/spell.helpers"></a>

### spell.helpers : <code>object</code>
Helper functions

**Kind**: static namespace of [<code>@the-/spell</code>](#module_@the-/spell)  
**Access**: protected  
<a name="module_@the-/spell.create"></a>

### spell.create(...args) ⇒ <code>TheSpell</code>
Create a TheSpell instance

**Kind**: static method of [<code>@the-/spell</code>](#module_@the-/spell)  

| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

<a name="module_@the-/spell.default"></a>

### spell.default()
Alias of [create](#module_@the-/spell.create)

**Kind**: static method of [<code>@the-/spell</code>](#module_@the-/spell)  