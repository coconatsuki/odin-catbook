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

require 'rails_helper'

RSpec.describe Friendship, type: :model do
  it 'is creatable' do
    friendship = create(:friendship).reload
    first_friendship = Friendship.first
    expect(first_friendship.requested).to eq(friendship.requested)
    expect(first_friendship.requesting).to eq(friendship.requesting)
  end

  it "belongs to a requesting user" do
    friendship = create(:friendship).reload
    expect(friendship.requesting.sent_friendships.first).to eq(friendship)
  end

  it "belongs to a requested user" do
    friendship = create(:friendship).reload
    expect(friendship.requested.received_friendships.first).to eq(friendship)
  end

  it { is_expected.to belong_to(:requested).class_name('User') }
  it { is_expected.to belong_to(:requesting).class_name('User') }
end
