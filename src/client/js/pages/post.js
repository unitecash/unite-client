// some global vars for this script
var topPostTXID = find_get_parameter('post');
var topPost;
var appInit = function(){
	get_post(topPostTXID).then(function(post){
		topPost = post;
		get_posts(topPost.sender);
		render_post(post, 0, '#topPost');
	});;
}
var handle_new_post = function(post){
	if(post.parent == topPost.sender && (post.type == 5503 || post.type == 5505)){
		render_post(post, 0, '#posts');
	}
}
