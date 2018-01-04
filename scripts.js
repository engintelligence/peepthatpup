
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#preview img').attr('src', e.target.result)
            $('#preview').show()
            $('.btn-text').text("Another photo?")

            var img = new Image();
            img.src = e.target.result;

            img.onload = function() {
              rawdata = { dog_image: e.target.result.split(',')[1], image_size: [this.height, this.width] };
              console.log(rawdata)

              jsondata= JSON.stringify(rawdata)
              console.log(jsondata)

              uploadImage(jsondata)
            }
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function uploadImage( e ){
  $.ajax({
      url: 'http://119.17.135.73:7171/predict',
      dataType: 'json',
      type: 'post',
      contentType : 'application/json',
      data : e,
      success: function( data, textStatus, jQxhr ){
          console.log( data );
          console.log( textStatus );
          console.log( jQxhr );


          var array = [];
          for (var key in data) {
            array.push({
              name: key,
              value: data[key]
            });
          }

          var sorted = array.sort(function(a, b) {
            return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0)
          });

          console.log(sorted)

          $('.sk-cube-grid').hide();
          $('.checkmark').show();
          $('#analyzing').hide();
          $('#name').text(sorted[0].name);
          setTimeout(function(){
            $('#name').slideDown(150);
          }, 1200);

      },
      error: function( jqXhr, textStatus, errorThrown ){
          console.log( errorThrown );
      }
  });
}