import jQuery from 'jQuery';
var $ = jQuery;
import MobileMenu from './modules/MobileMenu';
import revealOnScroll from './modules/revealOnScroll';

var mobileMenu = new MobileMenu();

new revealOnScroll($('.feature-item'), '85%');
new revealOnScroll($('.testimonial'), '60%'); 