(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Inception = factory();
  }
}(this, function () {
	let transform = 'translate(0,0) scale(1)',
		transformCenter = 'translate(-50%, -50%) scale(1)',
		defaults = {
			center: true,
			fade: false,
			transition: 'all 0.5s ease',
		};
		
	return class Inception {
		constructor(modal, opts = {}) {
			this.modal = modal;
			this.settings = Object.assign({}, defaults, opts);
			this._init();
		}
	
		open(source) {
			this._documentScroll(1);
			this.state = true;
			this.source = source;
			this.source.style.pointerEvents = "none";
			this.modal.style.removeProperty("display");
		
			this.matrix = this._getMatrix();
			this.modal.style.cssText += `${this.settings.fade?'opacity:0;':''}transition:none;transform:${this.matrix};`;
	
			//forcepaint
			this.modal.clientHeight;		
			requestAnimationFrame(() => {
				this.modal.style.cssText += `transition:${this.settings.transition};transform:${this.settings.center?transformCenter:transform};`;
				this.modal.setAttribute("open","");			
	
				//hide source && fade in modal
				if ( !this.settings.fade ) { 
					this.modal.style.opacity = 1;
					this.source.style.visibility = "hidden";
				}
			});
	
			return new Promise(resolve => this._complete = resolve);	
		}
	
		close() {
			this.state = false;
			this.modal.removeAttribute("open");
			this.modal.style.cssText += `${this.settings.fade?'opacity:0;':''}transform:${this.matrix};`;
			this.source.style.pointerEvents = "auto";		
			this._documentScroll();
	
			return new Promise(resolve => this._complete = resolve);
		}
		
		// init style for modal && and setup transition event listener
		_init() {
			this.modal.style.cssText += `display:none;${this.settings.center?'left:50%;top:50%;':'left:0;top:0;'}position:fixed;`;
			this.modal.addEventListener("transitionend", e => this._event(e));
		}
		
		_getMatrix() {
			let source = this.source.getBoundingClientRect(),
				modal = this.modal.getBoundingClientRect(),
				matrix = new (window.WebKitCSSMatrix || window.MSCSSMatrix || window.CSSMatrix)(),
				plot = {
					modal: { x: modal.left + modal.width/2, y: modal.top + modal.height/2 },
					source: { x: source.left + source.width/2, y: source.top + source.height/2 },
					scale: { x: modal.width/source.width, y: modal.height/source.height }
				};
			
			return matrix
				  .translate(plot.source.x - plot.modal.x, plot.source.y - plot.modal.y)
				  .scale(1/plot.scale.x, 1/plot.scale.y)
				  .toString();
		}
		
		_event(e) {
			if (e.target === this.modal) {
				if ( !this.state ) {
					if ( !this.settings.fade ) { this.source.style.visibility = "visible"; }
					this.modal.style.removeProperty("transform");
					this.modal.style.display = "none";
				}
	
				if ( event.propertyName === "transform" ) this._complete();
			}
		}
		
		_documentScroll(prevent) {
			document.documentElement.style.overflow = prevent ? "hidden" : "";
		}
	}
}));