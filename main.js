$(document).ready(function(){
  var lingueSupportate = ["it", "en"];
  $('#mybutton').click(function(){
    var searchValue = $('#search').val();
    $('.wrapper_schede').html('');
    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      data: {
        api_key: '77e9ef84dffb1c10523baea7f48cdf44',
        language: 'it',
        query: searchValue,
      },
      success: function(data){
        var movies = data.results;
        for(var i = 0; i < movies.length; i++){
          var movie = movies[i];
          movie.id = "Film"
          generaHtml(movie);
        }

        $.ajax({
          url: 'https://api.themoviedb.org/3/search/tv',
          method: 'GET',
          data: {
            api_key: '77e9ef84dffb1c10523baea7f48cdf44',
            language: 'it',
            query: searchValue,
          },
          success: function(data){
            console.log(data);
            var tvSeries = data.results;
            for(var i = 0; i < tvSeries.length; i++){
              var serie = tvSeries[i];
              serie.title = serie.name;
              serie.original_title = serie.original_name;
              serie.id = "Serie";
              // console.log(serie);
              generaHtml(serie);
            }
          },
          error: function(){
            alert("qualcosa non funziona");
          }
        });
      },
      error: function(){
        alert("qualcosa non funziona");
      },
    });
  });

  function generaHtml(oggetto) {
    var voto = Math.ceil((oggetto.vote_average) /2);
    var lingua = oggetto.original_language;
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);
    var context =
    {
      id: oggetto.id,
      title: oggetto.title,
      original_title: oggetto.original_title,
      language: bandieraPerLingua(lingua),
      rating: ratingInStelle(voto),
    };
    var html    = template(context);
    $('.wrapper_schede').append(html);
  };

  function bandieraPerLingua(lingua) {
    var htmlOutput = '';
    if (lingueSupportate.includes(lingua)) {
      htmlOutput += "<img class='bandiera' src='"+ lingua + ".png'>"
    }
    else {
      htmlOutput = "lingua non supportata";
    }

    return htmlOutput;
  }

  function ratingInStelle(voto) {
    var htmlOutput = '';
    for (var i = 0; i < 5; i++){
      if (i < voto){
        htmlOutput += "<i class='fas fa-star'></i>"
      }
      else {
        htmlOutput += "<i class='far fa-star'></i>"
      }
    }
    return htmlOutput;
  }
});
