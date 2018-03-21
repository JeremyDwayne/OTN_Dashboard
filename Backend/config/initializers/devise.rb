Devise.setup do |config|
  # https://stackoverflow.com/questions/39879995/undefined-local-variable-or-method-flash-for-
  config.navigational_formats = [:json]
end
