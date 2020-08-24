var openMenu=true;

$(document).ready(function(){
  var height = $('.about').height();
  $('.polygon').css('height', height.toString());
  var height = $('.contacto').height()+120;
  $('.polygon1').css('height', height.toString());

  setTimeout(() => {
    for (let i = 0; i < $('.back').length; i++) {
      const element = $('.back')[i];
      if(element.offsetHeight < element.scrollHeight){
        $('.side').css('height', element.offsetHeight+15);
      }
    }
  }, 100);
});

$(window).bind('beforeunload',function(){
  $('.side').css('height', 0);
});

$('.card').on('touchstart', function(e){
  for (let i = 0; i < $('.card').length; i++) {
    const element = $('.card')[i];
    // instrucciones para mouse
    $(`#${element.id}`).hover(function(){
      $(`#${element.id}`).css('transform', 'rotateY(0deg)');
      $(`#${element.id}`).css('transform', 'rotateY(180deg)');
    }, function () {
      $(`#${element.id}`).css('transform', 'rotateY(0deg)');
    });
    // instrucciones para touch
    $(`#${element.id}`).css('transform', 'rotateY(0deg)');
    if(e.currentTarget.id == element.id){
      $(`#${element.id}`).css('transform', 'rotateY(180deg)');
    }
  }
});

$('.btn-menu').click(function(){
  openMenu=!openMenu;
  if(openMenu){
    $('.nav-li').css('flex-flow','row wrap');
    $('li').css('width','auto');
    $('.nav').css('display', 'none');
  }else{
    $('.nav-li').css('flex-flow','column wrap');
    $('li').css('width','100%');
    $('.nav').css('display', 'block');
  }
});

$(window).resize(function(){
  var height = $('.about').height();
  $('.polygon').css('height', height.toString());

  $('.side').css('height', 0);
  for (let i = 0; i < $('.back').length; i++) {
    const element = $('.back')[i];
    if(element.offsetHeight < element.scrollHeight){
      $('.side').css('height', element.scrollHeight+15);
      // console.log('height: ', $('.side')[0].offsetHeight);
    }
  }
});

$('form').on('submit', (e) => {
  e.preventDefault();
  var url = "/#contacto";
  const nombre = $('#nombre').val();
  const apellido = $('#apellido').val();
  const email = $('#email').val();
  const text = $('#text').val();

  const data = {
    nombre,
    apellido,
    email,
    text
  };

  if (nombre === '') {
    $("#nombre").css("border", "1px solid red");

    $("#nombre").keyup(function rest() {
      $("#nombre").css("border", "1px solid #797979");
    });
    return false;

  } else if (apellido === '') {
    $("#apellido").css("border", "1px solid red");
    // $('#mensaje1').fadeIn();
    $("#apellido").keyup(function rest() {
      $("#apellido").css("border", "1px solid #797979");
    });
    return false;

  } else if (email === '') {
    $("#email").css("border", "1px solid red");
    $("#email").keyup(function rest() {
      $("#email").css("border", "1px solid #797979");
    });
    return false;

  } else if (text === '') {
    $("#text").css("border", "1px solid red");
    $("#text").keyup(function rest() {
      $("#text").css("border", "1px solid #797979");
    });
    return false;
  } else {

    $.post('/mail', data, function () {
      console.log('Recibido', data);
      $(location).attr('href', url);
      $('#form')[0].reset();
    });
  }


});