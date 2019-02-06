# frozen_string_literal: true

FactoryBot.define do
  factory :like do
    post  { create(:post) }
    author { create(:user) }
  end
end
