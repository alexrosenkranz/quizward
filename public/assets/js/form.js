$(document).ready(function() {

  $('.new-quiz').on('click', 'button', function(e) {
    e.preventDefault();
  });

  function populateCats() {
    $.get("/quizzes/api/new", function(categories) {
      for (var i = 0; i < categories.length; i++) {
        let category = $('<option>').attr('val', categories[i].id).html(categories[i].name);
        $('.categories').append(category);
      }
    });
  }
  populateCats();

  function newChoice() {
    let choiceContainer = $(this).parent().find('.choice-container');
    let newChoice = $(this).parent().find('.copy-choice').clone();
    newChoice.val('');

    // let newChoiceHolder = $('<span>').addClass('added-choice');
    // let newChoice = $('<input>').attr('type', 'text').attr('placeholder', 'Choice').addClass('form-control col-sm-9');
    let newChoiceRemove = $('<button>').addClass('btn btn-danger remove-choice').text('X');
    newChoice.append(newChoiceRemove);
    choiceContainer.append(newChoice);
  }

  // Add choice to question
  $(document).on('click', '.add-choice', newChoice);

  $(document).on('click', '.remove-choice', function() {
    $(this).parent().remove();
  });

  $(document).on('click', '.add-question', function() {
    let newQuestion = $('.q5').clone();
    newQuestion.removeClass('q5');
    let newQuestionRemove = $('<button>').addClass('btn btn-danger remove-question').text('Remove Question');
    newQuestion.append(newQuestionRemove);
    $('.additional-questions').append(newQuestion);
  });

  $(document).on('click', '.remove-question', function() {
    $(this).parent().remove();
  });



});