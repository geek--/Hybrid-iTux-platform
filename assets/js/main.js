///////////////////////////////////////////////////////////////////////////
//     ___                         FLORO                         ___
//    /o o\                        =====                        /  o\
//    \ º /                         *|*                         \   <
//    //|\\                By j3dlab.com - 2014                 //|\\
///////////////////////////////////////////////////////////////////////////

//
//
//                             _____
//                            |     |        /|
//                            |     |      /  |
//                            |     |    /    |
//                            |     |   |     |
//                            |     |   |     |
//                            |     |   |     |
//                            |     |   |     |
//                            |     |    \    |
//                            |     |      \  |
//                            |_____|        \|
//
//
//  CSS CONTENTS
//
//  Number. Description Block
//
//  1.Nice Scrooll
//  2.Gridalicious
//  3.Hover menu
//  4.RSS Loader
//  5.Credit Colors
//  6.Responsive menu
//  7.Browser detector
//  8.Fix Youtube z-index
//  9.Google Analytics


///////////////////////////////////////////////////////////////////////////





$(document).ready(function(){


    ///////////////////////////////////////////////////////////////////////////
    //1.Nice Scrooll
    ///////////////////////////////////////////////////////////////////////////

    var MyNSFrontColor = "#333333";
    var MyNSBackgroundColor = '#989898';

    nice = $(".desktop body").niceScroll({
        cursorcolor: MyNSFrontColor,
        cursorborder: '0',
        cursorborderradius : '0',
        zindex:'999999',
        cursoropacitymin:'1',
        cursorwidth :10,
        background: MyNSBackgroundColor
    });



    ///////////////////////////////////////////////////////////////////////////
    //2.Gridalicious
    ///////////////////////////////////////////////////////////////////////////

    var MyGridWidth = 450;
    var MyGridMargin = 30;

     $('.desktop .content[role="main"]').gridalicious({
        selector: 'article',
        width: MyGridWidth,
        gutter: MyGridMargin
    });



    ///////////////////////////////////////////////////////////////////////////
    //3.Hover menu
    ///////////////////////////////////////////////////////////////////////////

    $('#menu').mouseover(function(){
        $('.content').toggleClass('rotate');
    });
    $('#menu').mouseout(function(){
        $('.content').removeClass('rotate');
    });
    $('#menu').click(function(){
        $('.content').addClass('rotate');
    });
    $('#menu').click(function(){
        $('.content').removeClass('rotate');
    });



    ///////////////////////////////////////////////////////////////////////////
    //4.RSS Loader
    ///////////////////////////////////////////////////////////////////////////


    var MyRSSURL = ''; // http://myblog.com/rss
    var MyPoststoLoad = '6';//Number of posts to load



    if(MyRSSURL.length==0){
        var Autourl = document.location.toString();
        var Vurl = Autourl.split("/");
        MyRSSURL = 'http://'+Vurl[2]+'/rss';
    };
    
    $.ajax({
        type: "GET",
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+MyPoststoLoad+'&callback=?&q=' + encodeURIComponent(MyRSSURL),
        dataType: 'json',
        error: function(){
            alert('Unable to load feed, Incorrect path or invalid feed');
        },
        success: function(xml){
            var postlist = xml.responseData.feed.entries;
            var html= '';
            var htmlselect= '';
            $.each(postlist, function(idx, data) {
                html += '<h2 class="post-title"><a href="'+data.link+'">'+data.title+'</a></h2>';
                htmlselect +='<option value="'+data.link+'">'+data.title+'</option>'
            });
            $('#recentpost').append(html);
            $('#recentpostselect').append(htmlselect);
        }
    });




    ///////////////////////////////////////////////////////////////////////////
    //6.Responsive menu
    ///////////////////////////////////////////////////////////////////////////
    $("#recentpostselect").on('change', function(){
        var url = $(this).val();
        window.location.replace(url);
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //7. Browser detector
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer'){
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) rv = parseFloat( RegExp.$1 );
    }else if (navigator.appName == 'Netscape'){
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)rv = parseFloat( RegExp.$1 );
    }if(rv>0){
        //It's IE
        $('#menu').addClass('IE');

        principalleft
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //8. Fix Youtube z-index
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('iframe[src*=youtube]').each(function( index ){
        $(this).attr('src',$(this).attr('src')+'?wmode=transparent&rel=0');
    });


    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //9. Google Analytics
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    var MyGoogleAnalyticsID = 'UA-48827699-1';
    var MyBlogURL = 'floro.ghost.io';


    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', MyGoogleAnalyticsID, MyBlogURL);
    ga('send', 'pageview');








    //-------------------------------------------------------------------------

    /*load color template*/
    $(".fa-bookmark").each(function(){
        $(this).css('color',$(this).data('color'));
    })

});//end document.ready



