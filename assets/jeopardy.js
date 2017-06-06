(function() {

  $(function() {

    var question = $("#question");
    var category = $("#category");
    var points = $(".points");
    var correctanswer = $("#correctanswer");
    var bestguess = $("#guess");
    var submitbutton = $("#button");
    var submitted = $("#submitted");
    var totalscore = $("#total_points");
    var feedback = $("#feedback");
    var rightanswer;
    var valuepoints;
    initialize();

    function initialize(){
    $.get("http://jservice.io/api/random", function(data) {

      console.log(data[0]);
      category.html(data[0].category.title);
      valuepoints = data[0].value;
      points.html(valuepoints);
      question.html(data[0].question);
      rightanswer = data[0].answer;
      console.log(rightanswer);

  });
}


    submitbutton.click(function() {
      console.log(bestguess.val());
      console.log(rightanswer);

      submitted.html(bestguess.val());
      correctanswer.html(rightanswer);

      if (bestguess.val() == rightanswer) {
        feedback.html("Correct answer! You get $" + valuepoints +  ".");
        totalscore.html(parseInt(totalscore.html()) + parseInt(valuepoints));
      } else {
        feedback.html("Sorry, better luck next time. Zero points this round.");
        totalscore.html(parseInt(totalscore.html()) + 0);

      }
      initialize();
      bestguess.val("");


    });








  })

})();
