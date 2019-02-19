# frozen_string_literal: true
# == Schema Information
#
# Table name: posts
#
#  id            :bigint(8)        not null, primary key
#  body          :string
#  largeImageUrl :string
#  smallImageUrl :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  author_id     :integer
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#

require 'test_helper'

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
