var userAddress, userName;
var appInit = function(){ // should be appInit
	userAddress = find_get_parameter('address'); // TODO validation
	// get posts this user has written in the past
	get_posts(userAddress); // should be postManager.findPosts(addr)

	// get the user's name and display italic
	get_name(userAddress).then(function(name){ // should be NamManager.resolve(addr)
		userName = name;
		$('#myName').html(name.hash + name.name);
		$('#headertitle').text(name.name);
	});
}
var handle_new_post = function(post){ // should be onIncomingPost
	// Only display posts sent by this user
	if(post.sender == userAddress){
		render_post(post, post.isLive, '#posts'); // should be post.render()
	}
}
