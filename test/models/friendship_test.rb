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


require 'test_helper'

class FriendshipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
