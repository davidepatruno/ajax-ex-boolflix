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
          console.log(movies[i]);
          var voto = Math.ceil((movie.vote_average) /2);
          var lingua = movie.original_language;
          var source = $('#movie-template').html();
          var template = Handlebars.compile(source);
          var context =
          {
            title: movie.title,
            original_title: movie.original_title,
            language: bandieraPerLingua(lingua),
            // language: bandieraPerLingua(language),
            rating: ratingInStelle(voto),
          };
          var html    = template(context);
          $('.wrapper_schede').append(html);
        }

      },
      error: function(){
        alert("qualcosa non funziona");
      },
    });
  });

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
