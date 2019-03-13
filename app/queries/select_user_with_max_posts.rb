# frozen_string_literal: true

class SelectUserWithMaxPosts
  QUERY = <<-SQL
  SELECT * FROM (
    SELECT users.id AS user_id, users.name AS user_name, count(1) AS number_of_posts, max(posts.created_at) AS max_created_at
    FROM (
      SELECT DISTINCT u.id AS id, u.name AS name
      FROM users AS u
      JOIN (

        SELECT f.requested_id AS requested, f.requesting_id AS requesting
        FROM users AS u
        LEFT JOIN friendships AS f ON f.requested_id = u.id OR f.requesting_id = u.id
        WHERE (f.accepted = 't' OR f.accepted IS NULL) AND u.id = $1
      ) AS friendship_query

      ON u.id = requested OR u.id = requesting
    ) AS users
    JOIN posts ON users.id = posts.author_id
    WHERE posts.created_at > date_trunc('week', CURRENT_TIMESTAMP)
    GROUP BY users.id, users.name
  ) AS subquery

  ORDER BY number_of_posts DESC, max_created_at DESC
  LIMIT 1;
  SQL

  def self.execute(user_id)
    OpenStruct.new(ActiveRecord::Base.connection.exec_query(QUERY, 'user-with-max-posts', [[nil, user_id]]).first)
  end
end
