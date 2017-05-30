window.projectName = window.projectName || {};

projectName = {

  init: function() {

    projectName.namespace1();
    projectName.namespace2();
    projectName.namespace3();

  },


  namespace1: function() { console.log("this is namespace1"); },



  namespace2: function() { console.log("this is namespace2"); },



  namespace3: function() { console.log("this is namespace3");   }

};

$(document).ready(function() { projectName.init(); });

// ..............................................................................
