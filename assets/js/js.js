$(function(){
  clickOutsideMenu();

  // MENU
  // click no hamburguer icon
  $('.MenuTrigger').on('click', function(e){
    e.preventDefault();   

    if( $('.Menu').hasClass('Menu--open') ){
      closeMenu();
    } else{
      openMenu();
    }
  });

  // abre um sub menu
  $('.Menu--hasSub > a').on('click', function(e){
    e.preventDefault();

    $(this).siblings('.Menu-sub').addClass('Menu-sub--subOpen');
    $(this).addClass('is-selected');
    $('.Menu').addClass('Menu--subOpen');
  });

  // volta ao menu principal
  $('.js-back').on('click', function(){
    $(this).parent().removeClass('Menu-sub--subOpen');
    $('.Menu--hasSub > a').removeClass('is-selected');
    $('.Menu').removeClass('Menu--subOpen');
  });

  // menu fixo ao scollar
  $(window).scroll(function(){
    
    if( $(this).scrollTop() >= 100 ){
      $('.Header').addClass('is-scrolling');
    } else{
    	$('.Header').removeClass('is-scrolling');
    }
  });


  // validar formulario
  $('.js-submitForm').on('click', function (e) {

    e.preventDefault();
    var qtdErro = 0;

    $(this).parents('.Form').find('[data-validate=true]').each(function () {
      var value = $.trim($(this).find('input, textarea').val());
      if (!value.length > 0) {
        $(this).addClass('error');
        qtdErro++;
      }
    });

    if (qtdErro == 0) {
      return $.ajax({
        type: "POST",
        url: "/ajax/contato.php",
        data: $(this).serialize(),
        success: function (data) {
          if (data === "success") {
            console.log('Mensagem enviada com sucesso.');
            // Limpa o form
            $('.Form').trigger("reset");
          } else {
            console.log('Erro ao tentar enviar mensagem: ' + data);
          }
        }
      });
    } else {
      console.log('Erro ao tentar enviar mensagem. Tente novamente.');
    }
  });


  // MAPS

  function initialize() {

      var chicago = new google.maps.LatLng(-19.890709, -43.920771);
      var myOptions = {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: chicago,
          mapTypeControl: false,
          scrollwheel: false
      };
      map = new google.maps.Map(document.getElementById("map"), myOptions);

      markerMuseu = new google.maps.Marker({
        position: new google.maps.LatLng(-19.890709, -43.920771),
        map: map,
        title: 'Museu do Automóvel'
      });

      markerMuseu.addListener('click', function() {
        infowindow.open(map, markerMuseu);
      });
  }

  initialize();


  // SLIDER PRODUTO

  $('.js-productSlider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.SliderNav__nav',
    prevArrow: '<button type="button" class="Slider__button Slider__button--prev"></button>',
    nextArrow: '<button type="button" class="Slider__button Slider__button--next"></button>',
    fade: true
  });

  $('.js-productNav').slick({
    arrows: false,
    asNavFor: '.Slider',
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    infinite: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      }
    ]
  });

  // SCROLLBAR
  $('.u-scrollbar').perfectScrollbar(); 

});

function closeMenu(){
  $('.Menu').removeClass('Menu--open');
  $('.Menu').removeClass('Menu--subOpen');

  $('.Menu-sub').removeClass('Menu-sub--subOpen');
  $('.MenuTrigger').removeClass('is-open');

  $('.Menu--hasSub > a').removeClass('is-selected');

  $('body').removeClass('overflowHidden');
}

function openMenu(){
  $('.MenuTrigger').addClass('is-open');
  $('.Menu').addClass('Menu--open');
  $('body').addClass('overflowHidden');
}

function viewport() {
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
      a = 'client';
      e = document.documentElement || document.body;
  }
  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function checkWindowWidth(){
  var w = viewport().width;
  var size = '';
  if(w > 991){
    size = 'desktop';
  } else{
    size = 'mobile';
  }

  return size;
}

function clickOutsideMenu(){
  
  var x = checkWindowWidth();
  if(x == 'desktop'){
    $(document).on('mouseup', function (e){ 
      var elem = $('.Menu-sub');

      if (!elem.is(e.target) && elem.has(e.target).length === 0){
        closeMenu();
      }
    });
  } else{
    $(document).off('mouseup');
  }
}