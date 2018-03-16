class AdminSerializer < UserSerializer
  include FastJsonapi::ObjectSerializer
  has_many :consortia, foreign_key: "admin_id"

  set_type :admin
  attributes :provider, :uid, :email, :first_name, :last_name, :institution_id
end
