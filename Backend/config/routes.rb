Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      root to: "dashboard#index"

      resources :consortia do
        resources :institutions do
          resources :workshops
        end
      end

      resources :institutions
      resources :workshops
    end
  end
end
