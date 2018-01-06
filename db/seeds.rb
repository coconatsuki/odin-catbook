# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

cat_names = []
50.times { |_n| cat_names << Faker::Cat.name }
CAT_NAMES = cat_names.uniq

CAT_NAMES.size.times do |n|
  name = CAT_NAMES[n]
  email = "#{name}@catmail.com"
  password = "password"
  User.create!(name: name,
               email: email,
               password: password,
               password_confirmation: password)
end

# Posts
movie_quotes = []
50.times { |_n| movie_quotes << Faker::Movie.quote }

users = User.all
2.times do |_n|
  users.each { |user| user.posts.create!(body: movie_quotes.sample) }
end

# Friendships
first_user = users.first
requested_friends = users[2..7]
requesting_friends = users[8..15]
requested_friends.each { |friend| first_user.sent_friendships.create(accepted: true, requested: friend) }
requesting_friends.each { |friend| first_user.received_friendships.create(accepted: true, requesting: friend) }
