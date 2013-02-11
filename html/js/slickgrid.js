function MyGrid($scope) {
  $scope.model = {
    columns: [
      {id: "title", name: "Title", field: "title"},
      {id: "duration", name: "Duration", field: "duration"},
      {id: "%", name: "% Complete", field: "percentComplete"},
      {id: "start", name: "Start", field: "start"},
      {id: "finish", name: "Finish", field: "finish"},
      {id: "effort-driven", name: "Effort Driven", field: "effortDriven"}
    ],
    options: {
      enableCellNavigation: true,
      enableColumnReorder: false,
      syncColumnCellResize: true
    },
    data: []
  }
 
  $scope.addRow = function addRow() {
    var i = $scope.model.data.length;
    $scope.model.data.push({
      id: i,
      title: "Task " + i,
      duration: "5 days",
      percentComplete: Math.round(Math.random() * 100),
      start: "01/01/2009",
      finish: "01/05/2009",
      effortDriven: (i % 5 === 0),
      hidden: 'hidden secret'
    });
    $scope.log = "Added row " + i;
  }
  
  $scope.toggleHidden = function toggleHidden() {
    $scope.model.columns.push({id: "hidden", name: "*Himitsu*", field: "hidden"});
    $scope.log = "Added Hidden Col";  
}
  
  for (var i = 0; i < 5; i++) {
    $scope.addRow();
  }
  
  $scope.log = "nothing yet";
}

angular.module('ui.slickgrid',[])
   .directive('slickgrid', function() {
     return {
        template: '<div class="grid"></div>',
        replace: true,
        restrict: 'EA',
        scope: {
            data: '=data',
            columns: '=columns',
            options: '=options'
        },
        link: function(scope, element, attrs) {
           var grid = new Slick.Grid(element, scope.data, scope.columns, scope.options); 
           scope.$watch('data', function(data) {
               grid.updateRowCount();
               grid.render();
           },true);

           scope.$watch('columns', function(columns) {
               grid.setColumns(columns);
           },true);
        }
     };
   });