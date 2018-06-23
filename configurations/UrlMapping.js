	module.exports = function(app) {
	  var controllers = app.controllers,
	    views = app.views;

	  return {

	    "/v1/api/admin/users": [{
	      method: "POST",
	      action: controllers.userController.createUser,
	      middleware: [],
	      views: {
	        json: views.jsonView
	      }
	    },

	     {
	      method: "GET",
	      action: controllers.userController.getUser,
	      middleware: [],
	      views: {
	        json: views.jsonView
	      }
	    }],

			"/v1/api/admin/login": [{
			 method: "POST",
			 action: controllers.userController.login,
			 middleware: [],
			 views: {
				 json: views.jsonView
			 }
		 }],



	    "/user/:id": [{
	        method: "GET",
	        action: controllers.userController.getUser,
	        middleware: ["hello"],
	        views: {
	          json: views.jsonView
	        }
	      },
	      {
	        method: "put",
	        action: controllers.userController.updateUser,
	        middleware: ["hello"],
	        views: {
	          json: views.jsonView
	        }
	      },
	      {
	        method: "delete",
	        action: controllers.userController.deleteUser,
	        middleware: ["hello"],
	        views: {
	          json: views.jsonView
	        }
	      }
	    ]

	  };
	};
