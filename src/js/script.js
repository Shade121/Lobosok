$(document).ready(function () {

    'use strict';

    //mobile-menu
    $('.hamburger').on('click', function () {
        $('.mobile, .hamburger').toggleClass('active');
    
    });
    $('.mobile ul li a').on('click', function () {
        $('.mobile, .hamburger').removeClass('active');
    });
    
    //fixed header
    function fixedHeader() {
        const ww = $(window).scrollTop();
        if (ww > 0) {
            $('.header').addClass('active');
        } else {
            $('.header').removeClass('active');
        }
    }
    fixedHeader();
    $(window).on('scroll', function () {
        fixedHeader();
    });

    //   scroll to anchor
    $('.navbar ul li a[href*="#"], .mobile ul li a[href*="#"]').on('click',
        function (event) {
            event.preventDefault();
            const margin = $('.header').outerHeight();
            const anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - margin
            }, 300);
            return false;
        });

    // Portfolio modal
    $('#portfolio-modal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const workName = button.data('name');
        $(this).find('.modal-body').hide();
        $('.modal-body[data-name = ' + workName + ']').show();
    });

    // Modal contacts
    $('[data-modal=contact_message]').on('click', function () {
        $('.overlay, #contact_message').fadeIn('slow');
    });

    $('.modal_close').on('click', function () {
        $('.overlay, #contact_message, #thanks').fadeOut('slow');
    });

    //Valide Forms
    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите своё имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символа!")
                },
                phone: {
                    required: "Введите свой номер телефона",
                },
                email: {
                    required: "Введите свой email",
                    email: "Ваш email должен быть формата name@domain.com",
                },
                text: {
                    required: "Введите свое сообщение"
                },
            }
        });
    }

    valideForms('#contact-form'),
    valideForms('#message-form'),

    $('input[name=phone]').mask("+38 (999) 999-99-99");

    // PHP mailer
    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#contact_message').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false;
    });

    // pageup

    $(window).scroll(function(){
        if ($(this).scrollTop() > 700){
            $('.up').fadeIn();
        } else {
            $('.up').fadeOut();
        }
    });

    function wowInit() {
        const scrollingAnimations = true; // Set false for turn off animation
        if (scrollingAnimations) {
            $(window).on('load', function () {
                setTimeout(function () {
                    new WOW().init();
                }, 400);
            });
        }
    }
    wowInit();

});