# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id            :bigint(8)        not null, primary key
#  body          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  author_id     :integer
#  smallImageUrl :string
#  largeImageUrl :string
#


require 'test_helper'

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
