class TestJobJob < ApplicationJob
  queue_as :default

  def perform(string)
    Rails.logger.warn "ça marche: #{string}"
  end
end
