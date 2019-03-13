# frozen_string_literal: true
# == Schema Information
#
# Table name: friendships
#
#  id            :bigint(8)        not null, primary key
#  accepted      :boolean          default(FALSE)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  requested_id  :integer
#  requesting_id :integer
#
# Indexes
#
#  index_friendships_on_requested_id                    (requested_id)
#  index_friendships_on_requested_id_and_requesting_id  (requested_id,requesting_id) UNIQUE
#  index_friendships_on_requesting_id                   (requesting_id)
#
# Foreign Keys
#
#  fk_rails_...  (requested_id => users.id)
#  fk_rails_...  (requesting_id => users.id)
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
