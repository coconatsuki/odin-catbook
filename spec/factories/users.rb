# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { Faker::Cat.unique.name }
    email { "#{name}@catmail.com" }
    password { Faker::Lorem.characters(10) }

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
  end
end
