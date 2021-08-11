/**
 * Detect touch actions on the specified element
 *
 * @param { jQuery } $element Element on which to listen for touch events
 * @param {Object} [config]
 * @param {boolean} [config.isRtl] Whether the UI language is RTL
 * @param {boolean} [config.isHorizontal] Whether left/right swipe gestures are prioritized
 * @constructor
 */
function SwipePane( $element, config ) {
  config = config || {};
  this.initialX = null;
  this.initialY = null;
  this.isRtl = config.isRtl;
  this.isHorizontal = typeof config.isHorizontal === 'boolean' ? config.isHorizontal : true;
  this.onSwipeToStart = function () {};
  this.onSwipeToEnd = function () {};

  $element.on( 'touchstart', this.onTouchStart.bind( this ) );
  $element.on( 'touchmove', this.onTouchMove.bind( this ) );
}

/**
 * Set the initial values of X and Y coordinates
 *
 * @param {Object} event Touchstart event
 */
SwipePane.prototype.onTouchStart = function ( event ) {
  var touchEvent = event.touches.item( 0 );
  this.initialX = touchEvent.clientX;
  this.initialY = touchEvent.clientY;
};

/**
 * Determine the direction of the touch and call the appropriate event handler
 *
 * @param {Object} event Touchmove event
 */
SwipePane.prototype.onTouchMove = function ( event ) {
  if ( !this.initialX || !this.initialY ) {
    return;
  }

  if ( this.isSwipeToStart( event.touches.item( 0 ) ) ) {
    this.onSwipeToStart();
  } else {
    this.onSwipeToEnd();
  }

  this.initialX = null;
  this.initialY = null;
};

/**
 * Check whether the user just swiped towards the start position
 * For horizontal swipes, return true if the user swiped left for LTR and right for RTL.
 * For vertical swipes, return true if the user swiped up.
 *
 * @param {Object} touchEvent Touch event
 * @return {boolean}
 */
SwipePane.prototype.isSwipeToStart = function ( touchEvent ) {
  var newX = touchEvent.clientX,
    newY = touchEvent.clientY,
    isToLeft = this.initialX > newX;
  if ( this.isHorizontal ) {
    return this.isRtl ? !isToLeft : isToLeft;
  } else {
    return this.initialY > newY;
  }
};

/**
 * Set the handler to be called when the user swiped towards the start position
 *
 * @param {Function} handler
 */
SwipePane.prototype.setToStartHandler = function ( handler ) {
  if ( typeof handler !== 'function' ) {
    throw new Error( 'Handler must be a function' );
  }
  this.onSwipeToStart = handler;
};

/**
 * Set the handler to be called when the user swiped away from the start position
 *
 * @param {Function} handler
 */
SwipePane.prototype.setToEndHandler = function ( handler ) {
  if ( typeof handler !== 'function' ) {
    throw new Error( 'Handler must be a function' );
  }
  this.onSwipeToEnd = handler;
};

function animateCard(toStart) {
  const $card = $('.suggested-edits-card');
  const $fakeCard = $card.clone();
  $fakeCard.removeClass('suggested-edits-card').addClass('suggested-edits-card-fake');
  $fakeCard.appendTo($('.suggested-edits-card-wrapper'));
  $card.addClass(['no-transition', toStart ? 'to-end' : 'to-start']);
  setTimeout(() => {
    $fakeCard.addClass(toStart ? 'to-start' : 'to-end');
  }, 100);
};

function getSwipeHandler(toStart) {
  return function() {
    animateCard(toStart);
    setTimeout(() => {
      handleTraverseSuggestions(toStart ? 'nextTitleID' : 'prevTitleID');
      $('.suggested-edits-card').removeClass(['no-transition', toStart ? 'to-end' : 'to-start']);
    }, 100);
    setTimeout(() => {
      $('.suggested-edits-card-fake').remove();
    }, 500);
  };
};

$(document).ready(function() {
  const swipeCard = new SwipePane($('.suggested-edits-card'));
  swipeCard.setToStartHandler(getSwipeHandler(true));
  swipeCard.setToEndHandler(getSwipeHandler(false));
});

