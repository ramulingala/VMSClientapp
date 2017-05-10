(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditProvisioningMappingController: function(scope, routeParams, resourceFactory, location) {
	        scope.commands = [];
	        scope.provisioning = [];
	        scope.parameterFormData = {};
	        scope.commandParameters = []; 
	        scope.formData = {};
	        scope.provisionId=routeParams.id;
	      
	        resourceFactory.provisioningMappingResource.get({provisioningId: routeParams.id} , function(data) {
	        	
	            scope.commands = data.commands;
	            scope.provisioning = data.provisioning;
	            scope.commandParameters = data.commandParameters;
	            scope.formData = data;
	        });
	        
	        scope.addParameters = function () {
	        	if (scope.parameterFormData.commandParam && scope.parameterFormData.paramType) {
	              scope.commandParameters.push({commandParam:scope.parameterFormData.commandParam,
	            	  paramType:scope.parameterFormData.paramType});
	              scope.parameterFormData.commandParam = undefined;
	              scope.parameterFormData.paramType = undefined;
	        	}
	          };
	          
	        scope.deleteParameter = function (index) {
	        	scope.commandParameters.splice(index,1);
	        };
	          
	        scope.submit = function() {  
	        	
	        	scope.formData.commandParameters = new Array();
	            if (scope.commandParameters.length > 0) {
	              
	                 for (var i in scope.commandParameters) {
	                   scope.formData.commandParameters.push({commandParam:scope.commandParameters[i].commandParam,
	 	               paramType:scope.commandParameters[i].paramType});
	                 };
	             }
	             delete this.formData.provisioning;
	             delete this.formData.commands;
	             delete this.formData.status;
	             delete this.formData.id;
	             resourceFactory.provisioningMappingResource.update({provisioningId: routeParams.id}, this.formData, function(data){
	            	 location.path('/viewprovisioningmapping/' +data.resourceId);
	             });
	        };
	    }
	  });
	  mifosX.ng.application.controller('EditProvisioningMappingController', [
	      '$scope', 
	      '$routeParams',
	      'ResourceFactory',
	      '$location',
	      mifosX.controllers.EditProvisioningMappingController
	      ]).run(function($log) {
	    	  $log.info("EditProvisioningMappingController initialized");
	  });
	}(mifosX.controllers || {}));