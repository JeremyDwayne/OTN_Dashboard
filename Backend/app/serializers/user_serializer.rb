class UserSerializer
  include FastJsonapi::ObjectSerializer
  set_type :user

  attributes :first_name, :last_name, :email, :institution_id, :role
end
