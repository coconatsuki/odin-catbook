Rails.application.routes.draw do
  devise_for :users, path_names: { sign_in: 'login', sign_out: 'logout' },
             :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :users, only: [:show, :index, :edit, :update] do
    member do
      get :received_requests, :sent_requests
    end
  end

  resources :posts do
      resources :likes, only: [:create, :index, :destroy]
      resources :comments, only: [:create, :edit, :update, :destroy]
  end

  resources :friendships, only: [:create, :destroy, :update]

  root 'posts#index'

end
