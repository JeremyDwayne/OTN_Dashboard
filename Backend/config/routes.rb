Rails.application.routes.draw do
  devise_for :user
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      root to: "dashboard#index"

      resources :consortia do
        resources :institutions do
          resources :workshops
        end
      end
      resources :institutions do
        resources :workshops
      end
      resources :workshops do
        get :attendees
      end

      resources :users
      get "/users/admins", to: "users#admins"
      get "/institutions/:institution_id/facilitators", to: "institutions#facilitators"
      resources :institutions
    end
  end
end
