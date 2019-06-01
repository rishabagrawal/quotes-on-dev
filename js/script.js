// IIFE immeditaly invoked function expression 
(function($){
    $(function(){
        let lastPage = '';
    
    $('#quote-submission-form').on('submit', postQuote);
    $('#new-quote-button').on('click', function(event){
    
        event.preventDefault();

        lastPage= document.URL;

        $.ajax({
            method: 'get',
            url: api_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
           
        }).done(function(data){
            const $title = data[0].title.rendered;
            const $content = data[0].content.rendered;
            const $quoteSource = data[0]._qod_quote_source;
            const $quoteSourceUrl = data[0]._qod_quote_source_url;
            const randomQuote = data [0];
            
             

            
            $('.entry-content').html($content);
            $('.entry-meta .entry-title').html('&mdash; ' + $title + ', ');
            $('.entry-meta .source').html(
            `<a href='${$quoteSourceUrl}'>${$quoteSource}</a>`
            );
            history.pushState(null, null, randomQuote.slug);
           
        });
            
        $(window).on('popstate', function(){
            window.location.replace(lastPage);

        });
        
        }); // end of on click event

        function postQuote(event){
            event.preventDefault();
           

            const quoteAuthor= $('#quote-author').val();
            const quoteContent= $('#quote-content').val();
            const quoteSource = $('#quote-source').val();
            const quoteSourceUrl = $('#quote-source-url').val();

            if(quoteAuthor.length !== ''){
                postAjax();
            }
            function postAjax(){
            $.ajax({
                method: 'post',
                url: api_vars.rest_url + 'wp/v2/posts',
                data: {
                    
                    //TODO use the form input .val() for the title, content
                    title: quoteAuthor,
                    content: quoteContent,
                    _qod_quote_source: quoteSource,
                    _qod_quote_source_url:quoteSourceUrl,

                    status: 'pending',
                    
                   

                },
                beforeSend: function(xhr){
                    xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);

                }
            }).done(function(){
               
                $('#quote-submission-form').slideUp(500);

            }).fail(function(){
                
        

            });
        }

           
        }
  
    }); //doc ready end 
})(jQuery);
