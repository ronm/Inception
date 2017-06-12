Waybetter
=========

Modaled content from a source origin

Usage
------

```html
import Waybetter from './inception'
```

or

```html
<script type="text/javascript" src="inception.js"></script>
```

then

```js
var modal = new Inception(document.getElementById("origin"), { fade: false});
	
document.getElementById("target").addEventListener("click", function() {	
	modal.open(this).then(function() { console.log("opened"); });
});

```


Methods
-------

Options can be passed to the waybetter function at initialization, otherwise it must be followed by the refresh method.

```
new Waybetter({ direction : "horizontal" });
```



### center: true

`boolean`

Will this modal be appearing in the dead center of the page?


### fade: false

`boolean`

Transition modals opacity on open/close



### transition: 'all 0.5s ease'

`string`

The css transition string to apply to the opening/closing of the modal



Methods
-------

### destroy

This method stops all waybetter points within the document

```
let waybetter = new Waybetter();

waybetter.destroy();
```

### inview

Check whether a given item is within the viewport.  

```
let p = document.querySelector("p");

p.hasAttribute("waybetter);
```

returns `boolean`


### refresh

This will refresh all matched waybetter points. This is useful if you want to set different options after initialization.  

```
let waybetter = new Waybetter();

waybetter.refresh();
```

