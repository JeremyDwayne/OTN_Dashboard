Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['O_FACEBOOK_ID'], ENV['O_FACEBOOK_SECRET']
  provider :google, ENV['O_GOOGLE_ID'], ENV['O_GOOGLE_SECRET']
  provider :twitter, ENV['O_TWITTER_ID'], ENV['O_TWITTER_SECRET']
end
