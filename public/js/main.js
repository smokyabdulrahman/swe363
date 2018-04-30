function approve(id){
    $.ajax({
        type: 'PUT', 
        url: '/admins/profiles/approve', 
        data: {
          userId: id
        },
      }).done(function(res) {
        console.log(res);
        location.reload();
      })
}

function reject(id){
    $.ajax({
        type: 'PUT', 
        url: '/admins/profiles/reject', 
        data: {
          userId: id
        },
      }).done(function(res) {
        console.log(res);
        location.reload();
      })
}

function deleteEdu(id){
    $.ajax({
        type: 'DELETE', 
        url: '/educations/' + id, 
      }).done(function(res) {
        console.log(res);
        location.reload();
      })
}

function deleteWork (id){
  $.ajax({
    type: 'DELETE', 
    url: '/workexperiences/'+id, 
  }).done(function(res) {
    console.log(res);
    location.reload();
  })
}

function deletePublication(id, userId){
  $.ajax({
    type: 'DELETE', 
    url: '/publications/'+id, 
    data: {
      id: userId
    },
  }).done(function(res) {
    console.log(res);
    location.reload();
  })
}
function createCV(){
  $('#element-to-print').removeAttr('hidden');
  var element = document.getElementById('element-to-print');
  html2pdf(element, {
    margin:       2,
    filename:     'cv.pdf',
  });
  $('#element-to-print').attr('hidden', 'hidden');

}