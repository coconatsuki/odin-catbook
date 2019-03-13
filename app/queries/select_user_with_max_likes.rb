# frozen_string_literal: true

class SelectUserWithMaxLikes
  QUERY = <<-SQL
  SELECT * FROM (
    SELECT users.user_id AS user_id, users.user_name AS user_name, count(1) AS likes_received, max(likes.created_at) AS max_created_at
    FROM (
      SELECT DISTINCT u.id AS user_id, u.name AS user_name
      FROM users AS u
      JOIN (
        SELECT f.requested_id AS requested, f.requesting_id AS requesting
        FROM users AS u
        LEFT JOIN friendships AS f ON f.requested_id = u.id OR f.requesting_id = u.id
        WHERE (f.accepted = 't' OR f.accepted IS NULL) AND u.id = $1
      ) AS friendship_query
      ON u.id = requested OR u.id = requesting
      ) AS users
      JOIN posts ON users.user_id = posts.author_id
      JOIN likes ON posts.id = likes.post_id
      WHERE likes.created_at > date_trunc('week', CURRENT_TIMESTAMP) AND likes.positive = 't'
      GROUP BY users.user_id, users.user_name
      ) AS subquery
    ORDER BY likes_received DESC, max_created_at DESC
    LIMIT 1;
  SQL

  def self.execute(user_id)
    OpenStruct.new(ActiveRecord::Base.connection.exec_query(QUERY, 'user-with-max-likes', [[nil, user_id]]).first)
  end
end
