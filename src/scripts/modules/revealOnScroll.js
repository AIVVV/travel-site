import jQuery from 'jQuery';
var $ = jQuery;
import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints';


class revealOnScroll {
	constructor(els, offset) {
		this.itemsToReveal = els; 
		this.offsetPercentage = offset;
		this.hideInitialy();
		this.createWaypoints();
	}

	hideInitialy() {
		this.itemsToReveal.addClass('reveal-item');
	}

	createWaypoints() {
		var that = this;
		this.itemsToReveal.each(function(){
			var currentItem = this;
			new Waypoint({
				element: currentItem,
				handler: function(){
					$(currentItem).addClass('reveal-item--is-visible');
				},
				offset: that.offsetPercentage
			});
		});
	}
}

export default revealOnScroll;