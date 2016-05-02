$(document).ready(function() {
  var source = $('#albums-template').html();
  albumsTemplate = Handlebars.compile(source);

  source = $('#album-template').html();
  albumTemplate = Handlebars.compile(source);

  source = $('#modal-template').html();
  modalTemplate = Handlebars.compile(source);

  source = $('#dropdown-template').html();
  dropdownTemplate = Handlebars.compile(source);

  $('#dropdown').html(dropdownTemplate(animals_data));

  function showTemplate(template, data) {
    $('#content').html(template(data));
  }

  function showModal(data) {
    $('#modal-container').html(modalTemplate(data));
    $("#imageModal").modal('show');
  }

  function showCategory(event) {
    var index = $(this).data('index');
    current_category = animals_data.category[index];
    var name = current_category.name;
    $('#header-name').html(name);
    showTemplate(albumTemplate, current_category);
    $('.jumbotron').html('<h1>Wow! <small>Check out these cool <span id="header-name">' + name.toLowerCase() + '</span>!</small></h1>');
  }

  showTemplate(albumsTemplate, animals_data);

  $('#content').on('click', '#albums .album-thumbnail-parent', function() {
    var index = $(this).data('index');
    current_category = animals_data.category[index];
    $('#header-name').html(current_category.name.toLowerCase());
    showTemplate(albumTemplate, current_category);
  });

  $('#content').on('click', '#albums .album-thumbnail-parent', showCategory);
  $('#dropdown a').click(showCategory);

  $('#content').on('click', '#animals .album-thumbnail-parent', function() {
    var index = $(this).data('index');
    animal = current_category.animals[index];
    showModal(animal);
  });

  $('#modal-container').on('click', '#close-modal', function() {
    $('#imageModal').modal('hide');
  });

  $('#content').on('click', '#back-button', function() {
    showTemplate(albumsTemplate, animals_data);
    $('#header-name').text("animals");
  })

  $('#content').on('mouseenter mouseleave', '.album-thumbnail-parent', function() {
    $(this).toggleClass('hover');
    $(this).find('.album-title, .album-thumbnail').toggleClass('hover');
  });

  $('#about').click(function() {
    $.get("about.html", function(text) {
      $("#content").html(text);
    });
    $('.jumbotron').html('<h1>About</h1>');
  });
});