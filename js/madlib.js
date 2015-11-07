$(document).ready(function(){
  //convertCanvasToImage("testCanvas")
  $("#build").click(function(){
    vision = $("#vision").val();
    audience = $("#audience").val();
    problem = $("#problem").val();
    strategy = $("#strategy").val();
    goal = $("#goal").val();
    buildMadlib(vision, audience, problem, strategy, goal);
  });
  $("#rebuild").click(function(){
    $('#madlib').fadeOut(100, function(){
      $('#madlibForm').fadeIn(200);
    });
  });
});

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

function buildMadlib(vision, audience, problem, strategy, goal) {
  var can = document.getElementById('testCanvas'),
      ctx = can.getContext('2d');

  // Variables for text wrap
  var maxWidth = 820,
      x = (can.width - maxWidth) / 2,
      y = 60,
      lineHeight = 27;

  ctx.fillStyle = '#F9F7ED';
  ctx.fillRect(0,0,880,440);

  // Add Logo
  // ctx.drawImage(logo,740,340,100,55);

  // Build statement
  var theVision = 'In order to ' + vision + ',',
      theAudience = 'our product will solve ' + audience,
      theProblem = 'problem of ' + problem,
      theStrategy = 'by giving them ' + strategy + '.',
      theGoal = 'We will know if our product works when we see ' + goal + '.',
      logo = document.getElementById("logo");

  ctx.font = "normal 24px Georgia";
  ctx.fillStyle = '#7A7A7A';

  wrapText(ctx, theVision, x, y, maxWidth, lineHeight);
  wrapText(ctx, theAudience, x, 120, maxWidth, lineHeight);
  wrapText(ctx, theProblem, x, 180, maxWidth, lineHeight);
  wrapText(ctx, theStrategy, x, 240, maxWidth, lineHeight);
  ctx.font = "italic 24px Georgia";
  wrapText(ctx, theGoal, x, 300, maxWidth, lineHeight);

  // Powered by
  var textString = "♥ buildshow.co",
      textWidth = ctx.measureText(textString).width;

  ctx.fillStyle =  '#8a8a8a';
  ctx.font = "normal 18px Arial";
  ctx.fillText(textString, (can.width / 2) - (textWidth / 2.5), 390);

  var img = new Image();
  img.src = can.toDataURL();

  $('#madlib img').attr('src', img.src);
  $("#saveMadlib").attr('href', img.src);
  $('#madlibForm').fadeOut(100, function(){
    $('#madlib').fadeIn(200);
  });

}
