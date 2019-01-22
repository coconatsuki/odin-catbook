import React from "react";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import * as moment from "moment";

class Post extends React.Component {
  static propTypes = {
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }),
    post: PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      smallImageUrl: PropTypes.string,
      created_at: PropTypes.string.isRequired
    }).isRequired,
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }),
    refreshPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    errorMessages: PropTypes.array.isRequired
  };

  state = {
    edit: false
  };

  canEdit = () => {
    const { currentUser, author } = this.props;
    return currentUser && author.id === currentUser.id;
  };

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  };

  render() {
    const { post, author, currentUser, deletePost, refreshPosts } = this.props;
    return (
      <>
        {this.state.edit ? (
          <PostForm
            refreshPosts={refreshPosts}
            postToEdit={post}
            toggleEdit={this.toggleEdit}
          />
        ) : (
          <article>
            {this.canEdit && (
              <div className="controls">
                <ul>
                  {this.props.errorMessages.map((msg, index) => (
                    <li key={`error${index}`} style={{ color: "red" }}>
                      {msg}
                    </li>
                  ))}
                </ul>
                <button onClick={this.toggleEdit}>Edit Post</button>
                <button onClick={() => deletePost(post.id)}>Delete Post</button>
              </div>
            )}
            <p>
              <strong>Written by => {author.name}</strong>
            </p>
            <p>
              CURRENT USER =>
              {currentUser ? currentUser.name : ""}
            </p>
            <p>POST BODY =></p>
            <p>{post.body}</p>
            <img width="200" src={post.smallImageUrl} alt="post image" />
            <p>MOMENT =></p>
            <p>Posted {moment(post.created_at, "YYYY-MM-DD").fromNow()}</p>
          </article>
        )}
        <p>--------------------------------------</p>
      </>
    );
  }
}

export default Post;

// <%= link_to "Edit post", edit_post_path(post) if post.author == current_user %>
// <p><strong><%= post.author.name %></strong> wrote
// <%= time_ago_in_words(post.created_at) %> ago:</p>

// <p><%= post.body %></p>

// <%= image_tag post.picture.url if post.picture? %>

// <%= link_to post_likes_path(post) do %>
//   <strong id="likes-count-<%= post.id %>"><%= post.likes.size %> people like this.</strong>
// <% end %>

// <% if like = post.already_like(current_user) %>
//   <div id="likes-<%= post.id %>"><%= render partial: 'likes/unlike_form', :locals => {:post => post, like: like  } %></div>
// <% else %>
//   <div id="likes-<%= post.id %>"><%= render partial: 'likes/likes_form', :locals => {:post => post } %></div>
// <% end %>

// <strong>Comments:</strong>
// <div id="comments"><%= render partial: 'comments/index', :locals => {:post => post } %></div>

// <strong>Write a new comment :</strong>
// <%= render partial: 'comments/form', :locals => {:post => post } %>

// <p>
//   --------------------------------------
// </p>
