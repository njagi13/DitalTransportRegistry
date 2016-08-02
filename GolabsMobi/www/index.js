    /*jshint browser:true */
    /*global $ */(function()
    {
     "use strict";
     /*
       hook up event handlers 
     */

         /* button  Capture */

    $(document).on("click", "#capturebtn", function(evt)
    {       
    navigator.camera.getPicture(uploadPhoto, onFail, { 
    quality: 100, destinationType: Camera.DestinationType.DATA_URL 
    });
    navigator.geolocation.getCurrentPosition(onLocationSuccess,onLocationError);
    });   
    
     $(document).on("click", "#captureVideobtn", function(evt)
    {       
   captureVideo();
    });
       
    var locationPostion = {};
    var onLocationSuccess = function(position) {       
    locationPostion.latitude =position.coords.latitude ;
    locationPostion.longitude =position.coords.longitude ;
    locationPostion.altitude = position.coords.altitude ;
    locationPostion.speed = position.coords.speed ;  
    };

    function onLocationError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    }
        
            /* button  Send */
    $(document).on("click", ".uib_w_2", function(evt)
    {
        postPhoto();
    });  

    var imageUri = null;
    function postPhoto() {
   
   var dt={};
        //Here we are passing as a Base64
        dt.image = imageUri;
        dt.latitude = locationPostion.latitude;
         dt.longitude =locationPostion.longitude;
      $.post( "http://localhost:30100/api/Picture", dt, function(data) {

      });
     alert("Sent!");
    }
        //Success callback
    function win(r) {
        alert("Image uploaded successfully!!");
    }
    //Failure callback
     function fail(error) {
                alert("An error has occurred: Code = " + error.code);
            }

        function uploadPhoto(imageURI) {
            imageUri = imageURI;
        //If you wish to display image on your page in app
        // Get image handle
        var largeImage = document.getElementById('largeImage');
                    // Unhide image elements         
        largeImage.style.display = 'block';
        // Show the captured photo
        // The inline CSS rules are used to resize the image
        largeImage.src = "data:image/png;base64,"+imageURI;
        }


         function onSuccess(imageData){          
                alert("Picture taken");
            }
           function onFail(message){          
                alert("Error taking Picture" + message);
            }
     document.addEventListener("app.Ready", register_event_handlers, false);

        
        //Video
          function captureSuccess(mediaFiles) 
        {
            var i, len;
            for (i = 0, len = mediaFiles.length; i < len; i += 1) 
           {
               var filyeSystem_path = mediaFiles[i].fullPath;
               document.getElementById("url").innerHTML = filyeSystem_path;
               
               var fileName = mediaFiles[i].name;
               document.getElementById("name").innerHTML = fileName;
           }       
       }
       
       function captureError(error) 
       {
           var msg = 'An error occurred during capture: ' + error.code;
           navigator.notification.alert(msg, null, 'Uh oh!');
       }
       
       function captureVideo() 
       {
           navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1, duration: 10});
       }

    })();
