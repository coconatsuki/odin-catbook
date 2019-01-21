# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, path_names: { sign_in: 'login', sign_out: 'logout' },
                     controllers: { omniauth_callbacks: "users/omniauth_callbacks" }

  resources :users, only: %i[show index edit update] do
    collection do
      get :current
    end
    member do
      get :received_requests, :sent_requests
    end
  end

  resources :posts do
    resources :likes, only: %i[create index destroy]
    resources :comments, only: %i[create edit update destroy]
  end

  resources :friendships, only: %i[create destroy update]

  root 'posts#index'
end
