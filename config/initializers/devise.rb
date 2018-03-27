Devise.setup do |config|
  # https://stackoverflow.com/questions/39879995/undefined-local-variable-or-method-flash-for-
  config.secret_key = '237c28db941c888ce5b00a3a6aaeb3311aa0c0baa989d7bc895dfa45458cbf4e57b028cb439bc2379748714678309fba6f8fede9125ecfb15e83cd3ce173df30'
  config.navigational_formats = [:json]
  config.authentication_keys = [:email]
end
