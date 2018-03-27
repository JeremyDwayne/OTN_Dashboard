Rails.application.routes.draw do
  # devise_for :user
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api do
    namespace :v1 do
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
      get "/admins", to: "users#admins"
      get "/institutions/:institution_id/facilitators", to: "institutions#facilitators"
      resources :institutions
    end
  end
end
