web: bundle exec puma -C config/puma.rb
worker: bundle exec sidekiq -t 25 -q default -q mailers -c 5
release: rails db:migrate
