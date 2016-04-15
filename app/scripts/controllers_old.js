﻿'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope','menuFactory', function ($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.dishes = menuFactory.getDishes();
            $scope.select = function (setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function () {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function ($scope) {

            $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };

            var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])

        .controller('FeedbackController', ['$scope', function ($scope) {

            $scope.sendFeedback = function () {

                console.log($scope.feedback);

                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
                    $scope.feedback.mychannel = "";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

            var dish = menuFactory.getDish(parseInt($stateParams.id,10));

            $scope.dish = dish;

        }])

        .controller('DishCommentController', ['$scope', function ($scope) {

            //Step 1: Create a JavaScript object to hold the comment from the form
            var newComment = {
                author: "",
                rating: 5,
                comment: "",
                date: ""
            };

            $scope.newComment = newComment;

            $scope.submitComment = function () {

                //Step 2: This is how you record the date
                newComment.date = new Date().toISOString();

                // Step 3: Push your comment into the dish's comment array

                //Make sue we have a integer value for the rating so they order correctly
                newComment.rating = parseInt(newComment.rating, 10);
                $scope.dish.comments.push(angular.copy(newComment));

                //Step 4: reset your form to pristine
                $scope.feedbackForm.$setPristine();

                //Step 5: reset your JavaScript object that holds your comment
                newComment.author = newComment.comment = newComment.date = "";
                newComment.rating = 5;
                console.log($scope.dish.comments)
            }
        }]);