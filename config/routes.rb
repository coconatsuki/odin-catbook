Rails.application.routes.draw do

  get 'user/index'

  get 'user/show'

  devise_for :users, path_names: { sign_in: 'login', sign_out: 'logout' }
  root   'posts#index'

end
