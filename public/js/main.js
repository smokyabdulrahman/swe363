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
// function edit(id){
//     $.ajax({
//         type: 'PUT', 
//         url: '/admins/profiles/edit', 
//         data: {
//           userId: id,
//           newData: 
//         },
//       }).done(function(res) {
//         console.log(res);
//         location.reload();
//       })
// }