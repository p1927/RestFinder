(function() {

	angular.module('Restfinder')
	    .directive('chatbox', chatbox)
		.controller('ChatCtrl', ChatCtrl);


function chatbox() {

		return {
			restrict: 'E',
			scope:{},
			controller: 'ChatCtrl',
			controllerAs: 'vm',
			templateUrl: '/common/directives/chatbox/chat.view.html'

		};
	}



	function ChatCtrl($scope, $routeParams, chat, authentication) {
		var vm = this;
		var socket = io.connect();
		vm.currentUser = authentication.currentUser();
		
		vm.chats = [];
		vm.joinned = false;
		vm.collapsed = true;

		vm.newUser = {
			name: '',
			room: 'RestFinder'
		};
		vm.msgData = {
			room: 'RestFinder',
			name: '',
			message: ''
		};

		$scope.$watch(function() {return authentication.currentUser();}, () => {
			vm.logout();
			vm.currentUser=authentication.currentUser();
			
			if (vm.currentUser) {
				vm.newUser = {
					name: vm.currentUser.name,
					room: 'RestFinder'
				};
				vm.msgData = {
					name: vm.currentUser.name,
					room: 'RestFinder',
					message: ''
				};
				vm.joinRoom();
			} else {
				vm.collapsed = false;
				vm.collapse();
			}
		}, true);

		vm.start = function() {  

     vm.user = JSON.parse(localStorage.getItem("user"));
 
			if (vm.user !== null) {  
				vm.getChatByRoom(vm.user.room);
				vm.msgData = {
					room: vm.user.room,
					name: vm.user.name,
					message: ''
				};
				vm.joinned = true;
				vm.scrollToBottom();}


				socket.on('new-message', function(data) { 
					if (data.message.room === vm.user.room) {
						vm.chats.push(data.message);
						$scope.$apply();
						vm.msgData = {
							room: vm.user.room,
							name: vm.user.name,
							message: ''
						};
						vm.scrollToBottom();
					 }
				 });



			
		}


		vm.scrollToBottom = function() {
			try {
				var scroll = $('#scrollMe');
				setTimeout(() => {
					scroll.animate({
						scrollTop: scroll.prop('scrollHeight')
					})
				}, 0);

			} catch (err) {}
		}

		vm.getChatByRoom = function(room) {
			chat.getchat(room)
				.then((res) => {
					vm.chats = res.data;
					vm.scrollToBottom();
				}, (err) => {
					console.log(err);
				});
		}

		vm.joinRoom = function() {
			var date = new Date();
			localStorage.setItem("user", JSON.stringify(vm.newUser));
			vm.user=JSON.parse(localStorage.getItem("user"));
			vm.getChatByRoom(vm.newUser.room);
			vm.msgData = {
				room: vm.newUser.room,
				name: vm.newUser.name,
				message: ''
			};
			vm.joinned = true;
			vm.collapsed = false;
          
			socket.emit('save-message', {
				room: vm.newUser.room,
				name: vm.newUser.name,
				message: 'Joined the chat',
				updated_at: date
			});
		}

		vm.sendMessage = function() { 
			chat.post(vm.msgData)
				.then((result) => {
					socket.emit('save-message', result.data);
					vm.msgData.message = '';
					vm.scrollToBottom();
				}, (err) => {
					console.log(err);
				});
		}



		vm.logout = function() {
			

			if (vm.user) { var date = new Date();
				socket.emit('save-message', {
					room: vm.user.room,
					name: vm.user.name,
					message: 'Left the chat',
					updated_at: date
				});
				localStorage.removeItem("user");

				vm.joinned = false;
			}
		}

		vm.collapse = function() {
        if(vm.collapsed)
            $("#chatarrow").attr("src", "/images/down.png");
        else  $("#chatarrow").attr("src", "/images/up.png");
			vm.collapsed = !vm.collapsed;


		}


	}



})(); //IIFE