import jQuery from 'jquery';
var $ = jQuery;
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/revealOnScroll';
import StickyHeader from './modules/stickyHeader';
import Modal from './modules/Modal';

var mobileMenu = new MobileMenu();
var stickyHeader = new StickyHeader(); 
var modal = new Modal();
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.testimonial'), '60%');

