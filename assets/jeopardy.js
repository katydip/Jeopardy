(function() {

  $(function() {

//declaring global functions
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
    var nextquestion;
    var nextcategory;


//newQuestion is getting the data from the API
    function newQuestion() {
      return $.get("http://jservice.io/api/random", function(data) {
        // console.log(data[0]);
        nextcategory = data[0].category.title;
        nextquestion = data[0].question;
        valuepoints = data[0].value;
        rightanswer = data[0].answer;
        console.log("HINT, the answer is: " + rightanswer);
      });
    }

//this takes the variables I assigned with the data I got from API, and plugs them into the html/DOM
    function populate(data) {
      category.html(nextcategory);
      question.html(nextquestion);
      points.html(valuepoints);
    };

// AND GO! take the info from newQuestion once it is done, and run populate so a question pops up
    let randomquestion = newQuestion();
    randomquestion.done(function(data) {
      populate(data);
    });

//ok now for the submit- when clicked, this takes the bestguess and compares it to
//the rightanswer and populates that section of html.
//the if statement gives feedback and adds points
    submitbutton.click(function() {
      console.log(bestguess.val());

      submitted.html(bestguess.val());
      correctanswer.html(rightanswer);

      if (bestguess.val() == rightanswer) {
        feedback.html("Correct answer! You get $" + valuepoints + ".");
        totalscore.html(parseInt(totalscore.html()) + parseInt(valuepoints));
      } else {
        feedback.html("Sorry, better luck next time. Zero points this round.");
        // totalscore.html(parseInt(totalscore.html()) + 0);
      }

//this is still inside the click function- so after guess is submitted this
//gets and populates a new question into the html, and clears the guess textbox
      randomquestion = newQuestion();
      randomquestion.done(function(data) {
        populate(data);
      });
      bestguess.val("");


    }); //end of click function




  })

})();
