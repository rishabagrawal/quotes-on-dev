(function($){

    $('#new-quote-button').on('click', function(event){
        event.preventDefault();

        $.ajax({
            method: 'get',
            url: api_vars.rest_url + '/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
           
        }).done(function(data){
            const $title = data[0].title.rendered;
            const $content = data[0].content.rendered;
            const $quoteSource = data[0]._qod_quote_source;
            const $quoteSourceUrl = data[0]._qod_quote_source_url;
            console.log($title, $content,$quoteSource, $quoteSourceUrl);
            $('.entry-content').html($content);
            $('.entry-meta .entry-title').html('&mdash; ' + $title + ', ');
            $('.entry-meta .source').html(
            `<a href='${$quoteSourceUrl}'>${$quoteSource}</a>`
            );
        });
            

        });

})(jQuery);
