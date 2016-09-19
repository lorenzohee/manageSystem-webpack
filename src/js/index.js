import People from './People.js';
import navHeader from '../tmpl/header.hbs';
console.log('log file ###############');
$('#root').on('click', function(){
	console.log('click element')
});
let p = new People("Yika", 20);
console.log(p.say());
$('.nav-header').html(navHeader({"title":"title","body":"body"}));
