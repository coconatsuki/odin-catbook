# frozen_string_literal: true
# == Schema Information
#
# Table name: likes
#
#  id         :bigint(8)        not null, primary key
#  positive   :boolean          default(TRUE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer
#  post_id    :integer
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#  fk_rails_...  (post_id => posts.id)
#

require 'test_helper'

class LikeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
