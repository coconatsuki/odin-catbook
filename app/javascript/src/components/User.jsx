import React from "react";
import PropTypes from "prop-types";

class User extends React.Component {
  // static propTypes = {
  //   user: PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     name: PropTypes.string.isRequired
  //   }).isRequired
  // }

  // state = {
  // };

  render() {
    return (
      <>
        <p>I'M A USER</p>
      </>
    );
  }
}

export default User;

{
  /* <h2>
  <div class="gravatar-image">
    <% if @user.avatar.file %>
      <%= image_tag( @user.avatar.url )  %>
    <% elsif @user.image %>
        <%= image_tag( @user.image, height: '200' ) %>
    <% else %>
      <%= gravatar_for @user %>
    <% end %>
</div>
  Name: <%= @user.name %>
</h2>
<% if @user == current_user %>
  <%= render 'requests' %>
  <p><%= link_to "Edit profile", edit_user_path(@user) %></p>
  <p>What's in your mind today?</p>
  <%= render 'posts/post_form' %>
<% else %>
  <%= render "request_button" %>
<% end %>

<% if @user == current_user || @current_user_friends.include?(@user) %>

   <h4>POSTS : </h4>
   <p>--------------------------------------</p>

   <%= render @posts %>

   <h4>Friends:</h4>
   <ul>
     <% @user_friends.each do |f| %>
       <li><%= link_to f.name, f %></li>
     <% end %>
   </ul>
 <% else %>
    <p>If you're not friend with this cat, you can't see its page.</p>
 <% end %> */
}
