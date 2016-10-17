// Define a properties array that returns array of objects representing
// the accepted properties for your application
var properties = [
  {id: "SVG", type: "file-input"}
];

// Define an executor function that builds an array of volumes,
// and passes it to the provided success callback, or invokes the failure
// callback if unable to do so
var executor = function(args, success, failure) {
  var params = args.params;
  var volumes = [];
  var width=5, height=5, radius=2;
  
  //Not sure there it is useful to follow the async pattern here.  So simplify for general use and make it synchronous
  //null means there was an error.
  var getFileInput = function (fileInputParam) {
    var contents = null;
    var client = new XMLHttpRequest();
    client.open('GET', fileInputParam + "&_bust=" + new Date().getTime(), false);
    client.send();
    if (client.readyState == 4 && client.status == 200) {
      return client.responseText;
    } else if (client.readyState == 4) {
      console.log(client.status + ' ' + client.statusText);
      return null;
    }
  }

  //Only once selected
  if (params.SVG) {
    console.log(params.SVG);
    console.log(getFileInput(params.SVG));
  }

  //For now just default as it does not like []
  var volumes = [{
    shape: {
      type: "rectangle",
      center: {
        x: 5,
        y: 5
      },
      flipping: {},
      width: 5,
      height: 5,
      rotation: 0,
      cornerRadius: {
        x: 1,
        y: 1
      }
    },
    cut: {
      depth: 0,
      type: 'outline',
      outlineStyle: 'on-path',
      tabPreference: false
    }
  }];

  success(volumes);
};
