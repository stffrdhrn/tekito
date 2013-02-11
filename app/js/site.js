function EmailCtrl($scope,$location,emailData) {
    $scope.text = emailData.text;
    $scope.names = emailData.names;
    
    if (!$scope.text) {
        $location.path('/names');
    }
}

function NamesCtrl($scope,$location,emailData,modalService) {
    $scope.names = [
        {
            id: 23,
            name: "Stafford"
        },
        {
            id: 45,
            name: "Sachi"
        },
        {
            id: 43,
            name: "Fred"
        }
        ];
    $scope.recipients = [];
    $scope.text = "no text yet";
    $scope.notice = null;
    
    var validate = function() {
        $scope.notice = null;
        
        if ($scope.recipients.length === 0) {
            $scope.notice = "Please select recipients before sending mail";
        } 
        
        return !$scope.notice;
    }
    
    $scope.sendEmail = function() {
        if (validate()) {
            modalService.show();
        }
    };

    $scope.sendDirectEmail = function(selectedName) {
        $scope.names.forEach(function(name) {
            if (name.name === selectedName) {
                name.selected = true;
            } else {
                name.selected = false;
            }
            $scope.nameChange();
        });
        $scope.sendEmail();
    };

    $scope.cancelEmail = function() {
        modalService.hide();
        //$('.modal').modal('hide');
    };
    
    $scope.submit = function() {
        if (validate()) {
            emailData.names = $scope.recipients;
            emailData.text = $scope.text;
            $location.path('/email');
            $('.modal').modal('hide');
        }
    };
    
    $scope.nameChange = function() {
        $scope.recipients = [];
        $scope.names.forEach(function(name) {
            if (name.selected) {
               $scope.recipients.push(name.name);
            }    
        });
        validate();
    };
    $('.modal').modal({
        backdrop: true,
        show: false
    });
}

angular.module('app',[]).
   config(['$routeProvider', function($routeProvider){
      $routeProvider.
      when('/names', {templateUrl: 'partials/names.html', controller: NamesCtrl}).
      when('/email', {templateUrl: 'partials/email.html', controller: EmailCtrl}).
      otherwise({redirectTo: '/names'});    
   }]).
   value('emailData', { names: [] }).
   factory('modalService', function(){
      return { 
        hide : function() {
          $('.modal').modal('hide');   
        },
        show : function() {
          $('.modal').modal('show');
        }
      };
   });
   
  
