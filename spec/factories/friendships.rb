# frozen_string_literal: true

# == Schema Information
#
# Table name: friendships
#
#  id            :bigint(8)        not null, primary key
#  requested_id  :integer
#  requesting_id :integer
#  accepted      :boolean          default(FALSE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#


FactoryBot.define do
  factory :friendship do
    requested { create(:user) }
    requesting { create(:user) }

    trait :pending do
      accepted { false }
    end

    trait :accepted do
      accepted { true }
    end
  end
end
