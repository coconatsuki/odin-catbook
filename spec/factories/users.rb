# frozen_string_literal: true
# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  birthday               :date
#  breed                  :string
#  city                   :string
#  country                :string
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :inet
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  large_cover_pic        :string
#  large_profile_pic      :string
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :inet
#  name                   :string
#  provider               :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  small_cover_pic        :string
#  small_profile_pic      :string
#  things_i_hate          :string           is an Array
#  things_i_like          :string           is an Array
#  uid                    :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_name                  (name) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#

FactoryBot.define do
  factory :user do
    name { Faker::Cat.unique.name }
    email { "#{name}@catmail.com" }
    password { Faker::Lorem.characters(10) }
    birthday { Faker::Time.between(20.years.ago, 1.month.ago, :day) }
    country { Faker::LordOfTheRings.location }
    city { Faker::HarryPotter.location }
    things_i_like { Faker::Hipster.words(Random.rand(1..5)) }
    things_i_hate { Faker::Hipster.words(Random.rand(1..5)) }
    small_profile_pic { "/some/awesome/small/profile/pic/url" }
    large_profile_pic { "/some/awesome/large/profile/pic/url" }
    small_cover_pic { "/some/awesome/small/cover/pic/url" }
    large_cover_pic { "/some/awesome/large/profile/pic/url" }

    trait :with_posts do
      after(:create) do |user|
        create_list(:post, Random.rand(1..4), author: user)
      end
    end

    trait :with_comments do
      after(:create) do |user|
        create_list(:comment, Random.rand(1..4), author: user)
      end
    end

    trait :with_likes do
      after(:create) do |user|
        create_list(:like, Random.rand(1..4), author: user)
      end
    end

    trait :with_sent_friendships do
      after(:create) do |user|
        create_list(:friendship, Random.rand(1..4), requesting: user)
      end
    end

    trait :with_received_friendships do
      after(:create) do |user|
        create_list(:friendship, Random.rand(1..4), requested: user)
      end
    end

    trait :with_sent_pending_friendships do
      after(:create) do |user|
        create_list(:friendship, Random.rand(1..4), :pending, requesting: user)
      end
    end

    trait :with_received_pending_friendships do
      after(:create) do |user|
        create_list(:friendship, Random.rand(1..4), :pending, requested: user)
      end
    end

    trait :with_sent_active_friendships do
      after(:create) do |user|
        create_list(:friendship, Random.rand(1..4), :accepted, requesting: user)
      end
    end

    trait :with_received_active_friendships do
      after(:create) do |user|
        create_list(:friendship, Random.rand(1..4), :accepted, requested: user)
      end
    end
  end
end
