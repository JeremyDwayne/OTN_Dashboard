Rails.application.routes.draw do
  devise_for :user
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      root to: "dashboard#index"

      resources :consortia do
        resources :institutions do
          resources :workshops
        end
      end

      resources :users
      resources :institutions
      resources :workshops do
        get :attendees
      end
    end
  end
end
