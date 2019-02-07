# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Friendship, type: :model do
  it 'is creatable' do
    friendship = create(:friendship)
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
