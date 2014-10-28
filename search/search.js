$(function(){

    var template = Handlebars.compile($('#icon-template').html());
    var icons = $('.search-icons');

    $.get('../svg-list.json', function(data){
        var html = '';
        $.each(data.icons, function(index, element){
            html += template(element);
        });

        icons.append(html);

    }).done(function(){

    });

})
