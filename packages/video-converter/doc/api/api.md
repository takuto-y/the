<!--- Code generated by @the-/script-doc. DO NOT EDIT. -->

<a name="module_@the-/video-converter"></a>

## @the-/video-converter
Video file converter

**Version**: 15.4.5  
**License**: MIT  

* [@the-/video-converter](#module_@the-/video-converter)
    * [.TheVideoConverter](#module_@the-/video-converter.TheVideoConverter) ⇐ [<code>MP4Mixed</code>](#module_@the-/video-converter.mixins.mp4Mix..MP4Mixed)
        * [new TheVideoConverter()](#new_module_@the-/video-converter.TheVideoConverter_new)
        * [.isVideoSrc(src)](#module_@the-/video-converter.TheVideoConverter+isVideoSrc) ⇒ <code>\*</code>
        * [.convert(src, dest, [options])](#module_@the-/video-converter.TheVideoConverter+convert) ⇒ <code>Promise.&lt;\*&gt;</code>
        * [.inspect(filename, [options])](#module_@the-/video-converter.TheVideoConverter+inspect) ⇒ <code>Promise.&lt;\*&gt;</code>
        * [.process(src, [options])](#module_@the-/video-converter.TheVideoConverter+process) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.helpers](#module_@the-/video-converter.helpers) : <code>object</code>
    * [.mixins](#module_@the-/video-converter.mixins) : <code>object</code>
        * [.mp4Mix()](#module_@the-/video-converter.mixins.mp4Mix)
            * [~MP4Mixed](#module_@the-/video-converter.mixins.mp4Mix..MP4Mixed)
    * [.create(...args)](#module_@the-/video-converter.create) ⇒ <code>TheVideoConverter</code>
    * [.default()](#module_@the-/video-converter.default)
    * [.filenameFor(config)](#module_@the-/video-converter.filenameFor)
    * [.isVideoSrc()](#module_@the-/video-converter.isVideoSrc)

<a name="module_@the-/video-converter.TheVideoConverter"></a>

### videoConverter.TheVideoConverter ⇐ [<code>MP4Mixed</code>](#module_@the-/video-converter.mixins.mp4Mix..MP4Mixed)
**Kind**: static class of [<code>@the-/video-converter</code>](#module_@the-/video-converter)  
**Extends**: [<code>MP4Mixed</code>](#module_@the-/video-converter.mixins.mp4Mix..MP4Mixed)  

* [.TheVideoConverter](#module_@the-/video-converter.TheVideoConverter) ⇐ [<code>MP4Mixed</code>](#module_@the-/video-converter.mixins.mp4Mix..MP4Mixed)
    * [new TheVideoConverter()](#new_module_@the-/video-converter.TheVideoConverter_new)
    * [.isVideoSrc(src)](#module_@the-/video-converter.TheVideoConverter+isVideoSrc) ⇒ <code>\*</code>
    * [.convert(src, dest, [options])](#module_@the-/video-converter.TheVideoConverter+convert) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.inspect(filename, [options])](#module_@the-/video-converter.TheVideoConverter+inspect) ⇒ <code>Promise.&lt;\*&gt;</code>
    * [.process(src, [options])](#module_@the-/video-converter.TheVideoConverter+process) ⇒ <code>Promise.&lt;string&gt;</code>

<a name="new_module_@the-/video-converter.TheVideoConverter_new"></a>

#### new TheVideoConverter()
Video converter

<a name="module_@the-/video-converter.TheVideoConverter+isVideoSrc"></a>

#### theVideoConverter.isVideoSrc(src) ⇒ <code>\*</code>
Detect

**Kind**: instance method of [<code>TheVideoConverter</code>](#module_@the-/video-converter.TheVideoConverter)  

| Param |
| --- |
| src | 

<a name="module_@the-/video-converter.TheVideoConverter+convert"></a>

#### theVideoConverter.convert(src, dest, [options]) ⇒ <code>Promise.&lt;\*&gt;</code>
Convert video files

**Kind**: instance method of [<code>TheVideoConverter</code>](#module_@the-/video-converter.TheVideoConverter)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> |  | Source file name |
| dest | <code>string</code> |  | Destination file name |
| [options] | <code>Object</code> | <code>{}</code> | Optional settings |

<a name="module_@the-/video-converter.TheVideoConverter+inspect"></a>

#### theVideoConverter.inspect(filename, [options]) ⇒ <code>Promise.&lt;\*&gt;</code>
Inspect file

**Kind**: instance method of [<code>TheVideoConverter</code>](#module_@the-/video-converter.TheVideoConverter)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filename | <code>string</code> |  |  |
| [options] | <code>Object</code> | <code>{}</code> | Optional setting |

<a name="module_@the-/video-converter.TheVideoConverter+process"></a>

#### theVideoConverter.process(src, [options]) ⇒ <code>Promise.&lt;string&gt;</code>
Convert video file if needed

**Kind**: instance method of [<code>TheVideoConverter</code>](#module_@the-/video-converter.TheVideoConverter)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> |  |  |
| [options] | <code>Object</code> | <code>{}</code> |  |
| [options.cleanup] | <code>boolean</code> | <code>false</code> | Cleanup original file if needed |
| [options.onlyIfNeeded] | <code>boolean</code> | <code>false</code> | Convert only if needed |

<a name="module_@the-/video-converter.helpers"></a>

### videoConverter.helpers : <code>object</code>
Helper functions

**Kind**: static namespace of [<code>@the-/video-converter</code>](#module_@the-/video-converter)  
**Access**: protected  
<a name="module_@the-/video-converter.mixins"></a>

### videoConverter.mixins : <code>object</code>
Mixin functions

**Kind**: static namespace of [<code>@the-/video-converter</code>](#module_@the-/video-converter)  
**Access**: protected  

* [.mixins](#module_@the-/video-converter.mixins) : <code>object</code>
    * [.mp4Mix()](#module_@the-/video-converter.mixins.mp4Mix)
        * [~MP4Mixed](#module_@the-/video-converter.mixins.mp4Mix..MP4Mixed)

<a name="module_@the-/video-converter.mixins.mp4Mix"></a>

#### mixins.mp4Mix()
Mixins for mp4

**Kind**: static method of [<code>mixins</code>](#module_@the-/video-converter.mixins)  
<a name="module_@the-/video-converter.mixins.mp4Mix..MP4Mixed"></a>

##### mp4Mix~MP4Mixed
**Kind**: inner class of [<code>mp4Mix</code>](#module_@the-/video-converter.mixins.mp4Mix)  
<a name="module_@the-/video-converter.create"></a>

### videoConverter.create(...args) ⇒ <code>TheVideoConverter</code>
Create a TheVideoConverter instance

**Kind**: static method of [<code>@the-/video-converter</code>](#module_@the-/video-converter)  

| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

<a name="module_@the-/video-converter.default"></a>

### videoConverter.default()
Alias of [create](#module_@the-/video-converter.create)

**Kind**: static method of [<code>@the-/video-converter</code>](#module_@the-/video-converter)  
<a name="module_@the-/video-converter.filenameFor"></a>

### videoConverter.filenameFor(config)
Change file extension

**Kind**: static method of [<code>@the-/video-converter</code>](#module_@the-/video-converter)  

| Param | Type |
| --- | --- |
| config | <code>Object</code> | 

<a name="module_@the-/video-converter.isVideoSrc"></a>

### videoConverter.isVideoSrc()
**Kind**: static method of [<code>@the-/video-converter</code>](#module_@the-/video-converter)