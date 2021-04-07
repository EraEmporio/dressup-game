let i = 0, char_escolhido = "", galeria = ""
let images = ['tela01_homem-01.png', 'tela01_homem-02.png',
    'tela01_mulher-01.png', 'tela01_mulher-02.png']

$('.arrow').click(function () {

    if ($(this).hasClass('arrow-left')) {
        (i === 0) ? i = images.length - 1 : i--

    } else {
        (i === images.length - 1) ? i = 0 : i++
    }
    $(".main-character").css("background-image", "url(" + "tela1/galeria/" + images[i] + ")");

});

$('.btn-voltar').click(function () {

    let img_selectors = $('.main-char-area > img')
    for (let l = 0; l < img_selectors.length - 1; l++) {
        $(img_selectors[l]).attr('src', '')
    }

    $('#tela02').hide();
    $('#tela01').show();
})

let j = {
    'camisa': 0,
    'calca': 0,
    'calcado': 0,
    'acessorio': 0,
    'chapeu': 0
}

let k = 0
$('.seta').click(function () {
    let class_list = $(this).attr('class').split(/\s+/),
        box = class_list[2].split('seta-').join('')

    let objetos = $('.' + galeria + ' .' + box)
    if ($(this).hasClass('seta-esquerda')) {
        $(objetos[j[box]]).css('display', 'none')
        j[box] -= 1
        if (j[box] < 0) j[box] = objetos.length - 1
        $(objetos[j[box]]).css('display', 'block')
    } else {
        $(objetos[j[box]]).css('display', 'none')
        j[box] += 1
        if (j[box] > objetos.length - 1) j[box] = 0
        $(objetos[j[box]]).css('display', 'block')
    }
});

$('.mobile-selector').click(function () {
    let class_list = $(this).attr('class').split(/\s+/),
        box = class_list[1].split('s-').join(''),
        galerias = $('.' + galeria)

    for (let l = 0; l < galerias.length; l++) {
        if ($(galerias[l]).attr('class').includes(box)){
            $(galerias[l]).css('display', 'block')
            if(box === 'calca') {
                $('.galeria-calcado').css('display', 'none')
            }
        }
        else {
            $(galerias[l]).css('display', 'none')
            if(box === 'sapato') {
                $('.galeria-calcado').css('display', 'block')
            }
        }
    }
});


$('#escolhe-char').click(function () {
    let img_tela2 = ['tela02_homem-01.png', 'tela02_homem-02.png',
        'tela02_mulher-01.png', 'tela02_mulher-02.png']

    char_escolhido = img_tela2[i];
    (char_escolhido.includes('mulher')) ? galeria = 'galeria-mulher' : galeria = 'galeria-homem'

    $("#char").attr("src", "tela2/principal/" + char_escolhido);
    $('#tela01').hide();
    if (galeria === 'galeria-mulher') {
        $('.main-char-area').addClass('gmulher-active')
        $('.galeria-mulher').removeClass('d-none')
        $('.galeria-homem').addClass('d-none')
    } else {
        $('.main-char-area').addClass('ghomem-active')
    }

    $('#tela02').show();
    if (window.innerWidth < 991.98) {
        let select = $('.select')
        let modal_height = 900
        if (window.innerWidth < 576.98) {
            modal_height = 700
        }
        $('#exampleModal .modal-body').css('height', modal_height)
        select.attr("height", 50)
        select.attr("width", 120)
    }
});

$('.select').click(function () {
    let class_list = $(this).closest("div")
        .find('img').attr('class').split(/\s+/)
    let box = class_list[2].split('seta-').join(''),
        objetos = $('.' + galeria + ' .' + box)


    let main_char = $('#' + box + '-on'),
        calcado_on = $('#calcado-on'),
        camisa = $('#camisa-on'),
        source_img = $(objetos[j[box]]).attr('src')
    let calca_el = $('#calca-on').attr('src')
    let sapato_astro = source_img.includes('sapato-astronauta'),
        calca_astro = calca_el.includes('calca-astronauta') && galeria === 'galeria-mulher',
        sapato_bomb = source_img.includes('sapato-bombeiro') || source_img.includes('sapato-bombeira'),
        calca_jard_on = calca_el.includes('calca-jardineiro') || calca_el.includes('calca-jardineira'),
        calca_jard = source_img.includes('calca-jardineiro') || source_img.includes('calca-jardineira')
    
    if (box === 'calcado' && sapato_bomb || sapato_astro) {
        let z_index = 0
        if (!calca_jard_on) z_index = 1
        main_char.css('z-index', z_index)
    } else if (box === 'calcado') {
        main_char.css('z-index', 0)
    } else if (box === 'calca' && calca_jard) {
        calcado_on.css('z-index', 0)
    } else {
        calcado_on.css('z-index', 1)
    }

    if (calca_jard) {
        camisa.attr('src', ' ')
    }

    if (calca_astro && !source_img.includes('calca-astronauta') && box === 'calca') {
        $('.gmulher-active #calca-on').removeClass('calca-astro')
    } else if (calca_astro || source_img.includes('calca-astronauta')) {
        $('.gmulher-active #calca-on').addClass('calca-astro')
    } else {
        $('.gmulher-active #calca-on').removeClass('calca-astro')
    }


    if (!(box === 'camisa' && calca_jard_on)) {
        main_char.attr(
            'src',
            source_img.replace('galerias', 'principal')
        )
    }
});

$(document).ready(function () {
    $('#exampleModal').modal('show')
    $('#tela02').hide();
});